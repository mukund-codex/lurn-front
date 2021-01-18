import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';
import { AdminRolesService } from '../../services/admin-roles.service';
import { AdminService } from '../../services/admin.service';

import { concatMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';
import { combineLatest } from 'rxjs';
import 'rxjs/add/observable/of';
import { CustomizeObject } from '../../shared/classes/cutomizeObject';
import { DateValidator } from 'src/app/shared/date.validator';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, AfterViewInit {
	title: string;
	urlKey: string;
	disabled: boolean;

	admin_id = '';

	adminForm: FormGroup;
	buildForm: boolean;

	formData = new FormData();
	submitted = false;
	roles: any = [];
	campaignData: any;
	companyData: any;
	dropdownSettings = {};
	minDate = {};
	maxDate = {};
	error_messages: any = [];

	constructor(
		private adminRolesService: AdminRolesService,
		private aService: AdminService,
		private activeRoute: ActivatedRoute,
		private router: Router,
		private fb: FormBuilder,
		public toasterService: ToastrService
	) {}

	ngOnInit() {
		
		this.buildForm = false;

		const page = this.activeRoute.snapshot.data;
		this.title = page['title'];
		this.urlKey = page['urlKey'];
		this.disabled = page['urlKey'] === 'edit' ? false : false;
		this.dropdownSettings = CustomizeObject.dropDownSettings(true, true);
		const date = new Date();
		date.setDate(date.getDate() - 1);
		this.minDate = { year: date.getFullYear() - 100, month: 1, day: 1 };
		this.maxDate={year:date.getFullYear(),month: (date.getMonth() + 1), day: (date.getDate()) };
	}

	ngAfterViewInit() {
		combineLatest([
			this.activeRoute.params.pipe(
				concatMap((params: Params): any => {
					if (params.id) {
						
						return this.aService.show(params.id);
					}
					return of({ data: [] });
				})
			),
			this.adminRolesService.allRecords({type : 'admin'})
		]).subscribe((result: any) => {
			if (result[0].data[0] && this.activeRoute.snapshot.data['urlKey'] === 'edit') {
				this.admin_id = result[0].data[0].id;

				
				this.adminForm = this.create_form(result[0].data[0]);
			}

			if (this.activeRoute.snapshot.data['urlKey'] === 'add') {
				this.adminForm = this.create_form();
			}

			this.roles = result[1].data;
		});
	}

	getCampaign(company_id?: string) {
		if (typeof company_id === 'object') {
			company_id = company_id['id'];
		}

		if (company_id) {
			this.campaignData = this.adminRolesService.getCampaignFromCompany(company_id);
		} else {
			this.campaignData = this.adminRolesService.getCampaignFromCompany(this.adminForm.value.company_id);
		}
	}

	create_form(data?: any): FormGroup {

		let dob = [];
		if (data) {
			if(data.dob) {
				dob = data.dob.split('-');
			}
		}

		const form: FormGroup = this.fb.group({
			first_name: [data ? data.first_name : null, [Validators.required, Validators.pattern('^([a-zA-Z ])+$'), Validators.minLength(3), Validators.maxLength(20)]],
			last_name: [data ? data.last_name : null, [Validators.required, Validators.pattern('^([a-zA-Z ])+$'), Validators.minLength(3), Validators.maxLength(20)]],
			email: [data ? data.email : null, [Validators.maxLength(100), Validators.email]],
			dob: [
				data
					? {
							day: +dob[2],
							month: +dob[1],
							year: +dob[0]
					  }
					: null,
				[DateValidator.dateVaidator]
			],
			username: [
				data ? data.username : '',
				[Validators.required, Validators.pattern('^([a-zA-Z0-9])+$'),
				Validators.minLength(6), Validators.maxLength(50)]
			],
			mobile: [data ? data.mobile : null, [Validators.pattern('^[6-9]{1}([0-9]){9}$')]],
			role: [data ? [data.roles[0]] : [], [Validators.required]]
		});

		if (this.urlKey === 'add') {
			form.addControl('password', new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(4)]));
		}

		this.buildForm = true;

		return form;
	}

	generateUsername() {
		const random = Math.floor(10000000 + Math.random() * 90000000);
		this.adminForm.get('username').patchValue(random);
	}

	onSubmit() {
		
		this.submitted = true;
		if (this.adminForm.invalid) {
			return;
		}

		if (typeof this.adminForm.value.role === 'object') {
			this.adminForm.value.role = this.adminForm.value.role;
		}

		if(!this.adminForm.value.dob) {
			delete this.adminForm.value.dob;
		}
		if(!this.adminForm.value.email) {
			delete this.adminForm.value.email;
		}

		if(!this.adminForm.value.mobile) {
			delete this.adminForm.value.mobile;
		}

		const formData = this.adminRolesService.convertToFormData(this.adminForm.value);
		const formObj = this.adminForm.value;

		if (this.urlKey === 'add') {
			formData.set('password', formObj.password);
		}
		// this.formData = this.aService.convertToFormData(this.adminForm.value);

		this.urlKey === 'add' ? this.save(formData) : this.update(formData);
	}

	private save(data) {
		
		this.aService.save(data).subscribe(
			(response: any) => {
				this.router.navigate(['/admin/users']).then(() => {
					this.toasterService.success('Records Added Successfully!', 'Success!', { positionClass: 'toast-top-right' });
				});
			},
			(err: HttpErrorResponse) => {
				this.handleError(err, this.adminForm);
			}
		);
	}

	private update(data) {
		
		this.aService.update(data, this.admin_id).subscribe(
			(response: any) => {
				this.router.navigate(['/admin/users']).then(() => {
					this.toasterService.success('Records Updated Successfully!', 'Success!', { positionClass: 'toast-top-right' });
				});
			},
			(err: HttpErrorResponse) => {
				this.handleError(err, this.adminForm);
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

	get adminUser(): FormGroup {
		return this.adminForm;
	}

	elementTouched(element) {
		element.markAsTouched();
	}
}
