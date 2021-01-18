import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { config, defaultI18n, defaultOptions } from '../formbuilder/config';
import { FormBuilderCreateor } from '../formbuilder/form-builder';
import I18N from '../formbuilder/mi18n';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormbuildersMasterService } from '../../services/formbuildersMaster.service';
import { CustomizeObject } from '../../shared/classes/cutomizeObject';
import { ToastrService } from 'ngx-toastr';
import 'rxjs/add/operator/mergeMap';
import { forkJoin, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CampaignService } from 'src/app/services/campaign.service';
import { json } from 'ngx-custom-validators/src/app/json/validator';
// www.jqueryform.com/builder.php

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
	title = 'Formbuilder';
	buildForm: boolean;
	editFlag = true;
	change_in_params: any;
	companies: any;
	errors: any = [];
	dropdownSettings: {};
	campaignData: any;
	submitted = false;
	formbuildersfbId: string;
	defaultFields: any;
	campaign_id: string;
	error_messages: any = [];
	formDataError: Boolean = false;
	
	constructor(
		private fb: FormBuilder,
		private router: Router,
		private activeRoute: ActivatedRoute,
		private toasterService: ToastrService,
		private formbuildersMasterService: FormbuildersMasterService,
		private cs: CampaignService
	) {}
	

	ngOnInit(): void {
		initJq();
		const that = this;
		this.campaign_id = this.getCurrentCampaign();

		this.change_in_params = this.activeRoute.params
			.flatMap((params: any) => {
				if (params.id) {
					this.formbuildersfbId = params.id;
					return this.formbuildersMasterService.getAll({ id: params.id });
				}
				return this.activeRoute.params;
			})
			.subscribe(result => {
				if (result['data']) {
					this.formbuildersForm = this.create_form(result['data'][0]);
				} else {
					this.formbuildersForm = this.create_form();
				}

				forkJoin(this.formbuildersMasterService.getLanguages()).subscribe(([languages]) => {
					that.defaultFields = [];
					if(result['data']) {
						that.defaultFields = result['data'][0].form;
						that.defaultFields.forEach(function (value, i) {
							// that.defaultFields[i].name.visible = false;
						  }); 
					}


					const options = {
						onSave: function(evt, formData) {
							that.onSubmit(formData);
						},

						defaultFields: that.defaultFields,
						disabledActionButtons: ['data', 'clear'],
						disableFields: ['button', 'autocomplete', 'hidden', 'paragraph', 'checkbox-group', 'header', 'number'],
						inputSets: [],

						typeUserAttrs: {
							text: {
								pattern: {
									label: 'Pattern',
									options: {
										'^([a-zA-Z .])+$': 'Only Alphabets',
										'^([0-9])+$': 'Only Numbers',
										'^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$': 'Email',
										'^[a-zA-Z0-9 .]$': 'Alpha Numeric'
									}
								},
								more: {
									label: 'More',
									description: 'Enter a RegExp passwords must match'
								},
								unique: {
									type: 'checkbox',
									label: 'Unique?',
									checked: false
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
							},
							number: {
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
							},
							textarea: {
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
							},
							select: {
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
		this.companies = this.formbuildersMasterService.getCompanies();
	}

	fixCheckedProps(fld) {
	}

	getCurrentCampaign() {
		return this.cs.getCampaignId();
	}

	getCampaign(company_id?: string) {
		if (typeof company_id === 'object') {
			company_id = company_id['id'];
		}
		if (company_id) {
			this.campaignData = this.formbuildersMasterService.getCampaignFromCompany(company_id);
		}
	}

	create_form(data?: FormGroup): FormGroup {
		return this.fb.group({
			name: [data ? data['name'] : "", [Validators.required, Validators.pattern('^([a-zA-Z0-9 .])+$'), Validators.minLength(3), Validators.maxLength(50)]],
			is_active: [data ? data['is_active'] : 'true'],
			formbuildersfBid: [data ? data['id'] : '']
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

		if(!(JSON.parse(formData).length)) {
			this.formDataError = true;
			return;
		}

		this.formbuildersForm.value.form = formData.toString();
		const formbuildersData = this.formbuildersForm.value;
		const formbuildersfBid = this.formbuildersForm.value.formbuildersfBid;

		this.formbuildersForm.value.campaign_id = this.campaign_id;
		if (!formbuildersfBid) {
			this.formbuildersMasterService.save(formbuildersData).subscribe(
				(responseData: any) => this.addUpdate('/formbuilders', 'Records Added Successfully!'),
				(err: HttpErrorResponse) => this.controlError(err)
			);
		} else {
			const form_data = new FormData();
			for (const key in formbuildersData) {
				if (formbuildersData[key]) {
					form_data.append(key, formbuildersData[key]);
				}
			}

			this.formbuildersMasterService.update(form_data, formbuildersfBid).subscribe(
				(responseData: any) => this.addUpdate('/formbuilders', 'Records Updated Successfully!'),
				(err: HttpErrorResponse) => this.controlError(err)
			);
		}
	}

	addUpdate(navigateTo, message) {
		this.router.navigate([navigateTo], { queryParams : { campaign_id: this.campaign_id } }).then(() => {
			this.toasterService.success(message, 'Success!', {
				positionClass: 'toast-top-right'
			});
		});
	}

	controlError(err) {
		if (err.status === 400) {
			this.error_messages = err.error.error;
		} else {
			alert('Problems while saving data');
		}
	}

	changeCampaign(campaign) {
		this.cs.setCampaignId(campaign.id);
	}
}
