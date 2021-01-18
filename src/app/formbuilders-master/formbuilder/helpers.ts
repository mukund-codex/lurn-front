import { empty, instanceDom, optionFieldsRegEx, remove } from './dom';
import { instanceData } from './data';

import events from './events';
import { config } from './config';
import utils from './utils';
import { control } from './control';
import controlCustom from './controls/custom';
import I18N from './mi18n';

const m = utils.markup;

/**
 * Utilities specific to form-builder.ts
 */
export default class Helpers {
	from: any;
	layout: any;
	doCancel: boolean;
	data: any;
	d: any;
	stopIndex: any;

	/**
	 * Setup defaults, get instance data and dom
	 * @param  {String} formID [description]
	 * @param {Object} layout object instance used by various helpers
	 */
	constructor(formID, layout) {
		this.data = instanceData[formID];
		this.d = instanceDom[formID];
		this.doCancel = false;
		this.layout = layout;
	}

	/**
	 * Callback for when a drag begins
	 *
	 * @param  {Object} event
	 * @param  {Object} ui
	 */
	startMoving(event, ui) {
		ui.item.show().addClass('moving');
		this.doCancel = true;
		this.from = ui.item.parent();
	}

	/**
	 * Callback for when a drag ends
	 *
	 * @param  {Object} event
	 * @param  {Object} ui
	 */
	stopMoving(event, ui) {
		const _this = this;
		ui.item.removeClass('moving');
		if (_this.doCancel) {
			if (ui.sender) {
				(<any>$(ui.sender)).sortable('cancel');
			}
			this.from.sortable('cancel');
		}
		_this.save();
		_this.doCancel = false;
	}

	/**
	 * jQuery UI sortable beforeStop callback used for both lists.
	 * Logic for canceling the sort or drop.
	 * @param  {Object} event
	 * @param  {Object} ui
	 * @return {void}
	 */
	beforeStop(event, ui) {
		const _this = this;
		const opts = (<any>config).opts;
		const form = _this.d.stage;
		const lastIndex = form.childNodes.length - 1;
		const cancelArray = [];
		_this.stopIndex = ui.placeholder.index() - 1;

		if (!opts.sortableControls && ui.item.parent().hasClass('frmb-control')) {
			cancelArray.push(true);
		}

		if (opts.prepend) {
			cancelArray.push(_this.stopIndex === 0);
		}

		if (opts.append) {
			cancelArray.push(_this.stopIndex + 1 === lastIndex);
		}

		_this.doCancel = cancelArray.some(elem => elem === true);
	}

	/**
	 * Attempts to get element type and subtype
	 *
	 * @param  {Object} $field
	 * @return {Object} {type: 'fieldType', subtype: 'fieldSubType'}
	 */
	getTypes($field) {
		const types: any = {
			type: $field.attr('type')
		};
		const subtype = $('.fld-subtype', $field).val();

		if (subtype !== types.type) {
			types.subtype = subtype;
		}

		return types;
	}

	/**
	 * Get option data for a field
	 * @param  {Object} field jQuery field object
	 * @return {Array}        Array of option values
	 */
	fieldOptionData(field) {
		const options = [];
		const $options = $('.sortable-options li', field);

		$options.each(i => {
			const $option = $($options[i]);
			const selected = $('.option-selected', $option).is(':checked');
			const attrs: any = {
				label: $('.option-label', $option).val(),
				value: $('.option-value', $option).val()
			};

			if (selected) {
				attrs.selected = selected;
			}

			options.push(attrs);
		});

		return options;
	}

	/**
	 * XML save
	 *
	 * @param  {Object} form sortableFields node
	 * @return {String} xml in string
	 */
	xmlSave(form) {
		const formData = this.prepData(form);
		// language=HTML
		const xml = ['<form-template>\n\t<fields>'];

		utils.forEach(formData, function(fieldIndex, field) {
			let fieldContent = null;
			// Handle options
			if (field.type.match(optionFieldsRegEx)) {
				const fieldOptions = field.values;
				const options = [];

				for (let i = 0; i < fieldOptions.length; i++) {
					const oData = fieldOptions[i];
					const option = m('option', oData.label, oData).outerHTML;
					options.push('\n\t\t\t' + option);
				}
				options.push('\n\t\t');

				fieldContent = options.join('');
				delete field.values;
			}

			const xmlField = m('field', fieldContent, field);
			xml.push('\n\t\t' + xmlField.outerHTML);
		});

		xml.push('\n\t</fields>\n</form-template>');

		return xml.join('');
	}

