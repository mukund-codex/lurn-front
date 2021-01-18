import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { CblocksService } from '../../services/cblocks.service';
import { FormControl, FormGroup, FormBuilder, Validators,FormArray} from '@angular/forms';
import { CampService } from '../../services/camp.service';
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';
import { GeographyService } from '../../services/geography.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CustomizeObject } from '../../shared/classes/cutomizeObject';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import { ModuleDateValidator } from '../../shared/moduledate.validator';

import { concatMap, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import 'rxjs/add/observable/merge';
import { CampaignService } from 'src/app/services/campaign.service';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
	title: string;
	moduleForm: FormGroup;
	change_in_params: any;
	buildForm: boolean;
	module_id: string;
	module_name: string;
	submitted = false;
	editFlag = false;
	languages: any;
	campaignData: any;
	modulesData: any;
	camp_id: string;
	default_language: any[] = [];
	formData = new FormData();
	groupData: any;
	formsData: any;
	dropdownSettingsSingleSelect: {};
	dropdownSettings: {};
	dropdownSettingsType: {};
	dropdownSettingsCompany: {};
	dropdownSettingsLanguage: {};
	records: any;
	errors: any = [];
	uploadFields: any = [];
	@ViewChild('searchForm') sf: NgForm;
	color1 = "#ffffff";
	error_messages: any = [];
	minDate = {};
	isDropdownDisabled = false;
	selected_type: any;
	currentLogo: string;
	logo: File = null;

	private subscription = new Subscription();
	types = [
		{ id: 'image', name: 'image' },
		{ id: 'gif', name: 'gif' },
		{ id: 'video', name: 'video' }
	];

	campaign_id: string;
	parameters: {} = {};
	searchObj: {} = {};

	constructor(
		private campService: CampService,
		private cblocksService: CblocksService,
		private fb: FormBuilder,
		private router: Router,
		private activeRoute: ActivatedRoute,
		private toasterService: ToastrService,
		private geoService: GeographyService,
		private cs: CampaignService
	) {}

	getCurrentCampaign() {
		return this.cs.getCampaignId();
	}

	ngOnInit() {

		this.campaign_id = this.getCurrentCampaign();
		this.dropdownSettings = CustomizeObject.dropDownSettings();
		this.dropdownSettingsType = CustomizeObject.dropDownSettings(true);
		this.dropdownSettingsCompany = CustomizeObject.dropDownSettings(true);
		this.dropdownSettingsLanguage = CustomizeObject.dropDownSettings(true);
		const date = new Date();
		this.minDate = {year:date.getFullYear(),month: (date.getMonth() + 1), day: (date.getDate())};
		this.default_language = [];

		if(this.campaign_id) {
			this.parameters['campaign_id'] = this.campaign_id;
		}

		this.title = this.activeRoute.snapshot.data['title'];
		this.buildForm = false;
		this.languages = this.cblocksService.getLanguages();

		this.change_in_params = this.activeRoute.params
			.flatMap((params: any) => {
				if (params.id) {
					this.camp_id = params.id;
					return this.campService.getAll({ id: params.id });
				}
				return this.activeRoute.params;
			})

		this.change_in_params = this.activeRoute.params
			.flatMap((params: any) => {
				if (params.id) {
					this.module_id = params.id;
					return this.cblocksService.getAll({ id: params.id });
				}
				return this.activeRoute.params;
			})
			.subscribe(result => {
				if (result['data']) {
					this.editFlag = true;
					this.default_language = result['data'][0]['languages'];
					this.moduleForm = this.create_form(result['data'][0]);
					this.currentLogo = result['data'][0].logo;
					
					const languages = result['data'][0]['languages'];
					languages.forEach((element, i) => {
						if (element['pivot']['is_default']) {
							this.isDropdownDisabled = true;
							this.moduleForm.controls['is_default_language'].setValue([element]);
							this.moduleForm.controls['type'].disable();
						}
					});
				} else {
					this.moduleForm = this.create_form();
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
			this.campaignData = this.campService.getCampaignFromCompany(this.moduleForm.value.company_id);
			this.modulesData = this.campService.getModules();
		}
	}

	getGroup(campaign_id?: string) {
		if (typeof campaign_id === 'object') {
			campaign_id = campaign_id['id'];
		}
		this.groupData = this.campService.getGroupFromcampaign(campaign_id);
	}

	create_form(data?: FormGroup): FormGroup {
		const type: any = data ? [{ id: data['type'], name: data['type'] }] : '';
		let start_date = [];
		let end_date = [];

		this.dropdownSettingsSingleSelect = CustomizeObject.dropDownSettings(true,true);
		this.getGroup(this.campaign_id);

		if (data) {
			this.isDropdownDisabled = true;
			this.selected_type = type;
			start_date = data['start_date'].split('-');
			end_date = data['end_date'].split('-');
		}

		return this.fb.group({
			start_date: [
				data
					? {
							day: +start_date[2],
							month: +start_date[1],
							year: +start_date[0]
					  }
					: '',
				[Validators.required, ModuleDateValidator.dateVaidator]
			],
			end_date: [
				data
					? {
							day: +end_date[2],
							month: +end_date[1],
							year: +end_date[0]
					  }
					: '',
				[Validators.required, ModuleDateValidator.dateVaidator]
			],

			name: [data ? data['name'] : '', [Validators.required, Validators.maxLength(50), Validators.minLength(3), Validators.pattern('^([a-zA-Z0-9 .])+$')]],
			id: [data ? data['id'] : ''],
			logo: [],
			is_active: [data ? String(data['is_active']) : 'true'],
			group_id: [data ? [data['group']] : '', [Validators.required]],
			settings: this.fb.array([this.setting_arr(data)]),
			is_default_language: [data ? data['default'] : '', [Validators.required]],
			languages: [data ? data['languages'] : '', [Validators.required]],
			type: [data ? type : '', [Validators.required]]
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

	colorChanged(color) {
		this.settings.controls[0].get('color').patchValue(color);
	}

	get settings(): FormArray {
		return this.moduleForm.get('settings') as FormArray;
	}

	get formObj() {
		return this.moduleForm.controls;
	}

	
	setDefaultLanguages(language) {
		this.default_language = this.moduleForm.value.languages;
	}

	onSubmit() {
		this.submitted = true;

		if (this.moduleForm.invalid) {
			return;
		}

		if (this.moduleForm.value.languages.length) {
			this.moduleForm.value.languages = this.moduleForm.value.languages.map(reformat => reformat.id);
		}

		if (typeof this.moduleForm.value.group_id === 'object') {
			this.moduleForm.value.group_id = this.moduleForm.value.group_id[0].id;
		}

		// explicit setting value
		if (this.module_id) {
			this.moduleForm.value.type = this.selected_type[0]['id'];
		} else {
			this.moduleForm.value.type = this.moduleForm.value.type[0].id;
		}
		this.moduleForm.value.is_default_language = this.moduleForm.value.is_default_language[0].id;
		// this.moduleForm.value.company_id = this.moduleForm.value.company_id[0].id;
		this.formData = this.cblocksService.convertToFormData(this.moduleForm.value);

		if (this.logo) {
			this.formData.set('logo', this.logo, this.logo.name);
		} else {
			this.formData.delete('logo');
		}

		this.formData.set('campaign_id', this.campaign_id);
		!this.module_id ? this.save() : this.update();
	}

	private save() {
		this.cblocksService.save(this.formData).subscribe(
			(response: any) => {
				this.router.navigate(['/cblocks'], { queryParams : { campaign_id: this.campaign_id } }).then(() => {
					this.toasterService.success('Records Added Successfully!', 'Success!', { positionClass: 'toast-top-right' });
				});
			},
			(err: HttpErrorResponse) => {
				this.handleError(err, this.moduleForm);
			}
		);
	}

	changeCampaign(campaign) {
		this.cs.setCampaignId(campaign.id);
		this.campaign_id = this.cs.getCampaignId();
		this.parameters['campaign'] = this.campaign_id;
		this.sf.form.updateValueAndValidity();
	}
	
	upload(file) {
		const uploadData = new FormData();
		uploadData.set('upload_file', file, file.name);
		this.geoService.upload(uploadData).subscribe(
			(responseData: any) => this.closePopup(responseData),
			(err: HttpErrorResponse) => this.controlError(err)
		);
	}
	
	logoChange(files: FileList) {
		this.logo = files.length ? files.item(0) : null;
	}

	private update() {
		this.cblocksService.update(this.formData, this.module_id).subscribe(
			(response: any) => {
				this.router.navigate(['/cblocks'] , { queryParams : { campaign_id: this.campaign_id } }).then(() => {
					this.toasterService.success('Records Updated Successfully!', 'Success!', { positionClass: 'toast-top-right' });
				});
			},
			(err: HttpErrorResponse) => {
				this.handleError(err, this.moduleForm);
			}
		);
	}

	controlError(err) {
		if (err.status === 400) {
			for (const field of Object.keys(err.error.error)) {
				const errorData = err.error.error[field];
				this.errors.push(errorData);
			}
			alert(err.error.error.upload_file);
		}
	}

	closePopup(response) {
		this.toasterService.success(response.data.count + ' Records Uploaded Successfully!', 'Success!', { positionClass: 'toast-top-right' });
		// alert(response.data.count + ' Records Uploaded Successfully!');
		this.sf.form.updateValueAndValidity();
	}


	handleError(err: HttpErrorResponse, form: FormGroup) {
		if (err.status === 400) {
			this.error_messages = err.error.error;
		} else {
			alert('Problems while saving data');
		}
	}
}
