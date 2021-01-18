import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../../services/company.service';

import { concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import 'rxjs/add/observable/of';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

	title: string;
	company_id = '';
	companyForm: FormGroup;
	buildForm: boolean;

	color1 = '#ffffff';
	currentLogo: string;
	logo: File = null;

	formData = new FormData();
	submitted = false;
	error_messages: any = [];

	constructor(
		private companyService: CompanyService,
		private activeRoute: ActivatedRoute,
		private router: Router,
		private fb: FormBuilder,
		public toasterService: ToastrService
	) {}

	ngOnInit() {
		this.buildForm = false;
		this.title = this.activeRoute.snapshot.data['title'];

		this.activeRoute.params
			.pipe(
				concatMap((params: Params): any => {
					if (params.id) {
						return this.companyService.getAll({
							id: params.id
						});
					}
					return of({ data: [] });
				})
			)
			.subscribe((result: any) => {
				if (result.data[0] && this.activeRoute.snapshot.data['urlKey'] === 'edit') {

					console.table(result.data[0]);

					this.company_id = result.data[0].id;
					this.currentLogo = result.data[0].logo;
					this.companyForm = this.create_form(result.data[0]);
				}

				if (this.activeRoute.snapshot.data['urlKey'] === 'add') {
					this.companyForm = this.create_form();
				}
			});
	}

	create_form(data?: Company): FormGroup {
		const form: FormGroup = this.fb.group({
			name: [data ? data.name : '', [Validators.required, Validators.pattern('^([a-zA-Z0-9 _-])+$'), Validators.minLength(3), Validators.maxLength(50)]],
			company_logo: [],
			is_active: [data ? data.is_active : true, [Validators.required]]
		});

		this.buildForm = true;
		return form;
	}

	setting_arr(data?: Company): FormGroup {
		return this.fb.group({
			sender_id: [data && data.settings ? data.settings.sender_id : '', [Validators.pattern('^[a-zA-Z]{6}$')]],
			pagination: [data && data.settings ? data.settings.pagination : '', [Validators.pattern('^([1-9]){1}([0-9]){0,2}$')]],
			color: [data && data.settings ? data.settings.color : '']
		});
	}

	onSubmit() {
		
		this.submitted = true;
		if (this.companyForm.invalid) {
			return;
		}

		this.formData = this.companyService.convertToFormData(this.companyForm.value);
		if (this.logo) {
			this.formData.set('logo', this.logo, this.logo.name);
		}

		!this.company_id ? this.save() : this.update();
	}

	private save() {
		this.companyService.save(this.formData).subscribe(
			(response: any) => {
				this.router.navigate(['/company']).then(() => {
					this.toasterService.success('Records Added Successfully!', 'Success!', { positionClass: 'toast-top-right' });
				});
			},
			(err: HttpErrorResponse) => {
				this.handleError(err, this.companyForm);
			}
		);
	}

	private update() {
		
		this.companyService.update(this.formData, this.company_id).subscribe(
			(response: any) => {
				this.router.navigate(['/company']).then(() => {
					this.toasterService.success('Records Updated Successfully!', 'Success!', { positionClass: 'toast-top-right' });
				});
			},
			(err: HttpErrorResponse) => {
				this.handleError(err, this.companyForm);
			}
		);
	}

	handleError(err: HttpErrorResponse, form: FormGroup) {
		if (err.status === 400) {
			form.setErrors(err.error);
			this.error_messages = err.error.error;
		} else {
			alert('Problems while saving data');
		}
	}

	generateUsername() {
		const random = Math.floor(10000000 + Math.random() * 90000000);
		this.company.get('username').patchValue(random);
	}

	logoChange(files: FileList) {
		this.logo = files.length ? files.item(0) : null;
	}

	colorChanged(color) {
		this.settings.controls[0].get('color').patchValue(color);
	}

	get settings(): FormArray {
		return this.companyForm.get('settings') as FormArray;
	}

	get company(): FormGroup {
		return this.companyForm;
	}
}