	/**
	 * Get formData from editor in JS Object format
	 * @param  {Object} form aka stage, DOM element
	 * @return {Object} formData
	 */
	prepData(form) {
		const formData = [];
		const d = this.d;
		const _this = this;

		if (form.childNodes.length !== 0) {
			// build data object
			utils.forEach(form.childNodes, function(index, field) {
				const $field = $(field);

				if (!$field.hasClass('disabled-field')) {
					let fieldData: any = _this.getTypes($field);
					const $roleInputs: any = $('.roles-field:checked', field);
					const roleVals = $roleInputs.map(index => $roleInputs[index].value).get();

					_this.setAttrVals(field, fieldData);

					if (fieldData.subtype) {
						if (fieldData.subtype === 'quill') {
							const id = `${fieldData.name}-preview`;
							if ((<any>window).fbEditors.quill[id]) {
								const instance = (<any>window).fbEditors.quill[id].instance;
								const data = instance.getContents();
								fieldData.value = (<any>window).JSON.stringify(data.ops);
							}
						} else if (fieldData.subtype === 'tinymce' && (<any>window).tinymce) {
							const id = `${fieldData.name}-preview`;
							if ((<any>window).tinymce.editors[id]) {
								const editor = (<any>window).tinymce.editors[id];
								fieldData.value = editor.getContent();
							}
						}
					}

					if (roleVals.length) {
						fieldData.role = roleVals.join(',');
					}

					fieldData.className = fieldData.className || fieldData.class;

					if (fieldData.className) {
						const match = /(?:^|\s)btn-(.*?)(?:\s|$)/g.exec(fieldData.className);
						if (match) {
							fieldData.style = match[1];
						}
					}

					fieldData = utils.trimObj(fieldData);

					const multipleField = fieldData.type.match(d.optionFieldsRegEx);

					if (multipleField) {
						fieldData.values = _this.fieldOptionData($field);
					}

					formData.push(fieldData);
				}
			});
		}

		return formData;
	}

	/**
	 * Get and set the data for an editor. Mainly
	 * a wrapper for handling dataType option
	 * @param  {Object} formData
	 * @return {Object} formData
	 */
	getData(formData) {
		const data = this.data;
		if (!formData) {
			formData = (<any>config).opts.formData;
		}

		if (!formData) {
			return false;
		}

		const setData = {
			xml: formData => utils.parseXML(formData),
			json: formData => (<any>window).JSON.parse(formData)
		};

		data.formData = setData[(<any>config).opts.dataType](formData) || [];

		return data.formData;
	}

	/**
	 * Saves and returns formData
	 * @param {Object} stage DOM element
	 * @return {XML|JSON} formData
	 */
	save(stage = null) {
		const _this = this;
		const data = this.data;
		if (!stage) {
			stage = this.d.stage;
		}
		const doSave = {
			xml: () => _this.xmlSave(stage),
			json: () => (<any>window).JSON.stringify(_this.prepData(stage), null, '\t')
		};

		// save action for current `dataType`
		data.formData = doSave[(<any>config).opts.dataType](stage);

		// trigger formSaved event
		document.dispatchEvent(events.formSaved);
		return data.formData;
	}

	/**
	 * increments the field ids with support for multiple editors
	 * @param  {String} id field ID
	 * @return {String}    incremented field ID
	 */
	incrementId(id) {
		const split = id.lastIndexOf('-');
		const newFieldNumber = parseInt(id.substring(split + 1)) + 1;
		const baseString = id.substring(0, split);

		return `${baseString}-${newFieldNumber}`;
	}

	/**
	 * Set the values for field attributes in the editor
	 * @param {Object} field
	 * @param {Object} fieldData
	 */
	setAttrVals(field, fieldData) {
		const attrs = field.querySelectorAll('[class*="fld-"]');
		utils.forEach(attrs, index => {
			const attr = attrs[index];
			let value;
			const name = utils.camelCase(attr.getAttribute('name'));
			if (attr.attributes['contenteditable']) {
				value = attr.innerHTML;
			} else if (attr.type === 'checkbox') {
				value = attr.checked;
			} else {
				value = attr.value;
			}
			fieldData[name] = value;
		});
	}

