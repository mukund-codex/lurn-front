import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DimensionService } from '../../services/dimension.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
	title: string;
	change_in_params: any;
	dimension_id: string;
	buildForm: boolean;
	dimensionForm: FormGroup;
	errors: any = [];
	submitted = false;
	editFlag = false;
	error_messages: any = [];
	constructor(
		private activeRoute: ActivatedRoute,
		private toasterService: ToastrService,
		private router: Router,
		private fb: FormBuilder,
		private dimensionService: DimensionService
	) {}

	ngOnInit() {
		this.title = this.activeRoute.snapshot.data['title'];

		this.change_in_params = this.activeRoute.params
			.flatMap((params: any) => {
				if (params.id) {
					this.dimension_id = params.id;
					return this.dimensionService.getAll({ id: params.id });
				}
				return this.activeRoute.params;
			})
			.subscribe(result => {
				if (result['data']) {
					this.dimensionForm = this.create_form(result['data'][0]);
				} else {
					this.dimensionForm = this.create_form();
				}

				this.buildForm = true;
			});
	}

	create_form(data?: any) {
		return this.fb.group({
			name: [data ? data['name'] : '', [Validators.required, Validators.pattern('^([a-zA-Z0-9 _-])+$')]],
			dimension_id: [data ? data['id'] : ''],
			height: [data ? data['height'] : '', [Validators.required, Validators.min(50), Validators.max(5000)]],
			width: [data ? data['width'] : '', [Validators.required, Validators.min(50), Validators.max(5000)]],
			is_active: [data ? String(data['is_active']) : 'true']
		});
	}

	get formObj() {
		return this.dimensionForm.controls;
	}

	onSubmit() {
		this.submitted = true;
		if (this.dimensionForm.invalid) {
			return;
		}

		this.dimensionForm.value.height = +this.dimensionForm.value.height;
		this.dimensionForm.value.width = +this.dimensionForm.value.width;

		const dimensionData = this.dimensionService.convertToFormData(this.dimensionForm.value);
		const dimension_id = this.dimensionForm.value.dimension_id;

		if (!dimension_id) {
			this.dimensionService
				.save(dimensionData)
				.subscribe(
					(responseData: any) => this.addUpdate('/dimension', 'Records Added Successfully!'),
					(err: HttpErrorResponse) => this.controlError(err)
				);
		} else {
			this.dimensionService
				.update(dimensionData, dimension_id)
				.subscribe(
					(responseData: any) => this.addUpdate('/dimension', 'Records Updated Successfully!'),
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
			this.error_messages = err.error.error;
		} else {
			alert('Problems while saving data');
		}
	}
}
