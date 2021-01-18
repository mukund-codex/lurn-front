import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from '../../services/language.service';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
	title: string;
	change_in_params: {} = {};
	buildForm: boolean;
	language_id: number;
	languageForm: FormGroup;
	submitted = false;
	logo: File = null;
	currentLogo: string;
	formData = new FormData();
	editFlag = false;
	color1 = '#ffffff';
	color2 = '#ffffff';
	error_messages: any = [];

	constructor(
		private activeRoute: ActivatedRoute,
		private languageService: LanguageService,
		private fb: FormBuilder,
		private router: Router,
		private toasterService: ToastrService
	) {}

	ngOnInit() {
		this.title = this.activeRoute.snapshot.data['title'];
		this.buildForm = false;

		this.change_in_params = this.activeRoute.params
			.flatMap((params: any) => {
				if (params.id) {
					this.language_id = params.id;
					return this.languageService.getAll({ id: params.id });
				}
				return this.activeRoute.params;
			})
			.subscribe(result => {
				if (result['data']) {
					this.logo = null;
					this.currentLogo = result['data'][0].logo;
					this.languageForm = this.create_form(result['data'][0]);
				} else {
					this.languageForm = this.create_form();
				}

				this.buildForm = true;
			});
	}

	create_form(data?: FormGroup): FormGroup {
		return this.fb.group({
			name: [data ? data['name'] : '', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('^([a-zA-Z0-9 _-])+$')]],
			id: [data ? data['id'] : ''],
			logo: [],
			settings: this.fb.array([this.setting_arr(data)]),
			is_active: [data ? String(data['is_active']) : 'true']
		});
	}

	setting_arr(data?: any): FormGroup {
		return this.fb.group({
			bg_color: [data && data.settings ? data.settings.bg_color : '', [Validators.required]],
			text_color: [data && data.settings ? data.settings.text_color : '', [Validators.required]]
		});
	}

	formObj() {
		return this.languageForm.controls;
	}

	logoChange(files: FileList) {
		this.logo = files.length ? files.item(0) : null;
	}

	bgcolorChanged(color) {
		this.settings.controls[0].get('bg_color').patchValue(color);
	}

	textcolorChanged(color) {
		this.settings.controls[0].get('text_color').patchValue(color);
	}

	get settings(): FormArray {
		return this.languageForm.get('settings') as FormArray;
	}

	onSubmit() {
		this.submitted = true;

		if (this.languageForm.invalid) {
			return;
		}

		this.formData = this.languageService.convertToFormData(
			this.languageForm.value
		);

		if (this.logo) {
			this.formData.set('logo', this.logo, this.logo.name);
		} else {
			this.formData.delete('logo');
		}

		!this.language_id ? this.save() : this.update();
	}

	private save() {
		this.languageService.save(this.formData).subscribe(
			(response: any) => {
				this.router.navigate(['/language']).then(() => {
					this.toasterService.success(
						'Records Added Successfully!',
						'Success!',
						{ positionClass: 'toast-top-right' }
					);
				});
			},
			(err: HttpErrorResponse) => {
				this.handleError(err, this.languageForm);
			}
		);
	}

	private update() {
		this.languageService.update(this.formData, this.language_id).subscribe(
			(response: any) => {
				this.router.navigate(['/language']).then(() => {
					this.toasterService.success(
						'Records Updated Successfully!',
						'Success!',
						{ positionClass: 'toast-top-right' }
					);
				});
			},
			(err: HttpErrorResponse) => {
				this.handleError(err, this.languageForm);
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