	/**
	 * Collect field attribute values and call fieldPreview to generate preview
	 * @param  {Object} $field jQuery DOM element
	 */
	updatePreview($field) {
		const _this = this;
		const d = this.d;
		const fieldClass = $field.attr('class');
		const field = $field[0];
		if (fieldClass.indexOf('input-control') !== -1) {
			return;
		}

		const fieldType = $field.attr('type');
		const $prevHolder = $('.prev-holder', field);
		let previewData: any = {
			type: fieldType
		};
		let preview;

		_this.setAttrVals(field, previewData);

		const style = $('.btn-style', field).val();
		if (style) {
			previewData.style = style;
		}

		if (fieldType.match(d.optionFieldsRegEx)) {
			previewData.values = [];
			previewData.multiple = $('[name="multiple"]', field).is(':checked');

			$('.sortable-options li', field).each(function(i, $option) {
				const option: any = {};
				option.selected = $('.option-selected', $option).is(':checked');
				option.value = $('.option-value', $option).val();
				option.label = $('.option-label', $option).val();
				previewData.values.push(option);
			});
		}

		previewData = utils.trimObj(previewData);

		previewData.className = _this.classNames(field, previewData);
		$('.fld-className', field).val(previewData.className);

		$field.data('fieldData', previewData);

		// determine the control class for this type, and then process it through the layout engine
		const custom = controlCustom.lookup(previewData.type);
		const controlClass = custom ? custom.class : control.getClass(previewData.type, previewData.subtype);
		preview = this.layout.build(controlClass, previewData);

		empty($prevHolder[0]);
		$prevHolder[0].appendChild(preview);
		preview.dispatchEvent(events.fieldRendered);
	}

	/**
	 * Display a custom tooltip for disabled fields.
	 *
	 * @param  {Object} stage
	 */
	disabledTT(stage) {
		const move = (e, elem) => {
			const fieldOffset = elem.field.getBoundingClientRect();
			const x = e.clientX - fieldOffset.left - 21;
			const y = e.clientY - fieldOffset.top - elem.tt.offsetHeight - 12;
			elem.tt.style.transform = `translate(${x}px, ${y}px)`;
		};

		const disabledFields = stage.querySelectorAll('.disabled-field');
		utils.forEach(disabledFields, index => {
			const field = disabledFields[index];
			const title = I18N.get('fieldNonEditable');

			if (title) {
				const tt = utils.markup('p', title, { className: 'frmb-tt' });
				field.appendChild(tt);
				field.addEventListener('mousemove', e => move(e, { tt, field }));
			}
		});
	}

	/**
	 * Process classNames for field
	 * @param  {Object} field
	 * @param  {Object} previewData
	 * @return {String} classNames
	 */
	classNames(field, previewData) {
		const className = field.querySelector('.fld-className');
		if (!className) {
			return;
		}
		let i;
		const type = previewData.type;
		const style = previewData.style;
		const classes = className.value.split(' ');
		const types = {
			button: 'btn',
			submit: 'btn'
		};

		const primaryType = types[type];

		if (primaryType) {
			if (style) {
				for (i = 0; i < classes.length; i++) {
					const re = new RegExp(`(?:^|\s)${primaryType}-(.*?)(?:\s|$)+`, 'g');
					const match = classes[i].match(re);
					if (match) {
						classes.splice(i, 1);
					}
				}
				classes.push(primaryType + '-' + style);
			}
			classes.push(primaryType);
		}

		// reverse the array to put custom classes at end,
		// remove any duplicates, convert to string, remove whitespace
		return utils
			.unique(classes)
			.join(' ')
			.trim();
	}

	/**
	 * Closes and open dialog
	 *
	 * @param  {Object} overlay Existing overlay if there is one
	 * @param  {Object} dialog  Existing dialog
	 */
	closeConfirm(overlay, dialog = null) {
		if (!overlay) {
			overlay = document.getElementsByClassName('form-builder-overlay')[0];
		}
		if (!dialog) {
			dialog = document.getElementsByClassName('form-builder-dialog')[0];
		}
		overlay.classList.remove('visible');
		remove(dialog);
		remove(overlay);
		document.dispatchEvent(events.modalClosed);
	}

