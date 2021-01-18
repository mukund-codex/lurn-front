import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../../services/company.service';

import { concatMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { of } from 'rxjs';
import { AdminService } from '../../services/admin.service';
import { CustomizeObject } from '../../shared/classes/cutomizeObject';
import { ProspectService } from '../../services/prospect.service';
import {DateValidator} from '../../shared/date.validator';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {
	title: string;
	urlKey: string;
	prospect_id = '';
	prospectForm: FormGroup;
	buildForm: boolean;

	formData = new FormData();
	submitted = false;

	companyData: any;
	roleData: any;

	dropdownSettingsMulti: {};
	dropdownSettingsSingle: {};
	dropdownSettingsRole: {};
	minDate: {};
	maxDate: {};
	error_messages: any = [];
	isDropdownDisabled = false;

	constructor(
		private companyService: CompanyService,
		private prospectService: ProspectService,
		private adminService: AdminService,
		private activeRoute: ActivatedRoute,
		private router: Router,
		private fb: FormBuilder,
		public toasterService: ToastrService
	) { }

	ngOnInit() {
		this.buildForm = false;
		this.title = this.activeRoute.snapshot.data['title'];
		this.urlKey = this.activeRoute.snapshot.data['urlKey'];
		this.companyData = this.companyService.allRecords();
		this.roleData = this.adminService.getRoles();
		const date = new Date();
		date.setDate(date.getDate() - 1);
		this.minDate = { year: date.getFullYear() - 100, month: 1, day: 1 };
		this.maxDate={year:date.getFullYear(),month: (date.getMonth() + 1), day: (date.getDate())};

		this.activeRoute.params
			.pipe(
				concatMap((params: Params): any => {
					if (params.id) {
						return this.prospectService.getAll({
							id: params.id
						});
					}
					return of({ data: [] });
				})
			)
			.subscribe((result: any) => {
				if (result.data[0] && this.activeRoute.snapshot.data['urlKey'] === 'edit') {
					this.prospect_id = result.data[0].id;
					this.prospectForm = this.create_form(result.data[0]);
					this.isDropdownDisabled = true;
				}

				if (this.activeRoute.snapshot.data['urlKey'] === 'add') {
					this.prospectForm = this.create_form();
				}
			});
	}

	create_form(data?: any): FormGroup {
		// https://stackblitz.com/edit/angular-date-validator?embed=1&file=src/app/shared/date.validator.ts
		this.dropdownSettingsSingle = CustomizeObject.dropDownSettings(true, true);
		this.dropdownSettingsMulti = CustomizeObject.dropDownSettings();
		let dob = [];

		if (data && data.dob) {
			dob = data.dob.split('-');
		}

		
		
		const form: FormGroup = this.fb.group({

			first_name: [data ? data.first_name : '',
			[Validators.required, Validators.pattern('^([a-zA-Z ])+$'), Validators.minLength(3), Validators.maxLength(20)]],
			last_name: [data ? data.last_name : '',
			[Validators.required, Validators.pattern('^([a-zA-Z ])+$'), Validators.minLength(3), Validators.maxLength(20)]],
			mobile: [data && data.mobile ? data.mobile : '',
			[Validators.pattern('^[6-9]{1}([0-9]){9}$')]],
			role: [data ? data.roles : '',
			[Validators.required]],
			username: [
				data ? data.username : '',
				[Validators.required, Validators.pattern('^([a-zA-Z0-9])+$'),
				Validators.minLength(6), Validators.maxLength(50)]
			],
			company_id: [data ? [data.company_name] : '', [Validators.required]],
			email: [
				data ? data.email : '',
				[Validators.maxLength(100)]
			],
			dob: [data && data.dob ?
				{
					day: +dob[2],
					month: +dob[1],
					year: +dob[0]
				}
				: null,
				[DateValidator.dateVaidator]
			]
		});

		if (this.urlKey === 'add') {
			form.addControl('password', new FormControl('',
				[Validators.required, Validators.maxLength(25), Validators.minLength(4)]));
		}

		this.buildForm = true;
		return form;
	}

	onSubmit() {
		this.submitted = true;
		if (this.prospectForm.invalid) {
			return;
		}

		if(!this.prospectForm.value.dob) {
			delete this.prospectForm.value.dob;
		}

		this.formData = this.prospectService.convertToFormData(this.prospectForm.value);
		//this.formData.set('role', this.prospectForm.value.role[0].id);
		//this.formData.set('company_id', this.prospectForm.value.company_id[0].id);

		if (this.formData.get('mobile') == "" || this.formData.get('mobile') == "null") {
			this.formData.delete('mobile');
		}

		!this.prospect_id ? this.save() : this.update();
	}

	private save() {
		this.adminService.save(this.formData).subscribe(
			(response: any) => {
				this.router.navigate(['/prospect']).then(() => {
					this.toasterService.success('Records Added Successfully!', 'Success!', { positionClass: 'toast-top-right' });
				});
			},
			(err: HttpErrorResponse) => {
				this.handleError(err, this.prospectForm);
			}
		);
	}

	private update() {
		this.adminService.update(this.formData, this.prospect_id).subscribe(
			(response: any) => {
				this.router.navigate(['/prospect']).then(() => {
					this.toasterService.success('Records Updated Successfully!', 'Success!', { positionClass: 'toast-top-right' });
				});
			},
			(err: HttpErrorResponse) => {
				this.handleError(err, this.prospectForm);
			}
		);
	}

	handleError(err: HttpErrorResponse, form: FormGroup) {
		if (err.status === 400) {
			this.error_messages = err.error.error;
		} else {
			alert('Problems while saving data');
		}
	}

	generateUsername() {
		const random = Math.floor(10000000 + Math.random() * 90000000);
		this.prospectForm.get('username').patchValue(random);
	}
}
