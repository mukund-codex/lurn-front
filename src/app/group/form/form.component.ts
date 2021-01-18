import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormBuilder, ValidatorFn } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from '../../../app/services/message.service';
import { GroupService } from '../../../app/services/group.service';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { CustomizeObject } from '../../../app/shared/classes/cutomizeObject';
import { CampaignService } from 'src/app/services/campaign.service';
import { ToastrService } from 'ngx-toastr';
import { RolesService } from 'src/app/services/roles.service';
import { DesignationService } from 'src/app/services/designation.service';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
	title: string;
	companyData: any;
	formData = new FormData();
	groupData: any;
	companies: any;
	roles: any = [];
	designations: any = [];
	group: any = [];
	campaignData: any;
	errors: any = [];
	editFlag = false;
	groupForm: FormGroup;
	submitted = false;
	dropdownSettings: {};
	geographyData: any;
	usersData: any;
	buildForm: Boolean;
	group_id: string;
	master_geography: {}[];
	dropdownSettingsCompany: {};
	campaign_id: string;
	error_messages: any = [];

	constructor(
		private groupService: GroupService,
		private rolesService: RolesService,
		private designationService: DesignationService,
		private activeRoute: ActivatedRoute,
		private router: Router,
		private msgservice: MessageService,
		private fb: FormBuilder,
		private cs: CampaignService,
		private toasterService: ToastrService
	) {}

	ngOnInit() {
		this.campaign_id = this.cs.getCampaignId();
		this.title = this.activeRoute.snapshot.data['title'];
		this.dropdownSettingsCompany = CustomizeObject.dropDownSettings(true);

		this.activeRoute.params.subscribe(param => {
			this.buildForm = false;
			if (param.id) {
				this.group_id = param.id;
				this.groupData = this.groupService.getAll({ id: param.id }).subscribe(result => {
					if (result['data'].length) {
						this.getcampaign(result['data'][0]['campaign']['company']);
						this.groupForm = this.create_form(result['data'][0]);
						this.getCampUsers(result['data'][0]['campaign']['id'], result['data'][0]['user']);
						this.buildForm = true;
					}
				});
			} else {
				this.getCampUsers(this.campaign_id);
				this.groupForm = this.create_form();
				this.buildForm = true;
			}
		});
		this.dropdownSettings = CustomizeObject.dropDownSettings(true);
		this.companies = this.groupService.getCompanies();
	}

	create_form(data?: any): FormGroup {
		return this.fb.group({
			group_name: [data ? data.name : '', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('^([a-zA-Z0-9 _-])+$')]],
			user_id: this.fb.array([]),
			users_checked: this.fb.array([]),
			is_active: [data ? String(data.is_active) : 'true', [Validators.required]],
			group_id: [data ? data['id'] : '']
		});
	}

	get formObj() {
		return this.groupForm.controls;
	}

	getcampaign(company_id?: string) {
		if (typeof company_id === 'object') {
			company_id = company_id['id'];
		}
		if (company_id) {
			this.campaignData = this.groupService.getCampaignFromCompany(company_id);
		}
	}

	getCampUsers(campaign_id?: string, users?: [{}]) {
		const that = this;

		if (campaign_id) {
			this.groupService.getUsersFromCampaign(campaign_id).subscribe(result => {
				const roles = [];
				const designations = [];
				const temp = [];
				let group: any = {};
				const selected_users = [];

				if (users) {
					users.forEach(function(value) {
						selected_users.push(value['id']);
					});
				}

				result['data'].forEach(function(item) {
					let role_name = item.role_name;
					let designation_name = item.designation;
					const control = new FormControl(false);
					let flag = false;
					const usersFormArray = <FormArray>that.groupForm.controls.users_checked;

					if (selected_users) {
						if (selected_users.indexOf(item.user_id) > -1) {
							usersFormArray.push(new FormControl(item.user_id));
							flag = true;
						}
					}

					if(typeof designations[designation_name] === 'undefined') {
						group[designation_name] = new FormGroup({ [item.user_id]: new FormControl(flag) });
						group[designation_name].addControl([designation_name], new FormControl(false));
						designations[designation_name] = [];
						temp.push(designation_name);
					} else {
						group[designation_name].addControl([item.user_id], new FormControl(flag));
					}

					const usersControl = <FormArray>that.groupForm.controls.user_id;
					usersControl.push(group[designation_name]);
					designations[designation_name].push(item);
				});

				this.usersData = designations;
				this.designations = temp;
				this.group = group;
			});
		}
	}

	onChange(user_id: string, isChecked: boolean, role: string) {
		const usersFormArray = <FormArray>this.groupForm.controls.users_checked;

		if (isChecked) {
			usersFormArray.push(new FormControl(user_id));
		} else {
			let index = usersFormArray.controls.findIndex(x => x.value === user_id);
			usersFormArray.removeAt(index);
			// const selected = this.group[role];
			// selected.controls[role].setValue(false);
		}
	}

	checkAll(designation: string, is_checked: boolean) {

		const usersFormArray = <FormArray>this.groupForm.controls.users_checked;
		const controls = this.group[designation].controls;
		const that = this;

		Object.keys(controls).forEach(function(key) {
			controls[key].setValue(is_checked);
			
			const channelArray: Array<string> = that.designations;

			if (channelArray.indexOf(key) === -1 && usersFormArray.controls.findIndex(x => x.value === key) === -1) {
				if (is_checked) {
					usersFormArray.push(new FormControl(key));
				} else {
					let index = usersFormArray.controls.findIndex(x => x.value === key);
					usersFormArray.removeAt(index);
				}
			}
		});
	}

	onSubmit() {
		this.submitted = true;
		if (this.groupForm.invalid) {
			return;
		}

		const groupData = this.groupForm.value;
		this.formData.set('name', groupData.group_name);
		this.formData.set('campaign_id', this.campaign_id);
		const temp = groupData.users_checked;
		const that = this;

		const users = [];
		Object.keys(temp).map(function(key) {
			if(temp[key]) {
				that.formData.set('users[' + key + ']', temp[key]);
			}
		});
		
		this.formData.set('is_active', groupData.is_active);
		const group_id = groupData.group_id;

		if (!group_id) {
			this.groupService.save(this.formData).subscribe(
				(response: any) => this.addUpdate('/group', 'Records Added Successfully'),
				(err: HttpErrorResponse) => this.controlError(err)
			);
		} else {
			this.groupService.update(this.formData, group_id).subscribe(
				(response: any) => this.addUpdate('/group', 'Records Updated Successfully'),
				(err: HttpErrorResponse) => this.controlError(err)
			);
		}
	}

	addUpdate(navigateTo, message) {
		this.router.navigate([navigateTo], { queryParams : { campaign_id: this.campaign_id } }).then(() => {
			this.toasterService.success(message, 'Success!', { positionClass: 'toast-top-right' });
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