	/**
	 * Returns the layout data based on controlPosition option
	 * @param  {String} controlPosition 'left' or 'right'
	 * @return {Object} layout object
	 */
	editorLayout(controlPosition) {
		const layoutMap = {
			left: {
				stage: 'pull-right',
				controls: 'pull-left'
			},
			right: {
				stage: 'pull-left',
				controls: 'pull-right'
			}
		};

		return layoutMap[controlPosition] || '';
	}

	/**
	 * Adds overlay to the page. Used for modals.
	 * @return {Object} DOM Object
	 */
	showOverlay() {
		const _this = this;
		const overlay = utils.markup('div', null, {
			className: 'form-builder-overlay'
		});
		document.body.appendChild(overlay);
		overlay.classList.add('visible');

		overlay.onclick = function() {
			_this.closeConfirm(overlay);
		};

		return overlay;
	}

	/**
	 * Custom confirmation dialog
	 *
	 * @param  {Object}  message   Content to be displayed in the dialog
	 * @param  {Func}  yesAction callback to fire if they confirm
	 * @param  {Boolean} coords    location to put the dialog
	 * @param  {String}  className Custom class to be added to the dialog
	 * @return {Object}            Reference to the modal
	 */
	confirm(message, yesAction, coords: any = false, className = '') {
		const _this = this;
		const i18n = I18N.current;
		const overlay = _this.showOverlay();
		const yes = m('button', i18n.yes, {
			className: 'yes btn btn-success btn-sm'
		});
		const no = m('button', i18n.no, {
			className: 'no btn btn-danger btn-sm'
		});

		no.onclick = function() {
			_this.closeConfirm(overlay);
		};

		yes.onclick = function() {
			yesAction();
			_this.closeConfirm(overlay);
		};

		const btnWrap = m('div', [no, yes], { className: 'button-wrap' });

		className = 'form-builder-dialog ' + className;

		const miniModal = m('div', [message, btnWrap], { className });
		if (!coords) {
			const dE = document.documentElement;
			coords = {
				pageX: Math.max(dE.clientWidth, window.innerWidth || 0) / 2,
				pageY: Math.max(dE.clientHeight, window.innerHeight || 0) / 2
			};
			miniModal.style.position = 'fixed';
		} else {
			miniModal.classList.add('positioned');
		}

		miniModal.style.left = coords.pageX + 'px';
		miniModal.style.top = coords.pageY + 'px';

		document.body.appendChild(miniModal);

		yes.focus();
		return miniModal;
	}

	/**
	 * Popup dialog the does not require confirmation.
	 * @param  {String|DOM|Array}  content
	 * @param  {Boolean} coords    screen coordinates to position dialog
	 * @param  {String}  className classname to be added to the dialog
	 * @return {Object}            dom
	 */
	dialog(content, coords: any = false, className = '') {
		const _this = this;
		const clientWidth = document.documentElement.clientWidth;
		const clientHeight = document.documentElement.clientHeight;
		_this.showOverlay();

		className = 'form-builder-dialog ' + className;

		const miniModal = utils.markup('div', content, {
			className: className
		});
		if (!coords) {
			coords = {
				pageX: Math.max(clientWidth, window.innerWidth || 0) / 2,
				pageY: Math.max(clientHeight, window.innerHeight || 0) / 2
			};
			miniModal.style.position = 'fixed';
		} else {
			miniModal.classList.add('positioned');
		}

		miniModal.style.left = coords.pageX + 'px';
		miniModal.style.top = coords.pageY + 'px';

		document.body.appendChild(miniModal);

		document.dispatchEvent(events.modalOpened);

		if (className.indexOf('data-dialog') !== -1) {
			document.dispatchEvent(events.viewData);
		}

		return miniModal;
	}

	/**
	 * Confirm all fields will be removed then remove them
	 * @param  {Object} e click event object
	 */
	confirmRemoveAll(e) {
		const _this = this;
		const formID = e.target.id.match(/frmb-\d{13}/)[0];
		const stage = document.getElementById(formID);
		const i18n = I18N.current;
		const fields = $('li.form-field', stage);
		const buttonPosition = e.target.getBoundingClientRect();
		const bodyRect = document.body.getBoundingClientRect();
		const coords = {
			pageX: buttonPosition.left + buttonPosition.width / 2,
			pageY: buttonPosition.top - bodyRect.top - 12
		};

		if (fields.length) {
			_this.confirm(
				i18n.clearAllMessage,
				function() {
					_this.removeAllFields.call(_this, stage);
					(<any>config).opts.notify.success(i18n.allFieldsRemoved);
					(<any>config).opts.onClearAll();
				},
				coords
			);
		} else {
			_this.dialog(i18n.noFieldsToClear, coords);
		}
	}

