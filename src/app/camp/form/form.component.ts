import { Component, OnInit } from '@angular/core';
import { CampService } from '../../services/camp.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomizeObject } from '../../shared/classes/cutomizeObject';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
	title: string;
	campForm: FormGroup;
	buildForm = false;
	change_in_params: any;
	submitted = false;
	formData = new FormData();
	errors: any = [];
	campaignData: any;
	modulesData: any;
	formsData: any;
	companyData: any;
	groupData: any;
	camp_id: string;
	value5 = 'foo3';
	minCountForSearch = Infinity;
	dropdownSettings: {};
	selected_modules = [];
	dropdownSettingsCompany: {};
	dropdownSettingsModule: {};
	dropdownSettingsSingleSelect: {};
	logo: File = null;
	currentLogo: string;
	active:any;
	editFlag = false;
	color1 = '#ffffff';

	constructor(
		private campService: CampService,
		private fb: FormBuilder,
		private activeRoute: ActivatedRoute,
		private toasterService: ToastrService,
		private router: Router
	) {}

	ngOnInit() {
		this.title = this.activeRoute.snapshot.data['title'];
		this.companyData = this.campService.getCompanies();

		this.change_in_params = this.activeRoute.params
			.flatMap((params: any) => {
				if (params.id) {
					this.camp_id = params.id;
					return this.campService.getAll({ id: params.id });
				}
				return this.activeRoute.params;
			})
			.subscribe(result => {
				if (result['data']) {
					this.logo = null;
					this.currentLogo = result['data'][0].logo;
					this.campForm = this.create_form(result['data'][0]);
				} else {
					this.campForm = this.create_form();
				}

				this.buildForm = true;
			});
	}

	getCampaign(company_id?: string) {
		if (typeof company_id === 'object') {
			company_id = company_id['id'];
		}

		if (company_id) {
			this.campaignData = this.campService.getCampaignFromCompany(company_id);
			this.modulesData = this.campService.getModules();
		} else {
			this.campaignData = this.campService.getCampaignFromCompany(this.campForm.value.company_id);
			this.modulesData = this.campService.getModules();
		}
	}

	getGroup(campaign_id?: string) {
		if (typeof campaign_id === 'object') {
			campaign_id = campaign_id['id'];
		}

		if (campaign_id) {
			this.groupData = this.campService.getGroupFromcampaign(campaign_id);
			this.formsData = this.campService.getForms(campaign_id);
		} else {
			this.groupData = this.campService.getGroupFromcampaign(this.campForm.value.campaign_id);
			this.formsData = this.campService.getForms(this.campForm.value.campaign_id);
		}
	}

	create_form(data?: any) {
		this.dropdownSettings = CustomizeObject.dropDownSettings();
		this.dropdownSettingsSingleSelect = CustomizeObject.dropDownSettings(true,true);
		this.dropdownSettingsModule = CustomizeObject.dropDownSettings(false, false, 'id', 'name');
		this.dropdownSettingsCompany = CustomizeObject.dropDownSettings(true);
		let start_date = [];
		let end_date = [];

		if (data) {
			this.getCampaign(data['campaigns'].company.id);
			this.getGroup(data['campaigns'].id);
			start_date = data.start_date.split('-');
			end_date = data.end_date.split('-');
		}
		return this.fb.group({
			name: [data ? data['name'] : '', [Validators.required]],
			start_date: [
				data
					? {
							day: +start_date[2],
							month: +start_date[1],
							year: +start_date[0]
					  }
					: '',
				[Validators.required]
			],
			end_date: [
				data
					? {
							day: +end_date[2],
							month: +end_date[1],
							year: +end_date[0]
					  }
					: '',
				[Validators.required]
			],
			company_id: [data ? [data['campaigns'].company] : '', [Validators.required]],
			campaign_id: [data ? [data['campaigns']] : '', [Validators.required]],
			module_id: [data ? data['modules'] : '', [Validators.required]],
			group_id: [data ? [data['groups']] : '', [Validators.required]],
			form_id: [data ? [data['form'][0]] : ''],
			logo: [],
			settings: this.fb.array([this.setting_arr(data)]),
			is_active: [data ? data['is_active'] : true],
			camp_id: [data ? data['id'] : '']
		});
	}

	setting_arr(data?: any): FormGroup {
		return this.fb.group({
			color: [data && data.settings ? data.settings.color : ''],
			limit_per_user: [data && data.settings ? data.settings.limit_per_user : '', [Validators.pattern('^[0-9]*$')]],
			is_doctor_editable: [data && data.settings ? data.settings.is_doctor_editable : true],
			is_doctor_add: [data && data.settings ? data.settings.is_doctor_add : true]
		});
	}

	get formObj() {
		return this.campForm.controls;
	}

	saveObject(data) {
		this.selected_modules.push({
			id: data.module_id
		});
	}

	removeObject(module_id) {
		const index = this.selected_modules.findIndex(x => x.id === module_id);
		if (index > -1) {
			this.selected_modules.splice(index, 1);
		}
	}

	logoChange(files: FileList) {
		this.logo = files.length ? files.item(0) : null;
	}

	colorChanged(color) {
		this.settings.controls[0].get('color').patchValue(color);
	}

	get settings(): FormArray {
		return this.campForm.get('settings') as FormArray;
	}

	booleanToBinary(flag) {
		return (flag) ? 1 : 0;
	}

	onSubmit() {
		this.submitted = true;
		if (this.campForm.invalid) {
			return;
		}

		if (typeof this.campForm.value.campaign_id === 'object') {
			this.campForm.value.campaign_id = this.campForm.value.campaign_id[0].id;
		}
		if (typeof this.campForm.value.group_id === 'object') {
			this.campForm.value.group_id = this.campForm.value.group_id[0].id;
		}
		if (typeof this.campForm.value.form_id === 'object') {
			this.campForm.value.form_id = this.campForm.value.form_id[0].id;
		}

		if (this.campForm.value.module_id.length) {
			this.campForm.value.module_id = this.campForm.value.module_id.map(reformat => reformat.id);
		}

		const modules = [];
		modules.push(this.campForm.value.module_id);
		this.campForm.value.module = modules;

		const campData = this.campService.convertToFormData(this.campForm.value);

		campData.set('settings[is_doctor_editable]',String(this.campForm.value.settings[0].is_doctor_editable));
		campData.set('settings[is_doctor_add]',String(this.campForm.value.settings[0].is_doctor_add));

		const camp_id = this.campForm.value.camp_id;

		if (this.logo) {
			campData.set('logo', this.logo, this.logo.name);
		} else {
			campData.delete('logo');
		}

		if (!camp_id) {
			this.campService.save(campData).subscribe(
				(responseData: any) => this.addUpdate('/camp', 'Records Added Successfully!'),
				(err: HttpErrorResponse) => this.controlError(err)
			);
		} else {
			this.campService.update(campData, camp_id).subscribe(
				(responseData: any) => this.addUpdate('/camp', 'Records Updated Successfully!'),
				(err: HttpErrorResponse) => {
					this.controlError(err);
				}
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
