import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { CblocksService } from '../../services/cblocks.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomizeObject } from '../../shared/classes/cutomizeObject';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { combineLatest } from 'rxjs';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {
	
	title: string;
	formData = new FormData();
	masterForm: FormGroup;
	buildForm = false;
	masterfile_id: string;
	languages: [{}];
	submitted = false;
	file: File = null;
	dimensions: any;
	font_styles: any;
	inputs: any;
	moduleFormDropdown: any;
	dropdownSettings = {};
	dropdownSettingsFF = {};
	dropdownSettingsFontStyle = {};
	color1 = "#ffffff";
	module_id: string;
	module_type: string;
	moduleForm: [{}];
	campaign_id: string;
	moduleFormFile: any = [];
	staticFileInputs:any = [];
	form_id: string;
	moduleFormDropdownText: any;
	error_messages: any = [];

	constructor(
		private router: Router,
		private masterService: MasterService,
		private activeRoute: ActivatedRoute,
		private toasterService: ToastrService,
		private cblocksService: CblocksService,
		private fb: FormBuilder
	) { }

	ngOnInit() {
		this.error_messages['inputs'] = [];
		this.dropdownSettings = CustomizeObject.dropDownSettings(true);
		this.dropdownSettingsFontStyle = CustomizeObject.dropDownSettings(true, true, 'font_name', 'font_name');
		this.dropdownSettingsFF = CustomizeObject.dropDownSettings(true, true, 'name', 'name');
		this.title = this.activeRoute.snapshot.data['title'];

		this.activeRoute.queryParams.subscribe(queryParams => {
			this.module_id = queryParams.module_id;
		});

		this.activeRoute.params
			.flatMap((params: any) => {
				if (params.id) {
					this.masterfile_id = params.id;
					return this.masterService.getAll({ id: params.id });
				}
				return this.activeRoute.params;
			})
			.subscribe(result => {

				this.inputs = this.fb.array([]);
				// Check if Edit Operation or Add
				
				combineLatest(
					this.masterService.getDimensions(),
					this.cblocksService.getAll({id: this.module_id}),
					this.masterService.getAllFontStyles()
				).subscribe(([dimensions, moduleData, fontStyles]) => {

					this.dimensions = dimensions;
					this.font_styles = fontStyles;
					
					this.getLanguagesByModule(moduleData);
					this.module_type = moduleData['data'][0]['type'];

					if (result['data']) {
						this.masterForm = this.create_form(result['data'][0]);
						this.masterForm.addControl('inputs', this.inputs);
						
						const that = this;
						if (result['data'][0].inputs) {
							const inputs = result['data'][0].inputs;
							inputs.forEach(function(row, i) {
								that.onAddInput(row);
							});
						}
					}  else {
						this.masterForm = this.create_form();
						this.inputs = this.fb.array([]);
					}

					this.masterForm.addControl('inputs', this.inputs);
					this.onChanges(result);
					this.buildForm = true;

				}) 
			});
	}

	getLanguagesByModule(moduleData) {
		this.moduleForm = moduleData['data'][0]['form'].form;
		this.form_id =  moduleData['data'][0]['form'].id;
		this.campaign_id = moduleData['data'][0]['campaign']['id'];
		const that = this;
		

		this.moduleForm.map(function(row) {
			if(row['type'] == 'file') {
				that.moduleFormFile.push(row);
			}
		});
		
		this.languages = moduleData['data'][0].languages;
	}

	create_form(data?: FormGroup) {
		if (data) {
			this.masterfile_id = data['id'];
			this.file = data['file'];
			this.getLanguagesByModule(data['module']['id']);
		}
		return this.fb.group({
			name: [data ? data['name'] : '', [Validators.required, Validators.pattern('^([a-zA-Z0-9 .])+$'), Validators.minLength(3), Validators.maxLength(50)]],
			language_id: [data ? [data['language']] : '', [Validators.required]],
			dimension_id: [data ? [data['dimension']] : '', [Validators.required]],
			file: ['', data ? [] : [Validators.required]],
			is_active: [data ? data['is_active'] : true],
			is_template_available: [data ? (data['settings']['is_template_available']==="1"|| data['settings']['is_template_available']==="true"): false],
			is_customizable: [data ? (data['settings']['is_customizable']==="1"||data['settings']['is_customizable']==="true") : false],
		});
	}

	onAddInput(row?: any) {
		if(typeof row === 'boolean') {
			if(row === false) {
				this.clearFormArray(this.inputs);
			} else {
				this.inputs.push(this.createInputRow());
				this.onChanges();
			}
		} else {
			this.inputs.push(this.createInputRow(row));
		}
	}
	
	clearFormArray = (formArray: FormArray) => {
		while (formArray.length !== 0) {
			formArray.removeAt(0)
		}
	}

	onRemoveInput(rowIndex: number) {
		this.inputs.removeAt(rowIndex);
	}

	private deleteKeysFromFormData(arr) {
		const that = this;
		arr.forEach(function(row, i) {
			that.formData.delete(row);
		});
	}

	createInputRow(row?: any): FormGroup {
		return this.fb.group({
			id: [row ? row.id : '', []],
			name: [row ? row.name : '', [Validators.required, Validators.pattern('^([a-zA-Z0-9 _-])+$'), Validators.minLength(3), Validators.maxLength(50)]],
			type: [row ? row.input_type : '', [Validators.required]],
			input_type: [row ? row.data_type : '', [Validators.required]],
			x: [row ? row.settings.dimension.x : '', [Validators.required, Validators.pattern('^([0-9])+$'), Validators.minLength(1), Validators.maxLength(5)]],
			y: [row ? row.settings.dimension.y : '', [Validators.required, Validators.pattern('^([0-9])+$'), Validators.minLength(1), Validators.maxLength(5)]],
			width: [row ? row.settings.dimension.width : '', [Validators.required, Validators.pattern('^([0-9])+$'), Validators.minLength(1), Validators.maxLength(5)]],
			height: [row ? row.settings.dimension.height : '', [Validators.required, Validators.pattern('^([0-9])+$'), Validators.minLength(1), Validators.maxLength(5)]]
		});
	}

	onChanges(result?: any): void {
		const inputs = this.masterForm.value.inputs;
		inputs.forEach((element, i) => {
			if (result && result['data']) {
				const inputData = result['data'][0].inputs;
				
				if (element.type === 'text') {
					let formGroup = <FormGroup>this.inputs.controls[i];
					if(element.input_type == 'static') {
						formGroup.addControl('static_text', new FormControl(inputData[i]['static_text'], [Validators.required, Validators.pattern('^([a-zA-Z0-9 _-])+$'), Validators.minLength(3), Validators.maxLength(50) ]));
					} else if (element.input_type == 'form') {

						this.moduleFormDropdownText = this.moduleForm;
						const temp = [{ id : 1, name : inputData[i]['field'] }];	

						formGroup.addControl('form_field', new FormControl(temp, Validators.required));
					}
					const color = this.masterService.rgbToHex(inputData[i]['settings'].color.r, inputData[i]['settings'].color.g, inputData[i]['settings'].color.b);
					
					/* Get selected Font Style */
					let selected_font_style = [];
					this.font_styles.data.map(function(font_style) {
						if(font_style.font_name == inputData[i]['settings'].font_style) {
							selected_font_style = [font_style];
						}
					});

					formGroup.addControl('font_color', new FormControl(color, Validators.required));
					formGroup.addControl('font_size', new FormControl(inputData[i]['settings'].font_size, Validators.required));
					formGroup.addControl('font_style', new FormControl(selected_font_style, Validators.required));
					formGroup.addControl('alignment_x', new FormControl(inputData[i]['settings'].alignment['x'], Validators.required));
					formGroup.addControl('alignment_y', new FormControl(inputData[i]['settings'].alignment['y'], Validators.required));
				
				} else if (element.type == 'file ') {
					let formGroup = <FormGroup>this.inputs.controls[i];
					if(element.input_type == 'static') {
						formGroup.addControl('static_file', new FormControl('', Validators.required));
					} else if (element.input_type == 'form') {
						this.moduleFormDropdown = this.moduleFormFile;
						formGroup.addControl('form_field', new FormControl(inputData[i]['field'], Validators.required));
					}
				}
			}

			this.masterForm.get('inputs')['controls'][i]['controls']['input_type'].valueChanges.subscribe(val => {
				
				const type = this.masterForm.get('inputs')['controls'][i]['controls']['type'].value;
				let formGroup = <FormGroup>this.inputs.controls[i];
				this.addUpdateInputs(type, val, formGroup);

			});
			
			this.masterForm.get('inputs')['controls'][i]['controls']['type'].valueChanges.subscribe(val => {
				
				const input_type = this.masterForm.get('inputs')['controls'][i]['controls']['input_type'].value;
				let formGroup = <FormGroup>this.inputs.controls[i];
				this.addUpdateInputs(val, input_type, formGroup);
				
			});
		});
	}

	addUpdateInputs(type, input_type, formGroup) {

		if (type === 'text') {
			formGroup.addControl('font_color', new FormControl('', Validators.required));
			formGroup.addControl('font_size', new FormControl('', Validators.required));
			formGroup.addControl('font_style', new FormControl('', Validators.required));
			formGroup.addControl('alignment_x', new FormControl('', Validators.required));
			formGroup.addControl('alignment_y', new FormControl('', Validators.required));
		} else {
			if (formGroup.get('font_size')) {
				formGroup.get('font_size').setValidators([]);
				formGroup.get('font_size').updateValueAndValidity();
				formGroup.get('font_style').setValidators([]);
				formGroup.get('font_style').updateValueAndValidity();
				formGroup.get('font_color').setValidators([]);
				formGroup.get('font_color').updateValueAndValidity();
				formGroup.get('alignment_x').setValidators([]);
				formGroup.get('alignment_x').updateValueAndValidity();
				formGroup.get('alignment_y').setValidators([]);
				formGroup.get('alignment_y').updateValueAndValidity();
			}
		}

		if(input_type == 'static' && type == 'text') {

			formGroup.addControl('static_text', new FormControl('', [Validators.required, Validators.pattern('^([a-zA-Z0-9 _-])+$'), Validators.minLength(3), Validators.maxLength(50) ]));
			if (formGroup.get('static_file')) {
				formGroup.get('static_file').setValidators([]);
				formGroup.get('static_file').updateValueAndValidity();
			}
		
		} else if(input_type == 'static' && type == 'file') {
			
			formGroup.addControl('static_file', new FormControl('', Validators.required));
			if (formGroup.get('static_text')) {
				formGroup.get('static_text').setValidators([]);
				formGroup.get('static_text').updateValueAndValidity();
			}
		
		} else if(input_type == 'form' && type == 'file') {
			
			formGroup.addControl('form_field', new FormControl('', Validators.required));
			if (formGroup.get('static_file')) {
				formGroup.get('static_file').setValidators([]);
				formGroup.get('static_file').updateValueAndValidity();
			}
			if (formGroup.get('static_text')) {
				formGroup.get('static_text').setValidators([]);
				formGroup.get('static_text').updateValueAndValidity();
			}
			this.moduleFormDropdown = this.moduleFormFile;
		
		} else if(input_type == 'form' && type == 'text') {
			
			formGroup.addControl('form_field', new FormControl('', Validators.required));
			if (formGroup.get('static_file')) {
				formGroup.get('static_file').setValidators([]);
				formGroup.get('static_file').updateValueAndValidity();
			}
			if (formGroup.get('static_text')) {
				formGroup.get('static_text').setValidators([]);
				formGroup.get('static_text').updateValueAndValidity();
			}
			this.moduleFormDropdownText = this.moduleForm;
		
		}
	}

	onSubmit() {
		this.submitted = true;
		if (this.masterForm.invalid) {
			return;
		}

		if (typeof this.masterForm.value.language_id === 'object') {
			this.masterForm.value.language_id = this.masterForm.value.language_id[0].id;
		}
		if (typeof this.masterForm.value.module_id === 'object') {
			this.masterForm.value.module_id = this.masterForm.value.module_id[0].id;
		}
		if (typeof this.masterForm.value.dimension_id === 'object') {
			this.masterForm.value.dimension_id = this.masterForm.value.dimension_id[0].id;
		}

		this.formData = this.masterService.convertToFormData(this.masterForm.value);

		this.deleteKeysFromFormData([
			'inputs[id]',
			'inputs[name]',
			'inputs[color]',
			'inputs[font_size]',
			'inputs[font_style]',
			'inputs[font_color]',
			'inputs[static_text]',
			'inputs[static_file]',
			'inputs[alignment_x]',
			'inputs[alignment_y]',
			'inputs[type]',
			'inputs[input_type]',
			'inputs[form_field]',
			'inputs[x]',
			'inputs[y]',
			'inputs[width]',
			'inputs[height]'
		]);
		
		this.formData.set('settings[is_template_available]', this.masterForm.value.is_template_available);
		this.formData.set('settings[is_customizable]', this.masterForm.value.is_customizable);
		this.formData.set('module_id', this.module_id);
		this.formData.set('campaign_id', this.campaign_id);
		const that = this;
		const inputs = this.masterForm.value.inputs;
		inputs.forEach(function(row, i) {
			if (row.id) {
				that.formData.append('config[inputs][' + i + '][id]', row.id);
			}
			if (row.font_color) {
				const rgbData = that.masterService.hexToRgb(row.font_color);
				that.formData.append('inputs[' + i + '][settings][color][r]', rgbData['r'].toString());
				that.formData.append('inputs[' + i + '][settings][color][g]', rgbData['g'].toString());
				that.formData.append('inputs[' + i + '][settings][color][b]', rgbData['b'].toString());
				that.formData.append('inputs[' + i + '][settings][font_size]', row.font_size);
				that.formData.append('inputs[' + i + '][settings][font_style]', row.font_style[0].font_name);
				that.formData.append('inputs[' + i + '][settings][alignment][x]', row.alignment_x);
				that.formData.append('inputs[' + i + '][settings][alignment][y]', row.alignment_y);
			}
			that.formData.append('inputs[' + i + '][name]', row.name);
			that.formData.append('inputs[' + i + '][input_type]', row.type);
			that.formData.append('inputs[' + i + '][data_type]', row.input_type);
			
			if(row.input_type == 'static' && row.type == 'text') {
			
				that.formData.append('inputs[' + i + '][static_text]', row.static_text);
			
			} else if(row.input_type == 'static' && row.type == 'file') {
			
				that.formData.append('inputs[' + i + '][static_file]', that.staticFileInputs[i]);
			
			} else if(row.input_type == 'form') {
			
				that.formData.append('inputs[' + i + '][form_id]', that.form_id);
				that.formData.append('inputs[' + i + '][field]', row.form_field[0].name);
			
			}
			
			that.formData.append('inputs[' + i + '][settings][dimension][x]', row.x);
			that.formData.append('inputs[' + i + '][settings][dimension][y]', row.y);
			that.formData.append('inputs[' + i + '][settings][dimension][width]', row.width);
			that.formData.append('inputs[' + i + '][settings][dimension][height]', row.height);
		});

		if (this.file && this.file.name !== undefined) {
			this.formData.set('file', this.file, this.file.name);
		}

		!this.masterfile_id ? this.save() : this.update();
	}

	private save() {
		this.masterService.save(this.formData).subscribe(
			(response: any) => {
				this.router.navigate(['/master'], { queryParams : { campaign_id: this.campaign_id, module_id: this.module_id } }).then(() => {
					this.toasterService.success('Records Added Successfully!', 'Success!', { positionClass: 'toast-top-right' });
				});
			},
			(err: HttpErrorResponse) => {
				this.handleError(err, this.masterForm);
			}
		);
	}

	private update() {
		if (this.file.name === undefined) {
			this.formData.delete('file');
		}

		this.masterService.update(this.formData, this.masterfile_id).subscribe(
			(response: any) => {
				this.router.navigate(['/master'], { queryParams : { campaign_id: this.campaign_id, module_id: this.module_id } }).then(() => {
					this.toasterService.success('Records Updated Successfully!', 'Success!', { positionClass: 'toast-top-right' });
				});
			},
			(err: HttpErrorResponse) => {
				this.handleError(err, this.masterForm);
			}
		);
	}

	handleError(err: HttpErrorResponse, form: FormGroup) {
		if (err.status === 400) {
			
			this.error_messages = err.error.error;
			this.error_messages.inputs = [];

			for(let i = 0; i < this.inputs.length; i++) {

				this.error_messages.inputs[i] = [];
				this.error_messages.inputs[i].settings = [];
				this.error_messages.inputs[i].settings.dimension = [];

				if(this.error_messages["inputs."+i+".name"]) {
					this.error_messages.inputs[i].name = this.error_messages["inputs."+i+".name"];
				}
				if(this.error_messages["inputs."+i+".static_text"]) {
					this.error_messages.inputs[i].static_text = this.error_messages["inputs."+i+".static_text"];
				}
				if(this.error_messages["inputs."+i+".static_file"]) {
					this.error_messages.inputs[i].static_file = this.error_messages["inputs."+i+".static_file"];
				}
				if(this.error_messages["inputs."+i+".settings.dimension.x"]) {
					this.error_messages.inputs[i].settings.dimension.x = this.error_messages["inputs."+i+".settings.dimension.x"];
				}
				if(this.error_messages["inputs."+i+".settings.dimension.y"]) {
					this.error_messages.inputs[i].settings.dimension.y = this.error_messages["inputs."+i+".settings.dimension.y"];
				}
				if(this.error_messages["inputs."+i+".settings.dimension.width"]) {
					this.error_messages.inputs[i].settings.dimension.width = this.error_messages["inputs."+i+".settings.dimension.width"];
				}
				if(this.error_messages["inputs."+i+".settings.dimension.height"]) {
					this.error_messages.inputs[i].settings.dimension.height = this.error_messages["inputs."+i+".settings.dimension.height"];
				}
				if(this.error_messages["inputs."+i+".settings.dimension.font_size"]) {
					this.error_messages.inputs[i].settings.dimension.font_size = this.error_messages["inputs."+i+".settings.dimension.font_size"];
				}
				if(this.error_messages["inputs."+i+".settings.dimension.font_style"]) {
					this.error_messages.inputs[i].settings.dimension.font_style = this.error_messages["inputs."+i+".settings.dimension.font_style"];
				}
				if(this.error_messages["inputs."+i+".settings.dimension.font_color"]) {
					this.error_messages.inputs[i].settings.dimension.font_color = this.error_messages["inputs."+i+".settings.dimension.font_color"];
				}
				if(this.error_messages["inputs."+i+".settings.dimension.input_type"]) {
					this.error_messages.inputs[i].input_type = this.error_messages["inputs."+i+".input_type"];
				}
				if(this.error_messages["inputs."+i+".settings.dimension.data_type"]) {
					this.error_messages.inputs[i].data_type = this.error_messages["inputs."+i+".data_type"];
				}
				
			}

		} else {
			alert("Problems while saving data");
		}
	}

	get formObj() {
		return this.masterForm.controls;
	}

	fileChange(files: FileList) {
		this.file = files.length ? files.item(0) : null;
	}

	colorChanged(color, i) {
		this.inputs.controls[i].get('font_color').patchValue(color);
	}

	staticFileChange(files: FileList, i) {
		this.staticFileInputs[i] = files.length ? files.item(0) : null;
	}
}
