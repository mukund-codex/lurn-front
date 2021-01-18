import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { CampaignService } from '../../services/campaign.service';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { CustomizeObject } from '../../shared/classes/cutomizeObject';
import { combineLatest } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
	title: string;
	companyData: any;
	prospectData: any;
	formData = new FormData();
	campaignData: any;
	errors: any = [];
	editFlag = false;
	campaignForm: FormGroup;
	submitted = false;
	isDisabled = false;
	geographyData: any;
	buildForm = false;
	master_geography: any;
	data_geography: [];
	dropdownSettingsCompany: {};
	dropdownSettingsMulti: {};
	campaign_code: string;
	allData: any;
	selectedCampaign: string;
	error_messages: any = [];
	campaign_id: string;
	isDropdownDisabled: Boolean = false;

	constructor(
		private campaignService: CampaignService,
		private activeRoute: ActivatedRoute,
		private router: Router,
		public toasterService: ToastrService,
		private fb: FormBuilder
	) {}

	ngOnInit() {
		this.selectedCampaign = this.getCurrentCampaign();
		this.title = this.activeRoute.snapshot.data['title'];

		combineLatest(
			this.campaignService.getCompanies(),
			this.campaignService.getCampaignCode(),
			this.activeRoute.queryParams
		).subscribe(([companyData,campaignCodeData, param]) => {
			
			this.buildForm = false;
			this.companyData = companyData;
			
			if(!param.campaign_id) {
				this.campaign_code = campaignCodeData['data'].code;
			}

			if (param.campaign_id) {
				this.campaign_id = param.campaign_id;
				this.campaignData = this.campaignService.getAll({ id: param.campaign_id }).subscribe(result => {
					if (result['data'].length) {
						this.campaignForm = this.create_form(result['data'][0]);
						this.campaign_code = result['data'][0].cid;
						this.isDisabled = true;
						this.buildForm = true;
						this.editFlag = true;
					}
				});
			
			} else {
				this.campaignForm = this.create_form();
				this.buildForm = true;
			}
		});

		this.dropdownSettingsCompany = CustomizeObject.dropDownSettings(true);
		this.dropdownSettingsMulti = CustomizeObject.dropDownSettings(false, false, 'id', 'name');
	}

	getProspects(company) {
		const that = this;
		that.prospectData = [];
		this.campaignService.getProspects(company.id).subscribe(prospects => {
			const prospectData = prospects['data'];
			prospectData.forEach((element, i) => {
				prospectData[i]['name'] = element['first_name'] + " " + element['last_name'];
			});
			that.prospectData = prospectData;
		});
		if(this.campaignForm) {
			this.campaignForm.controls.prospect.patchValue([]);
		}
		
	}

	create_form(data?: any): FormGroup {

		if(data) {
			this.isDropdownDisabled = true;
			this.campaign_code = data.cid;
			this.getProspects(data.company);

			const users = data.users;
			users.forEach((element, i) => {
				data.users[i]['name'] = element['first_name'] + " " + element['last_name'];
			});
		}

		this.geographyData = this.campaignService.getGeographyDetails().subscribe(resultData => {
			this.master_geography = resultData['data'];
			let flag;

			this.master_geography.map((o, i) => {

				let term;
				let label;

				if(data) {
					this.data_geography = data.geo_master;
					term = this.data_geography.find( ({ id }) => id === o["id"] );
				}

				flag =  typeof(term) === "object"? true : false;
				label =  typeof(term) === "object"? term.label : "";
				const control = new FormControl({value : flag, disabled: this.isDisabled});
				let group;

				if(typeof(term) === "object") {

					group = this.fb.group({
						geo_master: [{value: flag, disabled: this.isDisabled}],
						label: [{value: label, disabled: this.isDisabled}]
					});

				} else {
					group = this.fb.group({'geo_master': control});
				}

				(this.campaignForm.controls.geography as FormArray).push(group);
			});
		});

		return this.fb.group({
			campaign_name: [data ? data.name : '', [Validators.required, Validators.pattern('^([a-zA-Z0-9 .])+$'), Validators.minLength(3), Validators.maxLength(50)]],
			company_id: [data ? [data.company] : '', [Validators.required]],
			prospect: [data ? data.users : '', data ? [] : [Validators.required]],
			campaign_id: [data ? data.id : ''],
			geography: this.fb.array([]),
			//settings: this.fb.array([this.setting_arr(data)]),
			is_active: [data ? data.is_active : true, [Validators.required]]
		});
	}

	/* Checkbox on Change add label */
	onChange(event, i) {
		if(typeof event === 'boolean') {
			this.campaignForm.controls.geography['controls'][i].addControl('label', new FormControl(''));
		} else {
			if(event.target.checked) {
				this.campaignForm.controls.geography['controls'][i].addControl('label', new FormControl(''));
			}
		}
	}

	setting_arr(data?: any): FormGroup {
			return this.fb.group({
				// color: [data && data.settings ? data.settings.color : ''],
				limit_per_user: [data && data.settings ? data.settings.limit_per_user : '', [Validators.required, Validators.pattern('^[0-9]*$')]],
				campaign_for: [data && data.settings ? data.settings.campaign_for : '', [Validators.required, Validators.minLength(3), Validators.maxLength(50) , Validators.pattern('^[A-Za-z .]*$')]],
				is_doctor_editable: [data && data.settings ? (data.settings.is_doctor_editable==="true") : true],
				is_doctor_add: [data && data.settings ? (data.settings.is_doctor_add==="true") : true]
			});
	}

	get f() {
		return this.campaignForm.controls;
	}

	get settings(): FormArray {
		return this.campaignForm.get('settings') as FormArray;
	}

	onSubmit() {
		
		this.submitted = true;
		if (this.campaignForm.invalid) {
			return;
		}
		const campaignData = this.campaignForm.value;

		if (campaignData.prospect) {
			campaignData.prospect = campaignData.prospect.map(reformat => reformat.id);
		}

		this.formData = this.campaignService.convertToFormData(campaignData);
		this.formData.set('name', campaignData.campaign_name);
		this.formData.set('cid', this.campaign_code);
		this.formData.set('slug', campaignData.slug);
		//this.formData.set('company_id', campaignData.company_id[0].id);
		this.formData.set('is_active', campaignData.is_active);
		//this.formData.set('settings[campaign_for]',campaignData.settings[0].campaign_for);
		const campaign_id = campaignData.campaign_id;
		
		this.master_geography.map((o, i) => {
			if(campaignData.geography) {
				if (campaignData.geography[i]['geo_master']) {
					this.formData.set('geo_master[' + i + '][id]', this.master_geography[i]['id']);
					if(campaignData.geography[i].label) {
						this.formData.set('geo_master[' + i + '][label]', campaignData.geography[i].label);
					}
				}
			}
		});
		
		campaignData.prospect.map((o, i) => {
			if (campaignData.prospect[i]) {
				this.formData.set('users[' + i + ']', campaignData.prospect[i]);
			}
		});

		if (!campaign_id) {
			this.campaignService.save(this.formData).subscribe(
				(response: any) => this.addUpdate('/campaign', 'Records Added Successfully!'),
				(err: HttpErrorResponse) => this.controlError(err)
			);
		} else {
			this.campaignService.update(this.formData, campaign_id).subscribe(
				(response: any) => {
					this.router.navigate(['/campaign-dashboard'], { queryParams : { campaign_id: campaign_id } } ).then(() => {
						this.toasterService.success('Records Updated Successfully!', 'Success!', { positionClass: 'toast-top-right' });
					});
				},
				(err: HttpErrorResponse) => this.controlError(err)
			);			
		}
	}

	getCurrentCampaign() {
		return this.campaignService.getCampaignId();
	}

	addUpdate(navigateTo, message) {
		this.router.navigate([navigateTo]).then(() => {
			this.toasterService.success(message, 'Success!', { positionClass: 'toast-top-right' });
		});
	}

	generateCode() {
		const random = Math.floor(10000000 + Math.random() * 90000000);
		this.campaignForm.get('code').patchValue(random);
	}

	controlError(err) {
		if (err.status === 400) {
			this.error_messages = err.error.error;
		} else {
			alert('Problems while saving data');
		}
	}
}