	/**
	 * Removes all fields from the form
	 * @param {Object} stage to remove fields form
	 * @param {Boolean} animate whether to animate or not
	 * @return {void}
	 */
	removeAllFields(stage, animate = true) {
		const i18n = I18N.current;
		const opts = (<any>config).opts;
		const fields = stage.querySelectorAll('li.form-field');
		const markEmptyArray = [];

		if (!fields.length) {
			return false;
		}

		if (opts.prepend) {
			markEmptyArray.push(true);
		}

		if (opts.append) {
			markEmptyArray.push(true);
		}

		if (!markEmptyArray.some(elem => elem === true)) {
			stage.parentElement.classList.add('empty');
			stage.parentElement.dataset.content = i18n.getStarted;
		}

		if (animate) {
			stage.classList.add('removing');
			let outerHeight = 0;
			utils.forEach(fields, index => (outerHeight += fields[index].offsetHeight + 3));
			fields[0].style.marginTop = `${-outerHeight}px`;
			setTimeout(() => {
				empty(stage).classList.remove('removing');
				this.save();
			}, 400);
		} else {
			empty(stage);
			this.save();
		}
	}

	/**
	 * If user re-orders the elements their order should be saved.
	 * @param {Object} $cbUL our list of elements
	 * @return {Array} fieldOrder
	 */
	setFieldOrder($cbUL) {
		if (!(<any>config).opts.sortableControls) {
			return false;
		}
		const { sessionStorage, JSON } = <any>window;

		const fieldOrder = [];

		$cbUL.children().each((index, element) => {
			const type = $(element).data('type');
			if (type) {
				fieldOrder.push(type);
			}
		});

		if (sessionStorage) {
			sessionStorage.setItem('fieldOrder', JSON.stringify(fieldOrder));
		}
		return fieldOrder;
	}

	/**
	 * Reorder the controls if the user has previously ordered them.
	 *
	 * @param  {Array} controls - an array of control types
	 * @return {Array} ordered fields
	 */
	orderFields(controls) {
		const opts = (<any>config).opts;
		const controlOrder = opts.controlOrder.concat(controls);
		let fieldOrder;

		// retrieve any saved ordering from the session
		if (window.sessionStorage) {
			if (opts.sortableControls) {
				fieldOrder = window.sessionStorage.getItem('fieldOrder');
			} else {
				window.sessionStorage.removeItem('fieldOrder');
			}
		}

		// if we have a saved order, use it. Otherwise build the order ourselves
		if (!fieldOrder) {
			fieldOrder = utils.unique(controlOrder);
		} else {
			fieldOrder = (<any>window).JSON.parse(fieldOrder);
			fieldOrder = utils.unique(fieldOrder.concat(controls));
			fieldOrder = Object.keys(fieldOrder).map(i => fieldOrder[i]);
		}

		// order custom fields
		fieldOrder.forEach(field => {
			// identify custom field
			const randomKey = new RegExp('-[\\d]{4}$');

			if (field.match(randomKey)) {
				const baseFieldIndex = fieldOrder.indexOf(field.replace(randomKey, ''));
				if (baseFieldIndex !== -1) {
					fieldOrder.splice(fieldOrder.indexOf(field), 1);
					fieldOrder.splice(baseFieldIndex + 1, fieldOrder.indexOf(field), field);
				}
			}
		});

		// remove disableFields
		if (opts.disableFields.length) {
			fieldOrder = fieldOrder.filter(type => opts.disableFields.indexOf(type) == -1);
		}

		return fieldOrder.filter(Boolean);
	}

	/**
	 * Close fields being editing
	 * @param  {Object} stage
	 */
	closeAllEdit() {
		const _this = this;
		const fields = $('> li.editing', _this.d.stage);
		const toggleBtns = $('.toggle-form', _this.d.stage);
		const editPanels = $('.frm-holder', fields);

		toggleBtns.removeClass('open');
		fields.removeClass('editing');
		$('.prev-holder', fields).show();
		editPanels.hide();
	}

