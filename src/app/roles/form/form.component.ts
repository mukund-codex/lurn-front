import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';
import { RolesService } from '../../services/roles.service';
import { PermissionService } from '../../services/permission.service';

import { concatMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';
import { combineLatest } from 'rxjs';
import 'rxjs/add/observable/of';
import { CustomizeObject } from '../../shared/classes/cutomizeObject';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
	title: string;
	roles_id = '';

	rolesForm: FormGroup;
	buildForm: boolean;

	formData = new FormData();
	submitted = false;
	permissions: Permission[];
	dropdownSettings = {};
	error_messages: any = [];

	constructor(
		private rolesService: RolesService,
		private pService: PermissionService,
		private activeRoute: ActivatedRoute,
		private router: Router,
		private fb: FormBuilder,
		public toasterService: ToastrService
	) {}

	ngOnInit() {
		this.buildForm = false;
		this.title = this.activeRoute.snapshot.data['title'];
		this.dropdownSettings = CustomizeObject.dropDownSettings();

		combineLatest([
			this.activeRoute.params.pipe(
				concatMap((params: Params): any => {
					if (params.id) {
						return this.rolesService.getAll({
							id: params.id
						});
					}
					return of({ data: [] });
				})
			),
			this.pService.getAll()
		]).subscribe((result: any) => {
			if (result[0].data[0] && this.activeRoute.snapshot.data['urlKey'] === 'edit') {
				this.roles_id = result[0].data[0].id;
				this.rolesForm = this.create_form(result[0].data[0]);
			}

			if (this.activeRoute.snapshot.data['urlKey'] === 'add') {
				this.rolesForm = this.create_form();
			}

			this.permissions = result[1].data;
		});
	}

	create_form(data?: Roles): FormGroup {
		const form: FormGroup = this.fb.group({
			name: [
				data ? data.name : '',
				[Validators.required, Validators.minLength(2), Validators.maxLength(15), Validators.pattern('^([a-zA-Z0-9-])+$')]
			],

			permissions: [data ? data.permissions : [], Validators.required]
		});

		this.buildForm = true;

		return form;
	}

	onSubmit() {
		if (this.rolesForm.value.permissions.length) {
			this.rolesForm.value.permissions = this.rolesForm.value.permissions.map(reformat => reformat.id);
		}

		this.submitted = true;
		if (this.rolesForm.invalid) {
			return;
		}

		this.formData = this.rolesService.convertToFormData(this.rolesForm.value);

		!this.roles_id ? this.save() : this.update();
	}

	private save() {
		this.rolesService.save(this.formData).subscribe(
			(response: any) => {
				this.router.navigate(['/manpower/roles']).then(() => {
					this.toasterService.success('Records Added Successfully!', 'Success!', { positionClass: 'toast-top-right' });
				});
			},
			(err: HttpErrorResponse) => {
				this.handleError(err, this.rolesForm);
			}
		);
	}

	private update() {
		this.rolesService.update(this.formData, this.roles_id).subscribe(
			(response: any) => {
				this.router.navigate(['/manpower/roles']).then(() => {
					this.toasterService.success('Records Updated Successfully!', 'Success!', { positionClass: 'toast-top-right' });
				});
			},
			(err: HttpErrorResponse) => {
				this.handleError(err, this.rolesForm);
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

	get roles(): FormGroup {
		return this.rolesForm;
	}

	elementTouched(element) {
		element.markAsTouched();
	}
}
