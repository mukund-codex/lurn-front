import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DesignationService } from 'src/app/services/designation.service';
import { FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {

  title: string;
  buildForm = false;
  change_in_params: {} = {};
  designation_id: string;
  designationForm: FormGroup;
  submitted = false;
  error_messages: any = [];
  formData = new FormData();

  constructor(
    private activeRoute: ActivatedRoute,
    private designationService: DesignationService,
    private router: Router,
    private toasterService: ToastrService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
		this.title = this.activeRoute.snapshot.data['title'];
		this.buildForm = false;

		this.change_in_params = this.activeRoute.params
			.flatMap((params: any) => {
				if (params.id) {
					this.designation_id = params.id;
					return this.designationService.getAll({ id: params.id });
				}
				return this.activeRoute.params;
			})
			.subscribe(result => {
				if (result['data']) {
					this.designationForm = this.create_form(result['data'][0]);
				} else {
					this.designationForm = this.create_form();
				}

				this.buildForm = true;
			});
	}

	create_form(data?: FormGroup): FormGroup {
		return this.fb.group({
			name: [data ? data['name'] : '', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^([a-zA-Z0-9 _-])+$')]],
			id: [data ? data['id'] : ''],
			is_active: [data ? String(data['is_active']) : 'true']
		});
	}

	formObj() {
		return this.designationForm.controls;
	}

	onSubmit() {
		this.submitted = true;

		if (this.designationForm.invalid) {
			return;
		}

		this.formData = this.designationService.convertToFormData(
			this.designationForm.value
		);

		!this.designation_id ? this.save() : this.update();
	}

	private save() {
		this.designationService.save(this.formData).subscribe(
			(response: any) => {
				this.router.navigate(['/designation']).then(() => {
					this.toasterService.success(
						'Records Added Successfully!',
						'Success!',
						{ positionClass: 'toast-top-right' }
					);
				});
			},
			(err: HttpErrorResponse) => {
				this.handleError(err, this.designationForm);
			}
		);
	}

	private update() {
		this.designationService.update(this.formData, this.designation_id).subscribe(
			(response: any) => {
				this.router.navigate(['/designation']).then(() => {
					this.toasterService.success(
						'Records Updated Successfully!',
						'Success!',
						{ positionClass: 'toast-top-right' }
					);
				});
			},
			(err: HttpErrorResponse) => {
				this.handleError(err, this.designationForm);
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

}