	/**
	 * Toggles the edit mode for the given field
	 * @param  {String} fieldId
	 * @param  {Boolean} animate
	 */
	toggleEdit(fieldId, animate = true) {
		const field = document.getElementById(fieldId);
		const toggleBtn = $('.toggle-form', field);
		if (!toggleBtn.length) {
			return;
		}
		const editPanel = $('.frm-holder', field);
		field.classList.toggle('editing');
		toggleBtn.toggleClass('open');
		if (animate) {
			$('.prev-holder', field).slideToggle(250);
			editPanel.slideToggle(250);
		} else {
			$('.prev-holder', field).toggle();
			editPanel.toggle();
		}
		this.updatePreview($(field));
	}

	/**
	 * Controls follow scroll to the bottom of the editor
	 */
	stickyControls() {
		const d = this.d;
		const $cbWrap = $(d.controls).parent();
		const $stageWrap = $(d.stage).parent();
		const cbWidth = $cbWrap.width();
		const cbPosition = d.controls.getBoundingClientRect();

		$(window).scroll(function(evt) {
			const scrollTop = $(evt.target).scrollTop();
			const offsetDefaults = {
				top: 5,
				bottom: 'auto',
				right: 'auto',
				left: cbPosition.left
			};

			const offset = (<any>Object).assign({}, offsetDefaults, (<any>config).opts.stickyControls.offset);

			if (scrollTop > $stageWrap.offset().top) {
				const style = {
					position: 'fixed',
					width: cbWidth
				};

				const cbStyle = (<any>Object).assign(style, offset);

				const cbOffset = $cbWrap.offset();
				const stageOffset = $stageWrap.offset();
				const cbBottom = cbOffset.top + $cbWrap.height();
				const stageBottom = stageOffset.top + $stageWrap.height();
				const atBottom = cbBottom === stageBottom && cbOffset.top > scrollTop;

				if (cbBottom > stageBottom && cbOffset.top !== stageOffset.top) {
					$cbWrap.css({
						position: 'absolute',
						top: 'auto',
						bottom: 0,
						right: 0,
						left: 'auto'
					});
				}

				if (cbBottom < stageBottom || atBottom) {
					$cbWrap.css(cbStyle);
				}
			} else {
				d.controls.parentElement.removeAttribute('style');
			}
		});
	}

	/**
	 * Open a dialog with the form's data
	 */
	showData() {
		const data = this.data;
		const formData = utils.escapeHtml(data.formData);
		const code = m('code', formData, {
			className: `formData-${(<any>config).opts.dataType}`
		});

		this.dialog(m('pre', code), null, 'data-dialog');
	}

	/**
	 * Remove a field from the stage
	 * @param  {String}  fieldID ID of the field to be removed
	 * @param  { Number } animationSpeed
	 * @return {Boolean} fieldRemoved returns true if field is removed
	 */
	removeField(fieldID, animationSpeed = 250) {
		let fieldRemoved = false;
		const _this = this;
		const form = this.d.stage;
		const fields = form.getElementsByClassName('form-field');

		if (!fields.length) {
			console.warn('No fields to remove');
			return false;
		}

		if (!fieldID) {
			const availableIds = [].slice.call(fields).map(field => {
				return field.id;
			});
			console.warn('fieldID required to remove specific fields.');
			console.warn('Removing last field since no ID was supplied.');
			console.warn('Available IDs: ' + availableIds.join(', '));
			fieldID = form.lastChild.id;
		}

		const field = document.getElementById(fieldID);
		const $field = $(field);
		if (!field) {
			console.warn('Field not found');
			return false;
		}

		$field.slideUp(animationSpeed, function() {
			$field.removeClass('deleting');
			$field.remove();
			fieldRemoved = true;
			_this.save();
			if (!form.childNodes.length) {
				const stageWrap = form.parentElement;
				stageWrap.classList.add('empty');
				stageWrap.dataset.content = I18N.current.getStarted;
			}
		});

		document.dispatchEvent(events.fieldRemoved);
		return fieldRemoved;
	}

