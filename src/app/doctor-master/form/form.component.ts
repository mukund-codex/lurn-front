import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { config, defaultI18n, defaultOptions } from '../formbuilder/config';
import { FormBuilderCreateor } from '../formbuilder/form-builder';
import I18N from '../formbuilder/mi18n';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DoctorMasterService } from '../../services/doctorMaster.service';
import { CustomizeObject } from '../../shared/classes/cutomizeObject';
import { ToastrService } from 'ngx-toastr';
import 'rxjs/add/operator/mergeMap';
import { forkJoin, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

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
	selector: 'app-doctor-master',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.css']
	// encapsulation: ViewEncapsulation.None
})
export class FormComponent implements OnInit {
	formBuilder: any;
	doctorForm: FormGroup;
	title = 'app';
	buildForm: boolean;
	editFlag = true;
	change_in_params: any;
	companies: any;
	errors: any = [];
	dropdownSettings: {};
	campsData: any;
	submitted = false;
	doctorfbId: string;
	defaultFields: any;

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private activeRoute: ActivatedRoute,
		private toasterService: ToastrService,
		private doctorMasterService: DoctorMasterService
	) {}

	ngOnInit(): void {
		initJq();
		const that = this;

		this.change_in_params = this.activeRoute.params
			.flatMap((params: any) => {
				if (params.id) {
					this.doctorfbId = params.id;
					return this.doctorMasterService.getAll({ id: params.id });
				}
				return this.activeRoute.params;
			})
			.subscribe(result => {
				if (result['data']) {
					this.doctorForm = this.create_form(result['data'][0]);
				} else {
					this.doctorForm = this.create_form();
				}

				forkJoin(this.doctorMasterService.getLanguages()).subscribe(([languages]) => {
					const values = [];
					for (const row of languages['data']) {
						values.push({ label: row.name, value: row.id });
					}

					if (result['data']) {
						that.defaultFields = result['data'][0].form;
						that.defaultFields.map(function(obj, index) {
							if (obj.name === 'language') {
								that.defaultFields[index].disabledFieldButtons = ['remove', 'edit', 'copy'];
							}
						});
					} else {
						that.defaultFields = [
							{
								className: 'form-control',
								label: 'Language',
								name: 'language',
								type: 'select',
								required: true,
								multiple: true,
								values: values,
								disabledFieldButtons: ['remove', 'edit', 'copy']
							}
						];
					}

					const options = {
						onSave: function(evt, formData) {
							that.onSubmit(formData);
						},
						defaultFields: that.defaultFields,
						disabledActionButtons: ['data', 'clear'],
						disableFields: ['button', 'autocomplete', 'hidden', 'paragraph', 'checkbox-group', 'header', 'number'],
						typeUserAttrs: {
							text: {
								pattern: {
									label: 'Pattern',
									options: {
										'^[a-zA-Z]{3,50}$': 'Only Alphabets',
										'^[0-9]{1,50}$': 'Number',
										'/[a-zA-Z]{3,100}$/': 'Email',
										'^[a-zA-Z0-9]{3,100}$': 'Alpha Numeric'
									}
								}
							}
						}
					};
					this.formBuilder = (<any>jQuery('.build-wrap')).formBuilder(options);
				});

				this.buildForm = true;
			});

		this.dropdownSettings = CustomizeObject.dropDownSettings(true);
		this.companies = this.doctorMasterService.getCompanies();
	}

	getCamps(company_id?: string) {
		if (typeof company_id === 'object') {
			company_id = company_id['id'];
		}
		if (company_id) {
			this.campsData = this.doctorMasterService.getCampsFromCompany(company_id);
		}
	}

	create_form(data?: FormGroup): FormGroup {
		if (data) {
			this.getCamps(data['campaign'][0]['company']);
		}

		return this.fb.group({
			company_id: [data ? [data['campaign'][0]['company']] : '', [Validators.required]],
			camp_id: [data ? [data['camp']] : '', [Validators.required]],
			is_active: [data ? data['is_active'] : 'true'],
			doctorfBid: [data ? data['id'] : '']
		});
	}

	get formObj() {
		return this.doctorForm.controls;
	}

	onSubmit(formData) {
		this.submitted = true;
		if (this.doctorForm.invalid) {
			return;
		}
		this.doctorForm.value.settings = formData.toString();
		const doctorData = this.doctorForm.value;
		const doctorfBid = this.doctorForm.value.doctorfBid;

		this.doctorForm.value.camp_id = this.doctorForm.value.camp_id[0].id;
		if (!doctorfBid) {
			this.doctorMasterService.save(doctorData).subscribe(
				(responseData: any) => this.addUpdate('/doctor', 'Records Added Successfully!'),
				(err: HttpErrorResponse) => this.controlError(err)
			);
		} else {
			const form_data = new FormData();
			for (const key in doctorData) {
				if (doctorData[key]) {
					form_data.append(key, doctorData[key]);
				}
			}

			this.doctorMasterService.update(form_data, doctorfBid).subscribe(
				(responseData: any) => this.addUpdate('/doctor', 'Records Updated Successfully!'),
				(err: HttpErrorResponse) => this.controlError(err)
			);
		}
	}

	addUpdate(navigateTo, message) {
		this.router.navigate([navigateTo]).then(() => {
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
}
