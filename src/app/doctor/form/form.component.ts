import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DimensionService } from '../../services/dimension.service';
import { Validators, FormBuilder, FormGroup, FormControl, NgForm } from '@angular/forms';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FormbuilderService } from '../../services/formbuilder.service';

import { DoctorService } from '../../services/doctor.service';
import { CampaignService } from 'src/app/services/campaign.service';
import { CustomizeObject } from 'src/app/shared/classes/cutomizeObject';
import { UsersService } from 'src/app/services/users.service';
import { combineLatest } from 'rxjs';
import { concatMap } from 'rxjs/operators';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
	title: string;
	change_in_params: any;
	form_id: string;
	doctor_id: string;
	buildForm: boolean;
	doctorForm: FormGroup;
	errors: any = [];
	submitted = false;
	campaign_id: string;
	fieldsData: [];
	formHeaders: any;
	formData: any = [];
	@ViewChild('searchForm') sf: NgForm;
	dropdownSettings = {};
	users: any = [];
	files: any = [];
	filesSelected: any = [];
	error_messages: any = [];
	editFlag = false;

	constructor(
		private activeRoute: ActivatedRoute,
		private toasterService: ToastrService,
		private router: Router,
		private fb: FormBuilder,
		private doctorService: DoctorService,
		private userService: UsersService,
		private campaignService: CampaignService,
		private cs: CampaignService
	) { }

	getCurrentCampaign() {
		return this.cs.getCampaignId();
	}

	ngOnInit() {
		this.buildForm = false;
		this.title = this.activeRoute.snapshot.data['title'];
		this.campaign_id = this.getCurrentCampaign();
		this.dropdownSettings = CustomizeObject.dropDownSettings(true);

		combineLatest(
			this.userService.getAll({campaign_id: this.campaign_id}),
			this.campaignService.show(this.campaign_id),
			this.activeRoute.params
		).subscribe(([users,campaignData, params]) => {
			this.users = users['data'];
			const resultData = campaignData['data'];
			if (resultData[0] !== 'undefined') {
				this.formData = resultData[0]['form'];
				this.fieldsData = this.formData.form;
				if (this.activeRoute.snapshot.data['urlKey'] === 'add') {
					this.doctorForm = this.create_form();
					this.buildForm = true;
				}

				if (this.activeRoute.snapshot.data['urlKey'] === 'edit') {
					this.editFlag= true;
					this.doctorService.getAll({ id: params.id, campaign_id: this.campaign_id }).subscribe(result => {
						this.doctorForm = this.create_form(result['data'][0]);
						this.doctor_id = params.id;
						this.buildForm = true;
					});
				}
			}
		});
	}

	create_form(data?: any) {
		this.doctorForm = this.fb.group({
			doctor_id: [data ? data.id : ''],
			user_id: [data ? [data.user] : '', [Validators.required]]
		});

		if(data) {
			this.doctor_id = data.id;
		}

		const that = this;
		this.fieldsData.forEach(value => {
			let validations = [];

			if(value['type'] == "number") {
				validations.push(Validators.pattern('^([0-9 ])+$'));
			}

			if(value['type'] !== 'file') {

				/* Do All Validations */
				if(value['required']) {
					validations.push(Validators.required);
				}
				if(value['pattern']) {
					validations.push(Validators.pattern(value['pattern']));
				}
				if(value['exactlength']) {
					validations.push(Validators.minLength(value['exactlength']));
					validations.push(Validators.maxLength(value['exactlength']));
				}
				if(value['minlength']) {
					validations.push(Validators.minLength(value['minlength']));
				}
				if(value['maxlength']) {
					validations.push(Validators.maxLength(value['maxlength']));
				}

				that.doctorForm.addControl(value['name'], new FormControl(data ? data[value['name']] : "", validations));
			} else {

				if(data) {
					that.doctorForm.addControl(value['name'], new FormControl(""));
					that.filesSelected[value['name']] = data[value['name']];

				} else {
					that.doctorForm.addControl(value['name'], new FormControl("", Validators.required));
				}
			}
		});
		return this.doctorForm;
	}

	get formObj() {
		return this.doctorForm.controls;
	}

	onSubmit() {
		this.submitted = true;
		if (this.doctorForm.invalid) {
			return;
		}

		if (typeof this.doctorForm.value.user_id === 'object') {
			this.doctorForm.value.user_id = this.doctorForm.value.user_id[0].id;
		}

		const doctorData = this.doctorService.convertToFormData(this.doctorForm.value);
		doctorData.set('campaign_id', this.campaign_id);
		doctorData.set('form', String(this.formData));

		this.fieldsData.forEach(element => {

			if(! this.doctorForm.value[element['name']] ) {
				doctorData.delete(element['name']);
			}

			if(element['type'] == 'file') {
				if( this.files[element['name']] ) {
					doctorData.set(element['name'], this.files[element['name']]);
				} else {
					delete doctorData[element['name']];
				}
			}
		});

		if (!this.doctor_id) {
			this.doctorService
				.saveDoctor(doctorData)
				.subscribe(
					(responseData: any) => this.addUpdate('/doctor', 'Records Added Successfully!'),
					(err: HttpErrorResponse) => this.controlError(err)
				);
		} else {
			this.doctorService
				.updateDoctor(doctorData, this.doctor_id)
				.subscribe(
					(responseData: any) => this.addUpdate('/doctor', 'Records Updated Successfully!'),
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

			const errors = err.error.error;
			const that = this;

			Object.keys(errors).map(function(error, key){
				that.error_messages[error] = errors[error];
			});

		} else {
			alert('Problems while saving data');
		}
	}

	fileChange(files: FileList, name) {
		this.files[name] = files.length ? files.item(0) : null;
	}

	changeCampaign(campaign) {
		this.cs.setCampaignId(campaign.id);
	}

	elementTouched(element) {
		element.markAsTouched();
	}
}
