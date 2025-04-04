// import 'babel-regenerator-runtime';
import '../../../assets/sass/form-builder.scss';
import Dom, { remove } from './dom';
import { Data } from './data';
import utils from './utils';
import events from './events';
import layout from './layout';
import Helpers from './helpers';
import { config, styles } from './config';
import './controls/index';
import { control } from './control';
import 'jquery';
import controlCustom from './controls/custom';
import I18N from './mi18n';

let instanceTime = new Date().getTime();

export class FormBuilderCreateor {
	getFormBuilder(opts: any, element: any) {
		return FormBuilder(opts, element);
	}
}

const FormBuilder = (opts, element) => {
	const formBuilder = this;
	const $ = jQuery;
	let conf: any;
	const i18n = I18N.current;
	const formID = 'frmb-' + instanceTime++;
	const data: any = new Data(formID);
	const d: any = new Dom(formID);
	// prepare a new layout object with appropriate templates
	if (!opts.layout) {
		opts.layout = layout;
	}

	const layoutEngine = new opts.layout(opts.layoutTemplates, true);

	// ability for controls to have their own configuration / options
	// of the format control identifier (type, or type.subtype): {options}
	control.controlConfig = opts.controlConfig || {};

	const h: any = new Helpers(formID, layoutEngine);
	const m = utils.markup;

	const originalOpts = opts;

	// load in any custom specified controls, or preloaded plugin controls
	// control.loadCustoms(opts.controls);

	opts = h.processOptions(opts);

	// register any passed custom templates & fields
	if (Object.keys(opts.fields).length) {
		controlCustom.register(opts.templates, opts.fields);
	}

	const subtypes = ((<any>config).subtypes = h.processSubtypes(opts.subtypes));
	h.editorUI(formID);

	const $stage = <any>$(d.stage);

	data.layout = h.editorLayout(opts.controlPosition);
	data.formID = formID;
	data.lastID = `${data.formID}-fld-1`;

	// retrieve a full list of loaded controls
	const controls = control.getRegistered();
	const customFields = controlCustom.getRegistered();
	if (customFields) {
		$.merge(controls, customFields);
	}

	// if we support rearranging control order, add classes to support this
	if (opts.sortableControls) {
		d.controls.classList.add('sort-enabled');
	}

	// DOM element to hold the list of controls
	const $cbUL = $(d.controls);

	// add each control to the interface
	const controlList = [];
	const allControls = {};

	for (let i = 0; i < controls.length; i++) {
		const type = controls[i];
		// first check if this is a custom control
		let custom = controlCustom.lookup(type);
		let controlClass;
		if (custom) {
			controlClass = custom.class;
		} else {
			custom = {};

			// determine the class, icon & label for this control
			controlClass = control.getClass(type);
			if (!controlClass || !controlClass.active(type)) {
				continue;
			}
		}
		const icon = custom.icon || controlClass.icon(type);
		let label = custom.label || controlClass.label(type);
		const iconClassName = !icon ? custom.iconClassName || `icon-${type.replace(/-[\d]{4}$/, '')}` : '';

		// if the class has specified a custom icon, inject it into the label
		if (icon) {
			label = `<span class="control-icon">${icon}</span>${label}`;
		}

		// build & insert the new list item to represent this control
		const newFieldControl = m('li', m('span', label), {
			className: `${iconClassName} input-control input-control-${i}`
		});
		newFieldControl.dataset.type = type;
		controlList.push(type);
		allControls[type] = newFieldControl;
	}

	if (opts.inputSets.length) {
		opts.inputSets.forEach((set, i) => {
			set.name = set.name || utils.makeClassName(set.label);
			const inputSet = m('li', set.label, {
				className: `input-set-control input-set-${i}`
			});
			inputSet.dataset.type = set.name;
			controlList.push(set.name);
			allControls[set.name] = inputSet;
		});
	}

	// append controls to list
	h.orderFields(controlList).forEach(control => {
		if (allControls[control]) {
			d.controls.appendChild(allControls[control]);
		}
	});

	// Sortable fields
	$stage.sortable({
		cursor: 'move',
		opacity: 0.9,
		revert: 150,
		beforeStop: (evt, ui) => h.beforeStop.call(h, evt, ui),
		start: (evt, ui) => h.startMoving.call(h, evt, ui),
		stop: (evt, ui) => h.stopMoving.call(h, evt, ui),
		cancel: ['input', 'select', 'textarea', '.disabled-field', '.form-elements', '.btn', 'button'].join(', '),
		placeholder: 'frmb-placeholder'
	});

	// ControlBox with different fields
	(<any>$cbUL).sortable({
		helper: 'clone',
		opacity: 0.9,
		connectWith: $stage,
		cancel: '.fb-separator',
		cursor: 'move',
		scroll: false,
		placeholder: 'ui-state-highlight',
		start: (evt, ui) => h.startMoving.call(h, evt, ui),
		stop: (evt, ui) => h.stopMoving.call(h, evt, ui),
		revert: 150,
		beforeStop: (evt, ui) => h.beforeStop.call(h, evt, ui),
		distance: 3,
		update: function(event, ui) {
			if (h.doCancel) {
				return false;
			}

			if (ui.item.parent()[0] === d.stage) {
				h.doCancel = true;
				processControl(ui.item);
			} else {
				h.setFieldOrder($cbUL);
				h.doCancel = !opts.sortableControls;
			}
		}
	});

	const processControl = control => {
		if (control[0].classList.contains('input-set-control')) {
			const inputSets = [];
			const inputSet = opts.inputSets.find(set => set.name === control[0].dataset.type);
			if (inputSet && inputSet.showHeader) {
				const header = {
					type: 'header',
					subtype: 'h2',
					id: inputSet.name,
					label: inputSet.label
				};
				inputSets.push(header);
			}
			inputSets.push(...inputSet.fields);
			inputSets.forEach(field => {
				prepFieldVars(field, true);
				if (h.stopIndex || h.stopIndex === 0) {
					h.stopIndex++;
				}
			});
		} else {
			prepFieldVars(control, true);
		}
	};

	d.editorWrap = m('div', null, {
		id: `${data.formID}-form-wrap`,
		className: 'form-wrap form-builder' + utils.mobileClass()
	});

	const $editorWrap = $(d.editorWrap);

	const cbWrap = m('div', d.controls, {
		id: `${data.formID}-cb-wrap`,
		className: 'cb-wrap ' + data.layout.controls
	});

	if (opts.showActionButtons) {
		const buttons = opts.actionButtons.map(btnData => {
			if (btnData.id && opts.disabledActionButtons.indexOf(btnData.id) === -1) {
				return h.processActionButtons(btnData);
			}
		});
		const formActions = (d.formActions = m('div', buttons, {
			className: 'form-actions btn-group'
		}));

		cbWrap.appendChild(formActions);
	}

	const stageWrap = m('div', [d.stage, cbWrap], {
		id: `${data.formID}-stage-wrap`,
		className: 'stage-wrap ' + data.layout.stage
	});

	$editorWrap.append(stageWrap, cbWrap);

	if (element.type !== 'textarea') {
		$(element).append($editorWrap);
	} else {
		$(element).replaceWith($editorWrap);
	}

	const saveAndUpdate = utils.debounce(evt => {
		if (evt) {
			if (evt.type === 'keyup' && evt.target.name === 'className') {
				return false;
			}

			const $field = $(evt.target).closest('.form-field');
			h.updatePreview($field);
			h.save.call(h);
		}
	});

	const previewSelectors = ['.form-elements input', '.form-elements select', '.form-elements textarea'].join(', ');

	// Save field on change
	$stage.on('change blur keyup', previewSelectors, saveAndUpdate);

	$('li', d.controls).click(evt => {
		const $control = $(evt.target).closest('li');
		h.stopIndex = undefined;
		processControl($control);
		h.save.call(h);
	});

	// Add append and prepend options if necessary
	const nonEditableFields = () => {
		const cancelArray = [];
		const disabledField = type =>
			utils.markup('li', opts[type], {
				className: `disabled-field form-${type}`
			});

		if (opts.prepend && !$('.disabled-field.form-prepend', d.stage).length) {
			cancelArray.push(true);
			$stage.prepend(disabledField('prepend'));
		}

		if (opts.append && !$('.disabled-field.form-.append', d.stage).length) {
			cancelArray.push(true);
			$stage.append(disabledField('append'));
		}

		h.disabledTT(d.stage);
		return cancelArray.some(elem => elem === true);
	};

	// builds the standard formbuilder datastructure for a feild definition
	const prepFieldVars = function($field, isNew = false) {
		let field: any = {};
		if ($field instanceof jQuery) {
			// get the default type etc & label for this field
			field.type = $field[0].dataset.type;
			if (field.type) {
				// check for a custom type
				const custom = controlCustom.lookup(field.type);
				if (custom) {
					field = (<any>Object).assign({}, custom);
				} else {
					const controlClass = control.getClass(field.type);
					field.label = controlClass.label(field.type);
				}

				// @todo: any other attrs ever set in aFields? value or selected?
			} else {
				// is dataType XML
				const attrs = $field[0].attributes;
				if (!isNew) {
					field.values = field.children().map((index, elem) => {
						return {
							label: $(elem).text(),
							value: $(elem).attr('value'),
							selected: Boolean($(elem).attr('selected'))
						};
					});
				}

				for (let i = attrs.length - 1; i >= 0; i--) {
					field[attrs[i].name] = attrs[i].value;
				}
			}
		} else {
			field = (<any>Object).assign({}, $field);
		}

		if (!field.name) {
			field.name = utils.nameAttr(field);
		}

		if (isNew && utils.inArray(field.type, ['text', 'number', 'file', 'date', 'select', 'textarea', 'autocomplete'])) {
			field.className = field.className || 'form-control';
		}

		const match = /(?:^|\s)btn-(.*?)(?:\s|$)/g.exec(field.className);
		if (match) {
			field.style = match[1];
		}

		appendNewField(field, isNew);

		if (isNew) {
			document.dispatchEvent(events.fieldAdded);
		}

		stageWrap.classList.remove('empty');
	};

	// Parse saved XML template data
	const loadFields = function(formData = null) {
		formData = h.getData(formData);
		if (formData && formData.length) {
			for (let i = 0; i < formData.length; i++) {
				const fieldData = utils.trimObj(formData[i]);
				prepFieldVars(fieldData);
			}
			stageWrap.classList.remove('empty');
		} else if (opts.defaultFields && opts.defaultFields.length) {
			// Load default fields if none are set
			opts.defaultFields.forEach(field => prepFieldVars(field));
			stageWrap.classList.remove('empty');
		} else if (!opts.prepend && !opts.append) {
			stageWrap.classList.add('empty');
			stageWrap.dataset.content = i18n.getStarted;
		}

		if (nonEditableFields()) {
			stageWrap.classList.remove('empty');
		}
		h.save();
	};

	/**
	 * Add data for field with options [select, checkbox-group, radio-group]
	 *
	 * @param  {Object} fieldData
	 * @return {String} field options markup
	 */
	const fieldOptions = function(fieldData) {
		let { type, values, name } = fieldData;
		const optionActions = [m('a', i18n.addOption, { className: 'add add-opt' })];
		const fieldOptions = [m('label', i18n.selectOptions, { className: 'false-label' })];
		const isMultiple = fieldData.multiple || type === 'checkbox-group';
		const optionDataTemplate = label => {
			const optionData: any = {
				label,
				value: utils.hyphenCase(label)
			};

			if (type !== 'autocomplete') {
				optionData.selected = false;
			}

			return optionData;
		};

		if (!values || !values.length) {
			let defaultOptCount = [1, 2, 3];
			if (utils.inArray(type, ['checkbox-group', 'checkbox'])) {
				defaultOptCount = [1];
			}
			values = defaultOptCount.map(function(index) {
				const label = `${i18n.option} ${index}`;
				return optionDataTemplate(label);
			});

			const firstOption = values[0];
			if (firstOption.hasOwnProperty('selected')) {
				firstOption.selected = true;
			}
		} else {
			// ensure option data is has all required keys
			values.forEach(option => Object.assign({}, { selected: false }, option));
		}

		const optionActionsWrap = m('div', optionActions, {
			className: 'option-actions'
		});
		const options = m(
			'ol',
			values.map(option => selectFieldOptions(name, option, isMultiple)),
			{ className: 'sortable-options' }
		);
		const optionsWrap = m('div', [options, optionActionsWrap], {
			className: 'sortable-options-wrap'
		});

		fieldOptions.push(optionsWrap);

		return m('div', fieldOptions, { className: 'form-group field-options' }).outerHTML;
	};

	const defaultFieldAttrs = type => {
		const defaultAttrs = ['required', 'label', 'description', 'placeholder', 'className', 'name', 'access', 'value'];
		const noValFields = ['header', 'paragraph', 'file', 'autocomplete'].concat(d.optionFields);

		const valueField = !utils.inArray(type, noValFields);

		const typeAttrsMap = {
			autocomplete: defaultAttrs.concat(['options']),
			button: ['label', 'subtype', 'style', 'className', 'name', 'value', 'access'],
			checkbox: ['required', 'label', 'description', 'toggle', 'inline', 'className', 'name', 'access', 'other', 'options'],
			text: defaultAttrs.concat(['subtype', 'maxlength']),
			date: defaultAttrs,
			file: defaultAttrs.concat(['subtype', 'multiple']),
			header: ['label', 'subtype', 'className', 'access'],
			hidden: ['name', 'value', 'access'],
			paragraph: ['label', 'subtype', 'className', 'access'],
			number: defaultAttrs.concat(['min', 'max', 'step']),
			select: defaultAttrs.concat(['multiple', 'options']),
			textarea: defaultAttrs.concat(['subtype', 'maxlength', 'rows'])
		};

		typeAttrsMap['checkbox-group'] = typeAttrsMap.checkbox;
		typeAttrsMap['radio-group'] = typeAttrsMap.checkbox;

		const typeAttrs = typeAttrsMap[type];

		if (type === 'radio-group') {
			utils.remove('toggle', typeAttrs);
		}

		// Help Text / Description Field
		if (utils.inArray(type, ['header', 'paragraph', 'button'])) {
			utils.remove('description', typeAttrs);
		}

		if (!valueField) {
			utils.remove('value', typeAttrs);
		}

		return typeAttrs || defaultAttrs;
	};

	/**
	 * Build the editable properties for the field
	 * @param  {object} values configuration object for advanced fields
	 * @return {String}        markup for advanced fields
	 */
	const advFields = values => {
		const { type } = values;
		const advFields = [];
		const fieldAttrs = defaultFieldAttrs(type);
		const advFieldMap = {
			required: () => requiredField(values),
			toggle: () => boolAttribute('toggle', values, { first: i18n.toggle }),
			inline: () => {
				const labels = {
					first: i18n.inline,
					second: I18N.get('inlineDesc', type.replace('-group', ''))
				};

				return boolAttribute('inline', values, labels);
			},
			label: () => textAttribute('label', values),
			description: () => textAttribute('description', values),
			subtype: () => selectAttribute('subtype', values, subtypes[type]),
			style: () => btnStyles(values.style),
			placeholder: () => textAttribute('placeholder', values),
			rows: () => numberAttribute('rows', values),
			className: () => textAttribute('className', values),
			name: () => textAttribute('name', values),
			value: () => textAttribute('value', values),
			maxlength: () => numberAttribute('maxlength', values),
			access: () => {
				const rolesDisplay = values.role ? 'style="display:block"' : '';
				const availableRoles = [`<div class="available-roles" ${rolesDisplay}>`];
				for (key in opts.roles) {
					if (opts.roles.hasOwnProperty(key)) {
						const roleId = `fld-${data.lastID}-roles-${key}`;
						const cbAttrs: any = {
							type: 'checkbox',
							name: 'roles[]',
							value: key,
							id: roleId,
							className: 'roles-field'
						};
						if (utils.inArray(key, roles)) {
							cbAttrs.checked = 'checked';
						}

						availableRoles.push(`<label for="${roleId}">`);
						availableRoles.push(h.input(cbAttrs).outerHTML);
						availableRoles.push(` ${opts.roles[key]}</label>`);
					}
				}
				availableRoles.push('</div>');
				const accessLabels = {
					first: i18n.roles,
					second: i18n.limitRole,
					content: availableRoles.join('')
				};

				return boolAttribute('access', values, accessLabels);
			},
			other: () =>
				boolAttribute('other', values, {
					first: i18n.enableOther,
					second: i18n.enableOtherMsg
				}),
			options: () => fieldOptions(values)
		};
		let key;
		const roles = values.role !== undefined ? values.role.split(',') : [];
		const numAttrs = ['min', 'max', 'step'];

		if (type === 'number') {
			numAttrs.forEach(numAttr => {
				advFieldMap[numAttr] = () => numberAttribute(numAttr, values);
			});
		}

		if (type === 'file') {
			advFieldMap['multiple'] = () => {
				const labels = {
					first: i18n.multipleFiles,
					second: i18n.allowMultipleFiles
				};
				return boolAttribute('multiple', values, labels);
			};
		}

		if (type === 'select') {
			advFieldMap['multiple'] = () => {
				return boolAttribute('multiple', values, {
					first: ' ',
					second: i18n.selectionsMessage
				});
			};
		}

		Object.keys(fieldAttrs).forEach(index => {
			const attr = fieldAttrs[index];
			const useDefaultAttr = [true];

			if (opts.typeUserDisabledAttrs[type]) {
				const typeDisabledAttrs = opts.typeUserDisabledAttrs[type];
				useDefaultAttr.push(!utils.inArray(attr, typeDisabledAttrs));
			}

			if (opts.typeUserAttrs[type]) {
				const userAttrs = Object.keys(opts.typeUserAttrs[type]);
				useDefaultAttr.push(!utils.inArray(attr, userAttrs));
			}

			if (utils.inArray(attr, opts.disabledAttrs)) {
				useDefaultAttr.push(false);
			}

			if (useDefaultAttr.every(use => use === true)) {
				advFields.push(advFieldMap[attr]());
			}
		});

		// Append custom attributes as defined in typeUserAttrs option
		if (opts.typeUserAttrs[type]) {
			const customAttr = processTypeUserAttrs(opts.typeUserAttrs[type], values);
			advFields.push(customAttr);
		}

		return advFields.join('');
	};

	/**
	 * Processes typeUserAttrs
	 * @param  {Object} typeUserAttr option
	 * @param  {Object} values       field attributes
	 * @return {String}              markup for custom user attributes
	 */
	function processTypeUserAttrs(typeUserAttr, values) {
		const advField = [];

		for (const attribute in typeUserAttr) {
			if (typeUserAttr.hasOwnProperty(attribute)) {
				const orig = i18n[attribute];
				const tUA = typeUserAttr[attribute];
				const origValue = tUA.value;
				tUA.value = values[attribute] || tUA.value || '';

				if (tUA.label) {
					i18n[attribute] = tUA.label;
				}

				if (tUA.options) {
					advField.push(selectUserAttrs(attribute, tUA));
				} else {
					advField.push(inputUserAttrs(attribute, tUA));
				}

				i18n[attribute] = orig;
				tUA.value = origValue;
			}
		}

		return advField.join('');
	}

	/**
	 * Text input value for attribute
	 * @param  {String} name
	 * @param  {Object} attrs also known as values
	 * @return {String}       input markup
	 */
	function inputUserAttrs(name, attrs) {
		let textAttrs: any = {
			id: name + '-' + data.lastID,
			title: attrs.description || attrs.label || name.toUpperCase(),
			name: name,
			type: attrs.type || 'text',
			className: [`fld-${name}`]
		};
		const label = `<label for="${textAttrs.id}">${i18n[name]}</label>`;

		const optionInputs = ['checkbox', 'checkbox-group', 'radio-group'];
		if (!utils.inArray(textAttrs.type, optionInputs)) {
			textAttrs.className.push('form-control');
		}

		textAttrs = (<any>Object).assign({}, attrs, textAttrs);
		const textInput = `<input ${utils.attrString(textAttrs)}>`;
		const inputWrap = `<div class="input-wrap">${textInput}</div>`;
		return `<div class="form-group ${name}-wrap">${label}${inputWrap}</div>`;
	}

	/**
	 * Select input for multiple choice user attributes
	 * @todo  replace with selectAttr
	 * @param  {String} name
	 * @param  {Object} fieldData
	 * @return {String}         select markup
	 */
	function selectUserAttrs(name, fieldData) {
		const optis = Object.keys(fieldData.options).map(val => {
			const attrs: any = { value: val };
			if (val === fieldData.value) {
				attrs.selected = null;
			}
			return m('option', fieldData.options[val], attrs).outerHTML;
		});
		const selectAttrs = {
			id: name + '-' + data.lastID,
			title: fieldData.description || fieldData.label || name.toUpperCase(),
			name: name,
			className: `fld-${name} form-control`
		};
		const label = `<label for="${selectAttrs.id}">${i18n[name]}</label>`;

		Object.keys(fieldData)
			.filter(prop => {
				return !utils.inArray(prop, ['value', 'options', 'label']);
			})
			.forEach(function(attr) {
				selectAttrs[attr] = fieldData[attr];
			});

		const select = m('select', optis, selectAttrs).outerHTML;
		const inputWrap = `<div class="input-wrap">${select}</div>`;
		return `<div class="form-group ${name}-wrap">${label}${inputWrap}</div>`;
	}

	const boolAttribute = (name, values, labels) => {
		const label = txt =>
			m('label', txt, {
				for: `${name}-${data.lastID}`
			}).outerHTML;
		const cbAttrs: any = {
			type: 'checkbox',
			className: `fld-${name}`,
			name,
			id: `${name}-${data.lastID}`
		};
		if (values[name]) {
			cbAttrs.checked = true;
		}
		const left = [];
		let right = [m('input', null, cbAttrs).outerHTML];

		if (labels.first) {
			left.push(label(labels.first));
		}

		if (labels.second) {
			right.push(' ', label(labels.second));
		}
		if (labels.content) {
			right.push(labels.content);
		}

		right = m('div', right, { className: 'input-wrap' }).outerHTML;

		return m('div', left.concat(right), {
			className: `form-group ${name}-wrap`
		}).outerHTML;
	};

	const btnStyles = style => {
		let styleField: any = '';

		// corrects issue where 'undefined' was saved to formData
		if (style === 'undefined') {
			style = 'default';
		}

		const styleLabel = `<label>${i18n.style}</label>`;
		styleField += h.input({
			value: style || 'default',
			type: 'hidden',
			className: 'btn-style'
		}).outerHTML;
		styleField += '<div class="btn-group" role="group">';

		styles.btn.forEach(btnStyle => {
			const classList = ['btn-xs', 'btn', `btn-${btnStyle}`];
			if (style === btnStyle) {
				classList.push('selected');
			}
			const btn = m('button', I18N.get(`styles.btn.${btnStyle}`), {
				value: btnStyle,
				type: 'button',
				className: classList.join(' ')
			}).outerHTML;

			styleField += btn;
		});

		styleField += '</div>';

		styleField = m('div', [styleLabel, styleField], {
			className: 'form-group style-wrap'
		});

		return styleField.outerHTML;
	};

	/**
	 * Add a number attribute to a field.
	 * @param  {String} attribute
	 * @param  {Object} values
	 * @return {String} markup for number attribute
	 */
	const numberAttribute = (attribute, values) => {
		const attrVal = values[attribute];
		const attrLabel = i18n[attribute] || attribute;
		const placeholder = i18n[`placeholder.${attribute}`];
		const inputConfig = {
			type: 'number',
			value: attrVal,
			name: attribute,
			min: '0',
			placeholder: placeholder,
			className: `fld-${attribute} form-control`,
			id: `${attribute}-${data.lastID}`
		};
		const numberAttribute = h.input(utils.trimObj(inputConfig)).outerHTML;
		const inputWrap = `<div class="input-wrap">${numberAttribute}</div>`;
		const inputLabel = `<label for="${inputConfig.id}">${attrLabel}</label>`;

		return m('div', [inputLabel, inputWrap], {
			className: `form-group ${attribute}-wrap`
		}).outerHTML;
	};

	/**
	 * selectAttribute
	 * @param  {String} attribute  attribute name
	 * @param  {Object} values     aka attrs
	 * @param  {Array} optionData  select field option data
	 * @return {String}            select input makrup
	 */
	const selectAttribute = (attribute, values, optionData) => {
		const selectOptions: any = optionData.map((option, i) => {
			let optionAttrs = (<any>Object).assign(
				{
					label: `${i18n.option} ${i}`,
					value: undefined
				},
				option
			);
			if (option.value === values[attribute]) {
				optionAttrs.selected = true;
			}
			optionAttrs = utils.trimObj(optionAttrs);
			return m('option', optionAttrs.label, optionAttrs);
		});
		const selectAttrs = {
			id: attribute + '-' + data.lastID,
			name: attribute,
			className: `fld-${attribute} form-control`
		};
		const labelText = i18n[attribute] || utils.capitalize(attribute);
		const label = m('label', labelText, { for: selectAttrs.id });
		const select = m('select', selectOptions, selectAttrs);
		const inputWrap = m('div', select, { className: 'input-wrap' });
		const attrWrap = m('div', [label, inputWrap], {
			className: `form-group ${selectAttrs.name}-wrap`
		});

		return attrWrap.outerHTML;
	};

	/**
	 * Generate some text inputs for field attributes, **will be replaced**
	 * @param  {String} attribute
	 * @param  {Object} values
	 * @return {String}
	 */
	const textAttribute = (attribute, values) => {
		const textArea = ['paragraph'];

		let attrVal = values[attribute] || '';
		let attrLabel = i18n[attribute];

		if (attribute === 'label') {
			if (utils.inArray(values.type, textArea)) {
				attrLabel = i18n.content;
			} else {
				attrVal = utils.parsedHtml(values[attribute]);
			}
		}

		const placeholder = i18n[`placeholder.${attribute}`] || '';
		let attributefield: any = '';
		const noMakeAttr = [];

		if (!noMakeAttr.some(elem => elem === true)) {
			const inputConfig: any = {
				name: attribute,
				placeholder: placeholder,
				className: `fld-${attribute} form-control`,
				id: `${attribute}-${data.lastID}`
			};
			const attributeLabel = m('label', attrLabel, {
				for: inputConfig.id
			}).outerHTML;

			if (attribute === 'label') {
				inputConfig.contenteditable = true;
				attributefield += m('div', attrVal, inputConfig).outerHTML;
			} else {
				inputConfig.value = attrVal;
				inputConfig.type = 'text';
				attributefield += `<input ${utils.attrString(inputConfig)}>`;
			}

			const inputWrap = `<div class="input-wrap">${attributefield}</div>`;

			let visibility = 'block';
			if (attribute === 'value') {
				visibility = values.subtype && values.subtype === 'quill' && 'none';
			}

			attributefield = m('div', [attributeLabel, inputWrap], {
				className: `form-group ${attribute}-wrap`,
				style: `display: ${visibility}`
			});
		}

		return attributefield.outerHTML;
	};

	const requiredField = fieldData => {
		const { type } = fieldData;
		const noRequire = ['header', 'paragraph', 'button'];
		const noMake = [];
		let requireField = '';

		if (utils.inArray(type, noRequire)) {
			noMake.push(true);
		}
		if (!noMake.some(elem => elem === true)) {
			requireField = boolAttribute('required', fieldData, {
				first: i18n.required
			});
		}

		return requireField;
	};

	// Append the new field to the editor
	const appendNewField = function(values, isNew = true) {
		const type = values.type || 'text';
		const label = values.label || i18n[type] || i18n.label;
		if (opts.disabledFieldButtons === undefined) {
			opts.disabledFieldButtons = [];
		}
		const disabledFieldButtons = opts.disabledFieldButtons[type] || values.disabledFieldButtons;
		let fieldButtons = [
			m('a', null, {
				type: 'remove',
				id: 'del_' + data.lastID,
				className: 'del-button btn icon-cancel delete-confirm',
				title: i18n.removeMessage
			}),
			m('a', null, {
				type: 'edit',
				id: data.lastID + '-edit',
				className: 'toggle-form btn icon-pencil',
				title: i18n.hide
			}),
			m('a', null, {
				type: 'copy',
				id: data.lastID + '-copy',
				className: 'copy-button btn icon-copy',
				title: i18n.copyButtonTooltip
			})
		];

		if (disabledFieldButtons && Array.isArray(disabledFieldButtons)) {
			fieldButtons = fieldButtons.filter(btnData => !utils.inArray(btnData.type, disabledFieldButtons));
		}

		const liContents = [m('div', fieldButtons, { className: 'field-actions' })];

		liContents.push(
			m('label', utils.parsedHtml(label), {
				className: 'field-label'
			})
		);

		liContents.push(
			m('span', ' *', {
				className: 'required-asterisk',
				style: values.required ? 'display:inline' : ''
			})
		);

		// add the help icon
		const descAttrs = {
			className: 'tooltip-element',
			tooltip: values.description,
			style: values.description ? 'display:inline-block' : 'display:none'
		};
		liContents.push(m('span', '?', descAttrs));

		liContents.push(m('div', '', { className: 'prev-holder' }));
		const formElements = m('div', [advFields(values), m('a', i18n.close, { className: 'close-field' })], {
			className: 'form-elements'
		});
		liContents.push(
			m('div', formElements, {
				id: `${data.lastID}-holder`,
				className: 'frm-holder'
			})
		);

		const field = m('li', liContents, {
			class: type + '-field form-field',
			type: type,
			id: data.lastID
		});
		const $li = $(field);

		$li.data('fieldData', { attrs: values });

		if (typeof h.stopIndex !== 'undefined') {
			$('> li', d.stage)
				.eq(h.stopIndex)
				.before($li);
		} else {
			$stage.append($li);
		}

		(<any>jQuery('.sortable-options', $li)).sortable({
			update: () => h.updatePreview($li)
		});

		// generate the control, insert it into the list item & add it to the stage
		h.updatePreview($li);

		if (opts.typeUserEvents[type] && opts.typeUserEvents[type].onadd) {
			opts.typeUserEvents[type].onadd(field);
		}

		if (opts.editOnAdd && isNew) {
			h.closeAllEdit();
			h.toggleEdit(data.lastID, false);
			// field.scrollIntoView();
		}

		data.lastID = h.incrementId(data.lastID);
	};

	// Select field html, since there may be multiple
	const selectFieldOptions = function(name, optionData, multipleSelect) {
		const optionInputType = {
			selected: multipleSelect ? 'checkbox' : 'radio'
		};
		const optionDataOrder = ['value', 'label', 'selected'];
		const optionInputs = [];
		const optionTemplate = { selected: false, label: '', value: '' };

		optionData = (<any>Object).assign(optionTemplate, optionData);

		for (let i = optionDataOrder.length - 1; i >= 0; i--) {
			const prop = optionDataOrder[i];
			if (optionData.hasOwnProperty(prop)) {
				const attrs: any = {
					type: optionInputType[prop] || 'text',
					className: 'option-' + prop,
					value: optionData[prop],
					name: name + '-option'
				};

				attrs.placeholder = i18n[`placeholder.${prop}`] || '';

				if (prop === 'selected' && optionData.selected === true) {
					attrs.checked = optionData.selected;
				}

				optionInputs.push(m('input', null, attrs));
			}
		}

		const removeAttrs = {
			className: 'remove btn',
			title: i18n.removeMessage
		};
		optionInputs.push(utils.markup('a', i18n.remove, removeAttrs));

		const field = utils.markup('li', optionInputs);

		return field.outerHTML;
	};

	const cloneItem = function cloneItem(currentItem) {
		const currentId = currentItem.attr('id');
		const type = currentItem.attr('type');
		const ts = new Date().getTime();
		const cloneName = type + '-' + ts;
		const $clone = currentItem.clone();

		$('.fld-name', $clone).val(cloneName);
		$clone.find('[id]').each((i, elem) => {
			elem.id = elem.id.replace(currentId, data.lastID);
		});
		$clone.find('[for]').each((index, elem) => {
			const curId = elem.getAttribute('for');
			const newForId = curId.replace(currentId, data.lastID);
			elem.setAttribute('for', newForId);
		});

		$clone.attr('id', data.lastID);
		$clone.attr('name', cloneName);
		$clone.addClass('cloned');
		(<any>$('.sortable-options', $clone)).sortable();

		if (opts.typeUserEvents[type] && opts.typeUserEvents[type].onclone) {
			opts.typeUserEvents[type].onclone($clone[0]);
		}

		data.lastID = h.incrementId(data.lastID);
		return $clone;
	};

	// ---------------------- UTILITIES ---------------------- //

	// delete options
	$stage.on('click touchstart', '.remove', e => {
		const _event: any = e;
		const $field = jQuery(_event.target).parents('.form-field:eq(0)');
		const field = $field[0];
		const type: any = field.getAttribute('type');
		const $option = $(e.target.parentElement);
		e.preventDefault();
		const options = field.querySelector('.sortable-options');
		const optionsCount = options.childNodes.length;
		if (optionsCount <= 2 && !type.includes('checkbox')) {
			opts.notify.error('Error: ' + i18n.minOptionMessage);
		} else {
			$option.slideUp('250', () => {
				$option.remove();
				h.updatePreview($field);
				h.save.call(h);
			});
		}
	});

	// touch focus
	$stage.on('touchstart', 'input', e => {
		const $input = $(this);
		if ((<any>e).handled !== true) {
			if ($input.attr('type') === 'checkbox') {
				$input.trigger('click');
			} else {
				$input.focus();
				const fieldVal = $input.val();
				$input.val(fieldVal);
			}
		} else {
			return false;
		}
	});

	// toggle fields
	$stage.on('click touchstart', '.toggle-form, .close-field', function(e: any) {
		e.stopPropagation();
		e.preventDefault();
		if (e.handled !== true) {
			const targetID = $(e.target)
				.parents('.form-field:eq(0)')
				.attr('id');
			h.toggleEdit(targetID);
			(<any>e).handled = true;
		} else {
			return false;
		}
	});
	$stage.on('dblclick', 'li.form-field, .field-label', (e: any) => {
		if (e.target.tagName.toLowerCase() === 'input' || e.target.contentEditable) {
			return;
		}
		e.stopPropagation();
		e.preventDefault();
		if (e.handled !== true) {
			const targetID =
				e.target.tagName == 'li'
					? $(e.target).attr('id')
					: $(e.target)
							.closest('li.form-field')
							.attr('id');
			h.toggleEdit(targetID);
			e.handled = true;
		}
	});

	$stage.on('change', '[name="subtype"]', (e: any) => {
		const $field = $(e.target).closest('li.form-field');
		const $valWrap = $('.value-wrap', $field);
		$valWrap.toggle(e.target.value !== 'quill');
	});

	const stageOnChangeSelectors = ['.prev-holder input', '.prev-holder select', '.prev-holder textarea'];
	$stage.on('change', stageOnChangeSelectors.join(', '), e => {
		let prevOptions;
		const _event: any = e;
		if (_event.target.classList.contains('other-option')) {
			return;
		}
		const field = utils.closest(_event.target, '.form-field');
		const optionTypes = ['select', 'checkbox-group', 'radio-group'];
		if (utils.inArray(field.type, optionTypes)) {
			const options = field.getElementsByClassName('option-value');
			if (field.type === 'select') {
				utils.forEach(options, i => {
					const selectedOption = options[i].parentElement.childNodes[0];
					selectedOption.checked = _event.target.value === options[i].value;
				});
			} else {
				prevOptions = document.getElementsByName(_event.target.name);
				utils.forEach(prevOptions, i => {
					const selectedOption = options[i].parentElement.childNodes[0];
					selectedOption.checked = prevOptions[i].checked;
				});
			}
		} else {
			const fieldVal: any = document.getElementById('value-' + field.id);
			if (fieldVal) {
				fieldVal.value = _event.target.value;
			}
		}

		h.save.call(h);
	});

	// update preview to label
	utils.addEventListeners(d.stage, 'keyup change', e => {
		if (!e.target.classList.contains('fld-label')) {
			return;
		}
		const value = e.target.value || e.target.innerHTML;
		const label = utils.closest(e.target, '.form-field').querySelector('.field-label');
		label.innerHTML = utils.parsedHtml(value);
	});

	// remove error styling when users tries to correct mistake
	$stage.on('keyup', 'input.error', function(e) {
		$(e.target).removeClass('error');
	});

	// update preview for description
	$stage.on('keyup', 'input[name="description"]', function(e) {
		const $field = $(e.target).parents('.form-field:eq(0)');
		const closestToolTip = $('.tooltip-element', $field);
		const ttVal: any = $(e.target).val();
		if (ttVal !== '') {
			if (!closestToolTip.length) {
				// language=HTML
				const tt = `<span class="tooltip-element" tooltip="${ttVal}">?</span>`;
				$('.field-label', $field).after(tt);
			} else {
				closestToolTip.attr('tooltip', ttVal).css('display', 'inline-block');
			}
		} else {
			if (closestToolTip.length) {
				closestToolTip.css('display', 'none');
			}
		}
	});

	/**
	 * Toggle multiple select options
	 * @param  {Object} e click event
	 * @return {String} newType
	 */
	$stage.on('change', '.fld-multiple', e => {
		const _event: any = e;
		const newType: any = _event.target.checked ? 'checkbox' : 'radio';
		const $options: any = $('.option-selected', $(e.target).closest('.form-elements'));
		$options.each(i => ($options[i].type = newType));
		return newType;
	});

	// format name attribute
	$stage.on('blur', 'input.fld-name', function(e: any) {
		e.target.value = utils.safename(e.target.value);
		if (e.target.value === '') {
			$(e.target)
				.addClass('field-error')
				.attr('placeholder', i18n.cannotBeEmpty);
		} else {
			$(e.target).removeClass('field-error');
		}
	});

	$stage.on('blur', 'input.fld-maxlength', e => {
		const _event: any = e;
		_event.target.value = utils.forceNumber(_event.target.value);
	});

	// Copy field
	$stage.on('click touchstart', '.icon-copy', function(e) {
		e.preventDefault();
		const currentItem = $(e.target)
			.parent()
			.parent('li');
		const $clone = cloneItem(currentItem);
		$clone.insertAfter(currentItem);
		h.updatePreview($clone);
		h.save.call(h);
	});

	// Delete field
	$stage.on('click touchstart', '.delete-confirm', e => {
		e.preventDefault();

		const buttonPosition = e.target.getBoundingClientRect();
		const bodyRect = document.body.getBoundingClientRect();
		const coords = {
			pageX: buttonPosition.left + buttonPosition.width / 2,
			pageY: buttonPosition.top - bodyRect.top - 12
		};

		const deleteID = $(e.target)
			.parents('.form-field:eq(0)')
			.attr('id');
		const $field = $(document.getElementById(deleteID));

		document.addEventListener(
			'modalClosed',
			function() {
				$field.removeClass('deleting');
			},
			false
		);

		// Check if user is sure they want to remove the field
		if (opts.fieldRemoveWarn) {
			const warnH3 = utils.markup('h3', i18n.warning);
			const warnMessage = utils.markup('p', i18n.fieldRemoveWarning);
			h.confirm([warnH3, warnMessage], () => h.removeField(deleteID), coords);
			$field.addClass('deleting');
		} else {
			h.removeField(deleteID);
		}
	});

	// Update button style selection
	$stage.on('click', '.style-wrap button', e => {
		const $button = $(e.target);
		const styleVal = $button.val();
		const $btnStyle = $button.parent().prev('.btn-style');
		$btnStyle.val(styleVal);
		$button.siblings('.btn').removeClass('selected');
		$button.addClass('selected');
		h.updatePreview($btnStyle.closest('.form-field'));
		h.save.call(h);
	});

	// Attach a callback to toggle required asterisk
	$stage.on('click', '.fld-required', e => {
		$(e.target)
			.closest('.form-field')
			.find('.required-asterisk')
			.toggle();
	});

	// Attach a callback to toggle roles visibility
	$stage.on('click', 'input.fld-access', function(e) {
		const roles = $(e.target)
			.closest('.form-field')
			.find('.available-roles');
		const enableRolesCB = $(e.target);
		roles.slideToggle(250, function() {
			if (!enableRolesCB.is(':checked')) {
				$('input[type=checkbox]', roles).removeAttr('checked');
			}
		});
	});

	// Attach a callback to add new options
	$stage.on('click', '.add-opt', function(e) {
		e.preventDefault();
		const $optionWrap = $(e.target).closest('.field-options');
		const $multiple = $('[name="multiple"]', $optionWrap);
		const $firstOption = $('.option-selected:eq(0)', $optionWrap);
		let isMultiple = false;

		if ($multiple.length) {
			isMultiple = $multiple.prop('checked');
		} else {
			isMultiple = $firstOption.attr('type') === 'checkbox';
		}

		const name = $firstOption.attr('name');

		$('.sortable-options', $optionWrap).append(selectFieldOptions(name, false, isMultiple));
	});

	$stage.on('mouseover mouseout', '.remove, .del-button', e =>
		$(e.target)
			.closest('li')
			.toggleClass('delete')
	);

	loadFields();

	$stage.css('min-height', $cbUL.height());

	// If option set, controls will remain in view in editor
	if (opts.stickyControls.enable) {
		h.stickyControls($stage);
	}

	if (opts.disableInjectedStyle) {
		const styleTags = document.getElementsByClassName('formBuilder-injected-style');
		utils.forEach(styleTags, i => remove(styleTags[i]));
	}

	document.dispatchEvent(events.loaded);

	// Make actions accessible
	if (formBuilder !== undefined) {
		formBuilder.actions = {
			clearFields: animate => h.removeAllFields(d.stage, animate),
			showData: h.showData.bind(h),
			save: h.save.bind(h),
			addField: (field, index) => {
				h.stopIndex = data.formData.length ? index : undefined;
				prepFieldVars(field);
				document.dispatchEvent(events.fieldAdded);
			},
			removeField: h.removeField.bind(h),
			getData: h.getFormData.bind(h),
			setData: formData => {
				h.stopIndex = undefined;
				h.removeAllFields(d.stage, false);
				loadFields(formData);
				h.save.call(h);
			},
			setLang: async locale => {
				await I18N.setCurrent.call(I18N, locale);
				d.empty(element);
				const formBuilder = FormBuilder(originalOpts, element);
				$(element).data('formBuilder', formBuilder);
			}
		};
	}
	return formBuilder;
};
