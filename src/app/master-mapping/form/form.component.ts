import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { InputService } from './../../../app/services/input.service';
import { CustomizeObject } from '../../../app/shared/classes/cutomizeObject';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MasterService } from '../../services/master.service';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
	title: string;
	dropdownSettingsCompany: {};
	dropdownSettings: {};
	dropdownSettingsForm: {};
	buildForm: Boolean;
	inputData: any;
	inputsData: any;
	formsData: any;
	inputForm: FormGroup;
	companies: any;
	campaignData: any;
	campsData: any;
	modulesData: any;
	masterfilesData: any;
	inputs: FormArray;
	group: any = [];
	submitted: Boolean;
	mapping_id: string;
	formData = new FormData();
	mappingData = [];
	formfld = false;
	staticTxt = [];
	staticFile = [];
	static = [];
	form = [];

	constructor(
		private inputService: InputService,
		private masterService: MasterService,
		private activeRoute: ActivatedRoute,
		private router: Router,
		private fb: FormBuilder,
		private toasterService: ToastrService
	) { }

	ngOnInit() {
		this.title = this.activeRoute.snapshot.data['title'];
		this.companies = this.inputService.getCompanies();
		this.dropdownSettingsCompany = CustomizeObject.dropDownSettings(true);
		this.dropdownSettingsForm = CustomizeObject.dropDownSettings(true, false, 'name', 'label');
		this.dropdownSettings = CustomizeObject.dropDownSettings(true);

		this.activeRoute.params.subscribe(param => {
			this.buildForm = false;
			if (param.id) {
				this.inputData = this.masterService.getAll({ id: param.id }).subscribe(result => {
					if (result['data'][0]) {
						const editData = result['data'][0];
						this.inputForm = this.create_form(editData);

						this.inputs = this.fb.array([]);
						this.inputForm.addControl('inputs', this.inputs);
						this.getCamps(editData['camp']['campaigns'][0].id);
						this.getMasterfiles(editData['camp']['modules'][0].id);

						this.inputService.getTemplateById(editData['customizable']['id']).subscribe(templateData => {
							this.inputsData = templateData['data'][0].input;
						});

						this.inputService.getCampsFromCampaign(editData['camp']['campaigns'][0].id).subscribe(camps => {
							this.getModules(editData['camp'], camps['data']);
							this.getInputs(editData['customizable']['id']);
						});
					}
					// this.onChanges(result);
				});
			} else {
				this.inputForm = this.create_form();
				this.inputs = this.fb.array([]);
				this.inputForm.addControl('inputs', this.inputs);
				// this.onChanges();
				this.buildForm = true;
			}

		});
	}

	create_form(data?: any): FormGroup {

		if (data) {
			this.mapping_id = data['id'];
			this.getcampaign(data['camp']['modules'][0]['company_id']);
		}

		return this.fb.group({
			company_id: [data ? [data['camp']['campaigns'][0]['company']] : '', [Validators.required]],
			campaign_id: [data ? [data['camp']['campaigns'][0]] : '', [Validators.required]],
			camp_id: [data ? [data['camp']] : '', [Validators.required]],
			module_id: [data ? [data['camp']['modules'][0]] : '', [Validators.required]],
			masterfile_id: [data ? [data['customizable']] : '', [Validators.required]],
			form_inputs: this.fb.array([])
		});
	}

	getcampaign(company_id?: string) {
		if (typeof company_id === 'object') {
			company_id = company_id['id'];
		}
		if (company_id) {
			this.campaignData = this.inputService.getCampaignFromCompany(company_id);
		}
	}

	getCamps(campaign_id?: string) {
		if (typeof campaign_id === 'object') {
			campaign_id = campaign_id['id'];
		}
		if (campaign_id) {
			this.campsData = this.inputService.getCampsFromCampaign(campaign_id);
		}
	}

	getModules(camp_id, campData) {
		campData.map(function (arrayElement) {
			if (arrayElement['id'] === camp_id['id']) {
				campData = arrayElement;
			}
		});

		if (typeof camp_id === 'object') {
			camp_id = camp_id['id'];
		}
		if (camp_id) {
			this.modulesData = this.inputService.getModulesFromCamp(camp_id);
			this.inputForm.addControl('form_id', new FormControl(campData.form[0].id, Validators.required));
			this.formsData = campData.form[0].form;
		}
	}

	getInputs(masterfile_id, fields?: any) {
		const that = this;
		this.masterfilesData.subscribe(result => {

			let data = result.data.map(arrayElement => {
				if (arrayElement['id'] === masterfile_id['id']) {
					if (arrayElement.inputs) {
						that.inputsData = arrayElement.inputs;
						let group: any = {};
						that.inputsData.forEach((element, i) => {
							group = new FormGroup({
								input_id: new FormControl(this.inputsData[i].id),
								type: new FormControl(),
								input_type: new FormControl(this.inputsData[i].type)
							});
							const inputsControl = <FormArray>this.inputForm.controls.form_inputs;
							inputsControl.push(group);
							this.inputForm.get('form_inputs')['controls'][i]['controls']['type'].valueChanges.subscribe(val => {
								this.staticTxt[i] = this.form[i]  = this.staticFile[i] = false;
								const form_input_controls = this.inputForm.get('form_inputs')['controls'][i]
								this.static[i] = false;
								if (val === 'static') {
									this.static[i] = true;
									if(element.type === 'text'){
										this.staticTxt[i] = true;
										form_input_controls.addControl('static_text', new FormControl('', Validators.required));
									}else if(element.type === 'file'){
										this.staticFile[i] = true;
										form_input_controls.addControl('static_file', new FormControl('', Validators.required));
									}
								} else {
									this.form[i] = true;
									form_input_controls.addControl('form_field', new FormControl('', Validators.required));
								}
							});
						});
						this.group = group;
					}
				}
			});
			this.buildForm = true;
		});
	}

	getMasterfiles(module_id?: string) {
		if (typeof module_id === 'object') {
			module_id = module_id['id'];
		}
		if (module_id) {
			this.masterfilesData = this.inputService.getMasterfilesFromModule(module_id);
		}
	}

	onRemoveRow(rowIndex: number) {
		this.inputs.removeAt(rowIndex);
	}

	get formObj() {
		return this.inputForm.controls;
	}

	onSubmit() {
		this.submitted = true;
		if (this.inputForm.invalid) {
			return;
		}

		this.inputForm.value.camp_id = this.inputForm.value.camp_id[0].id;
		this.inputForm.value.masterfile_id = this.inputForm.value.masterfile_id[0].id;

		const form_inputs = this.inputForm.value.form_inputs;
		// const temp = [];

		this.formData = this.inputService.convertToFormData(this.inputForm.value);
		this.deleteKeysFromFormData([
			'form_inputs[input_id]',
			'form_inputs[static_text]',
			'form_inputs[static_file]',
			'form_inputs[form_id]',
			'form_id',
			'form_inputs[type]',
			'form_inputs[input_type]',
			'form_inputs[mapping_id]',
			'form_inputs[form_field]',
			'module_id[id]',
			'module_id[name]'
		]);

		form_inputs.forEach((result, i) => {
			this.formData.append('form_inputs[' + i + '][input_id]', result.input_id);
			this.formData.append('form_inputs[' + i + '][type]', result.type);
			this.formData.append('form_inputs[' + i + '][input_type]', result.input_type);
			if (result.static_text) {
				this.formData.append('form_inputs[' + i + '][static_text]', result.static_text);
			}
			if (result.static_file) {
				this.formData.append('form_inputs[' + i + '][static_file]', result.static_file);
			}
			if(result.form_field){
				this.formData.append('form_inputs[' + i + '][field]', result.form_field[0].name);
				this.formData.append('form_inputs[' + i + '][form_id]', this.inputForm.value.form_id);
			}
		});

		// this.inputForm.value.form_inputs = temp;
		!this.mapping_id ? this.save() : this.update();
	}

	private deleteKeysFromFormData(arr) {
		const that = this;
		arr.forEach(function (row, i) {
			that.formData.delete(row);
		});
	}

	private save() {
		this.inputService.saveMasterfileMapping(this.formData).subscribe(
			(response: any) => {
				this.router.navigate(['/masterfile-mapping']).then(() => {
					this.toasterService.success('Records Added Successfully!', 'Success!', { positionClass: 'toast-top-right' });
				});
			},
			(err: HttpErrorResponse) => {
				this.handleError(err, this.inputForm);
			}
		);
	}

	private update() {
		this.inputService.update(this.formData, this.mapping_id).subscribe(
			(response: any) => {
				this.router.navigate(['/masterfile-mapping']).then(() => {
					this.toasterService.success('Records Updated Successfully!', 'Success!', { positionClass: 'toast-top-right' });
				});
			},
			(err: HttpErrorResponse) => {
				this.handleError(err, this.inputForm);
			}
		);
	}

	handleError(err: HttpErrorResponse, form: FormGroup) {
		if (err.status === 400) {
			form.setErrors(err.error);
			alert("Problems while saving data");
		}
	}
}
