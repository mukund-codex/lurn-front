import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { config, defaultI18n, defaultOptions } from '../formbuilder/config';
import { FormBuilderCreateor } from '../formbuilder/form-builder';
import I18N from '../formbuilder/mi18n';
import { FormGroup, Validators, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { ModuleFormbuildersMasterService } from '../../services/moduleFormbuildersMaster.service';
import { CustomizeObject } from '../../shared/classes/cutomizeObject';
import { ToastrService } from 'ngx-toastr';
import 'rxjs/add/operator/mergeMap';
import { forkJoin, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CampaignService } from 'src/app/services/campaign.service';
import { CblocksService } from 'src/app/services/cblocks.service';

function initJq() {
	(function($) {
		(<any>$.fn).formBuilder = function(options) {
			if (!options) {
				options = {};
			}
			const elems = this;
			const { i18n, ...opts } = $.extend({}, defaultOptions, options, true);
			(<any>config).opts = opts;
			const i18nOpts = $.extend({}, defaultI18n, i18n, true);
			const instance = {
				actions: {
					getData: null,
					setData: null,
					save: null,
					showData: null,
					setLang: null,
					addField: null,
					removeField: null,
					clearFields: null
				},
				get formData() {
					return instance.actions.getData('json');
				},

				promise: new Promise(function(resolve, reject) {
					new I18N()
						.init(i18nOpts)
						.then(() => {
							elems.each(i => {
								const formBuilder = new FormBuilderCreateor().getFormBuilder(opts, elems[i]);
								$(elems[i]).data('formBuilder', formBuilder);
								if (formBuilder) {
									instance.actions = formBuilder.actions;
								}
							});

							delete instance.promise;
							resolve(instance);
						})
						.catch(console.error);
				})
			};

			return instance;
		};
	})(jQuery);
}

@Component({
	selector: 'app-formbuilders-master',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
	formBuilder: any;
	formbuildersForm: FormGroup;
	title = 'Doctor Formbuilder';
	buildForm: boolean;
	editFlag = true;
	change_in_params: any;
	errors: any = [];
	dropdownSettings: {};
	campaignData: any;
	submitted = false;
	formbuildersfbId: string;
	defaultFields: any;
	campaign_id: string;
	campaignFormData: any;
	campaignFormId: string;
	module_id: string;
	fields_data: [];

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private activeRoute: ActivatedRoute,
		private toasterService: ToastrService,
		private formbuildersMasterService: ModuleFormbuildersMasterService,
		private cs: CampaignService,
	) {}
	

	ngOnInit(): void {
		initJq();
		const that = this;
		this.campaign_id = this.getCurrentCampaign();

		this.activeRoute.queryParams.subscribe(queryParams => {
			this.module_id = queryParams.module_id;
		});

		this.change_in_params = this.activeRoute.params
			.flatMap((params: any) => {
				if (params.id) {
					this.formbuildersfbId = params.id;
					return this.formbuildersMasterService.getAll({ id: params.id });
				}
				return this.activeRoute.params;
			})
			.subscribe(result => {
				that.defaultFields = [];
				if (result['data']) {
					this.formbuildersForm = this.create_form(result['data'][0]);
					that.defaultFields = result['data'][0].form;
				} else {
					this.formbuildersForm = this.create_form();
				}

				forkJoin(this.formbuildersMasterService.getCampaignData(this.campaign_id)).subscribe(([campaignData]) => {

					that.campaignFormData = campaignData['data'][0].form.form;
					that.campaignFormId = campaignData['data'][0].form.id;
					let flag: Boolean;

					that.campaignFormData.map((o, i) => {
						if(result['data']) {
							const fields_data = result['data'][0].fields;
							if(fields_data) {
								flag = (fields_data.indexOf(o['name']) > -1);
							}
						}
						const control = new FormControl(flag);
						(this.formbuildersForm.controls.fields as FormArray).push(control);						
					});

					const options = {
						onSave: function(evt, formData) {
							that.onSubmit(formData);
						},

						defaultFields: that.defaultFields,
						disabledActionButtons: ['data', 'clear'],
						disableFields: ['button', 'autocomplete', 'hidden', 'paragraph', 'checkbox-group', 'header'],
						inputSets: [],

						typeUserAttrs: {
							text: {
								pattern: {
									label: 'Pattern',
									options: {
										'^[a-zA-Z ]{3,50}$': 'Only Alphabets',
										'^[2-9]{2}[0-9]{8}$': 'Only Numbers',
										'/[a-zA-Z0-9]{3,150}$/': 'Email',
										'^[a-zA-Z0-9 ]{3,255}$': 'Alpha Numeric'
									}
								},
								more: {
									label: 'More',
									description: 'Enter a RegExp passwords must match'
								},
								unique: {
									type: 'checkbox',
									label: 'Unique?'
								},
								is_viewable: {
									type: 'checkbox',
									label: 'View in App?',
									checked: ''
								},
								minlength: {
									label: 'Min length',
									description: 'Minimum Length'
								},
								exactlength: {
									label: 'Exact length',
									description: 'Exact Length'
								},
								sort_order: {
									label: 'Sort Order',
									description: 'Sort Order'
								},
								is_editable: {
									type: 'checkbox',
									label: 'Is editable?',
									checked: ''
								},
								// required : true
							},
							date: {
								minDate: {
									label: 'Min Date',
									type: 'date',
									maxlength: '10',
									description: 'Minimum'
								},
								maxDate: {
									label: 'Max Date',
									type: 'date',
									maxlength: '10',
									placeholder: 'Maximum'
								},
								is_viewable: {
									type: 'checkbox',
									label: 'Viewable on App?',
									checked: ''
								},
								sort_order: {
									label: 'Sort Order',
									description: 'Sort Order'
								},
								is_editable: {
									type: 'checkbox',
									label: 'Is editable?',
									checked: ''
								}
							},
							number: {
								is_viewable: {
									type: 'checkbox',
									label: 'Viewable on App?',
									checked: ''
								},
								sort_order: {
									label: 'Sort Order',
									description: 'Sort Order'
								},
								is_editable: {
									type: 'checkbox',
									label: 'Is editable?',
									checked: ''
								}
							},
							textarea: {
								is_viewable: {
									type: 'checkbox',
									label: 'Viewable on App?',
									checked: ''
								},
								sort_order: {
									label: 'Sort Order',
									description: 'Sort Order'
								},
								is_editable: {
									type: 'checkbox',
									label: 'Is editable?',
									checked: ''
								}
							},
							select: {
								is_viewable: {
									type: 'checkbox',
									label: 'Viewable on App?',
									checked: ''
								},
								sort_order: {
									label: 'Sort Order',
									description: 'Sort Order'
								},
								is_editable: {
									type: 'checkbox',
									label: 'Is editable?',
									checked: ''
								}
							},
							file: {
								is_viewable: {
									type: 'checkbox',
									label: 'View in App?',
									checked: ''
								},
								sort_order: {
									label: 'Sort Order',
									description: 'Sort Order'
								},
								is_editable: {
									type: 'checkbox',
									label: 'Is editable?',
									checked: ''
								},
								
							},
							'radio-group': {
								is_viewable: {
									type: 'checkbox',
									label: 'View in App?',
									checked: ''
								},
								sort_order: {
									label: 'Sort Order',
									description: 'Sort Order'
								},
								is_editable: {
									type: 'checkbox',
									label: 'Is editable?',
									checked: ''
								}
							}
						}
					};
					this.formBuilder = (<any>jQuery('.build-wrap')).formBuilder(options);
					
				});

				this.buildForm = true;
			});

		this.dropdownSettings = CustomizeObject.dropDownSettings(true);
	}

	getCurrentCampaign() {
		return this.cs.getCampaignId();
	}

	create_form(data?: FormGroup): FormGroup {
		return this.fb.group({
			name: [data ? data['name'] : "", [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
			is_active: [data ? data['is_active'] : 'true'],
			formbuildersfBid: [data ? data['id'] : ''],
			fields: this.fb.array([])
		});
	}

	get formObj() {
		return this.formbuildersForm.controls;
	}

	onSubmit(formData) {
		this.submitted = true;
		if (this.formbuildersForm.invalid) {
			return;
		}

		this.formbuildersForm.value.form = formData.toString();
		const formbuildersData = this.formbuildersForm.value;
		const formbuildersfBid = this.formbuildersForm.value.formbuildersfBid;
		this.formbuildersForm.value.campaign_id = this.campaign_id;
		this.formbuildersForm.value.form_master_id = this.campaignFormId;
		formbuildersData.module_id = this.module_id;

		const fields = [];
		this.campaignFormData.map((o, i) => {
			if (formbuildersData.fields[i]) {
				formbuildersData['fields'][i] = this.campaignFormData[i]['name'];
				fields.push(this.campaignFormData[i]['name']);
			}
		});

		formbuildersData['fields'] = fields;		
		if (!formbuildersfBid) {
			this.formbuildersMasterService.save(formbuildersData).subscribe(
				(responseData: any) => this.addUpdate('/module-formbuilder', 'Records Added Successfully!'),
				(err: HttpErrorResponse) => this.controlError(err)
			);
		} else {
			const form_data = new FormData();
			for (const key in formbuildersData) {
				if (formbuildersData[key]) {
					
					if(typeof formbuildersData[key] == 'object') {
						formbuildersData[key].forEach((element, i) => {
							if(element) {
								form_data.set('fields[' + i + ']', element);
							}
						});
					} else {
						form_data.append(key, formbuildersData[key]);
					}
				}
			}

			this.formbuildersMasterService.update(form_data, formbuildersfBid).subscribe(
				(responseData: any) => this.addUpdate('/module-formbuilder', 'Records Updated Successfully!'),
				(err: HttpErrorResponse) => this.controlError(err)
			);
		}
	}

	addUpdate(navigateTo, message) {
		this.router.navigate([navigateTo], { queryParams : { campaign_id: this.campaign_id, module_id: this.module_id } }).then(() => {
			this.toasterService.success(message, 'Success!', {
				positionClass: 'toast-top-right'
			});
		});
	}

	controlError(err) {
		if (err.status === 400) {
			for (const field of Object.keys(err.error.error)) {
				const errorData = err.error.error[field];
				this.errors.push(errorData);
			}
		}
	}

	changeCampaign(campaign) {
		this.cs.setCampaignId(campaign.id);
	}
}