	/**
	 * Generate markup for form action buttons
	 * @param  {Object} buttonData
	 * @return {Object} DOM element for action button
	 */
	processActionButtons(buttonData) {
		let { label, events, ...attrs } = buttonData;
		const data = this.data;

		if (!label) {
			if (attrs.id) {
				label = I18N.current[attrs.id] || utils.capitalize(attrs.id);
			} else {
				label = '';
			}
		} else {
			label = I18N.current[label] || label;
		}

		if (!attrs.id) {
			attrs.id = `${data.formID}-action-${Math.round(Math.random() * 1000)}`;
		} else {
			attrs.id = `${data.formID}-${attrs.id}-action`;
		}

		const button = m('button', label, attrs);

		if (events) {
			for (const event in events) {
				if (events.hasOwnProperty(event)) {
					button.addEventListener(event, evt => events[event](evt));
				}
			}
		}

		return button;
	}

	/**
	 * Register any subtype controls specified in the 'subtypes' option, retrieve
	 * all defined subtypes & build the export subtype format
	 * @param  {Array} subtypeOpts
	 * @return {Array} subtypes
	 */
	processSubtypes(subtypeOpts) {
		// first register any passed subtype options against the appropriate type control class
		for (const type in subtypeOpts) {
			if (subtypeOpts.hasOwnProperty(type)) {
				const controlClass = control.getClass(type);
				control.register(subtypeOpts[type], controlClass, type);
			}
		}

		// retrieve a list of all subtypes
		const subtypeDef = control.getRegisteredSubtypes();

		// reformat the subtypes for each type
		const subtypes = {};
		for (const type in subtypeDef) {
			if (subtypeDef.hasOwnProperty(type)) {
				// loop through each defined subtype & build the formatted data structure
				const formatted = [];
				for (const subtype of subtypeDef[type]) {
					const controlClass = control.getClass(type, subtype);
					formatted.push({
						label: controlClass.mi18n(subtype),
						value: subtype
					});
				}
				subtypes[type] = formatted;
			}
		}

		return subtypes;
	}

	/**
	 * Generate stage and controls dom elements
	 * @param  {String} formID [description]
	 */
	editorUI(formID) {
		const d = this.d;
		const data = this.data;
		d.stage = m('ul', null, {
			id: data.formID,
			className: 'frmb'
		});

		// Create draggable fields for formBuilder
		d.controls = m('ul', null, {
			id: `${data.formID}-control-box`,
			className: 'frmb-control'
		});
	}

	/**
	 * Process user options for actionButtons
	 * @param  {Object} options
	 * @return {Object} processedOptions
	 */
	processOptions(options) {
		const _this = this;
		let { actionButtons, replaceFields, ...opts } = options;
		actionButtons = [
			{
				type: 'button',
				id: 'clear',
				className: 'clear-all btn btn-danger',
				events: {
					click: _this.confirmRemoveAll.bind(_this)
				}
			},
			{
				type: 'button',
				label: 'viewJSON',
				id: 'data',
				className: 'btn btn-default get-data',
				events: {
					click: _this.showData.bind(_this)
				}
			},
			{
				type: 'button',
				id: 'save',
				className: 'btn btn-primary btn-raised save-template',
				events: {
					click: evt => {
						_this.save();
						(<any>config).opts.onSave(evt, _this.data.formData);
					}
				}
			}
		].concat(options.actionButtons);
		(<any>config).opts = (<any>Object).assign({}, { actionButtons }, opts);
		if (replaceFields !== undefined) {
			opts.disableFields = opts.disableFields.concat(replaceFields.map(({ type }) => type && type));
		}
		(<any>config).opts = Object.assign({}, { actionButtons }, opts);
		return (<any>config).opts;
	}

	/**
	 * Small wrapper for input markup
	 * @param  {Object} attrs [description]
	 * @return {Object} DOM element
	 */
	input(attrs = {}) {
		return m('input', null, attrs);
	}

	/**
	 * Gets the data for current instance of formBuilder
	 * @param  {String} type
	 * @param  {Boolean} formatted
	 * @return {Array|String} formData
	 */
	getFormData(type = 'js', formatted = false) {
		const h = this;
		const data = {
			js: () => h.prepData(h.d.stage),
			xml: () => h.xmlSave(h.d.stage),
			json: formatted => {
				let formData;
				if (formatted) {
					formData = (<any>window).JSON.stringify(h.prepData(h.d.stage), null, '\t');
				} else {
					formData = (<any>window).JSON.stringify(h.prepData(h.d.stage));
				}
				return formData;
			}
		};

		return data[type](formatted);
	}

	// end class
}

// export default Helpers;
