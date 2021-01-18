import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TemplateService } from '../services/template.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import { CustomizeObject } from '../shared/classes/cutomizeObject';
import { Subscription } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import 'rxjs/add/observable/merge';
import { NgForm, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Lightbox } from 'ngx-lightbox';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-template',
	templateUrl: './template.component.html',
	styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit, AfterViewInit {

	title: string;
	records: any;
	searchObj: {} = {};
	templateData: any;
	parameters: {} = {};
	templateForm: FormGroup;
	message: {"text" : ""};
	subscription: Subscription;
	isCollapsed = true;
	campaign_id: string;
	language_id: any;
	module_id: string;
	template_name: string;
	private _albums = [];
	@ViewChild('searchForm') sf: NgForm;
	showExport: Boolean = false;
	showDelete: Boolean = false;
	languages: any;
	dropdownSettingsLanguage: {};
	showModal = false;
	file: File = null;
	submitted = false;
	module_languages: any;
	clonedTemplate: any;
	error_messages: any = [];
	formData = new FormData();
	selected_template_name: string;

	constructor(
		private router: Router,
		private activeRoute: ActivatedRoute,
		private templateService: TemplateService,
		private toasterService: ToastrService,
		private formBuilder: FormBuilder,
		private _lightbox: Lightbox
	) {

	}

	ngOnInit() {

		this.templateForm = this.create_form();


		this.title = this.activeRoute.snapshot.data['title'];
		this.activeRoute.queryParams.subscribe(queryParams => {
			this.campaign_id = queryParams.campaign_id;
			this.module_id = queryParams.module_id;
			this.languages = this.templateService.getAll({}, 'language');
		});
		this.dropdownSettingsLanguage = CustomizeObject.dropDownSettings(true);
		const permissionSet = this.templateService.checkPermissionExist(['export-template', 'remove-template']);
		this.showExport = permissionSet[0];
		this.showDelete = permissionSet[1];
	}

	create_form() {
		const form: FormGroup = this.formBuilder.group({
			name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
			language_id: ['', [Validators.required]],
			file: ['', [Validators.required]],
		});

		return form;
	}

	get f() {
		return this.templateForm.controls;
	}

	fileChange(files: FileList) {
		this.file = files.length ? files.item(0) : null;
	}

	ngAfterViewInit() {
		this.subscription = Observable.merge(
			this.activeRoute.queryParams.pipe(
				map(qParams => {
					this.parameters = CustomizeObject.merge({}, this.parameters, qParams);
					return this.parameters;
				}),
				concatMap(nParam => this.loadData(nParam))
			)
		).subscribe(result => {
			this.records = result;
		});
	}

	open(index): void {
		// open lightbox
		this._lightbox.open(this._albums, index);
	}

	loadData(obj) {
		return this.templateService.getAll(obj);
	}

	search() {
		const language_id: {} = this.language_id ? (this.language_id[0] ? { language_id: this.language_id[0].id } : {}) : {};
		const template_name: {} = this.template_name ? { template_name: this.template_name } : {};

		this.searchObj = Object.assign(language_id, template_name, this.parameters);
		this.templateService.getAll(this.searchObj).subscribe( result => {
			this.records = result;
		});
	}

	pageChange(pageNumber) {
		this.router.navigate([], {
			relativeTo: this.activeRoute,
			queryParams: { page: pageNumber, campaign_id: this.campaign_id, module_id: this.module_id }
		});
	}

	delete(template_id) {
		const formData = new FormData();
		this.templateService.delete(formData, template_id).subscribe(result => {
			this.toasterService.success('Record Deleted!', 'Success!', {
				positionClass: 'toast-top-right'
			});
			this.sf.form.updateValueAndValidity();
		},
		(err: HttpErrorResponse) => {
			this.handleError(err);
		});
	}

	onSubmit() {

		this.submitted = true;
		if (this.templateForm.invalid) {
			return;
		}

		const selected_template_data = [];
		const is_active = this.clonedTemplate['data'][0].is_active;
		const is_customizable = this.clonedTemplate['data'][0].settings.is_customizable;


		const language_id = this.templateForm.value.language_id[0].id;
		
		this.templateForm.value.language_id = language_id;
		this.templateForm.value.module_id = this.clonedTemplate['data'][0].module.id;
		this.templateForm.value.dimension_id = this.clonedTemplate['data'][0].dimension.id;
		this.templateForm.value.campaign_id = this.clonedTemplate['data'][0].module.campaign.id;
		this.templateForm.value.company_id = this.clonedTemplate['data'][0].module.campaign.company_id;
		this.templateForm.value.parent_id = this.clonedTemplate['data'][0].id;

		this.formData = this.templateService.convertToFormData(this.templateForm.value);

		this.formData.set('is_customizable', is_customizable);
		this.formData.set('is_active', is_active);
		this.formData.set('dimension', this.clonedTemplate['data'][0].dimension.id);

		if (this.file && this.file.name !== undefined) {
			this.formData.set('file', this.file, this.file.name);
		}

		this.save();
	}

	private save() {

		this.templateService.cloneTemplate(this.formData).subscribe(
			(response: any) => {
				this.toasterService.success('Records Added Successfully!', 'Success!', { positionClass: 'toast-top-right' });
				this.hide();
				this.sf.form.updateValueAndValidity();
			},
			(err: HttpErrorResponse) => {
				this.handleError(err);
			}
		);
	}

	handleError(err: HttpErrorResponse) {
		if (err.status === 400) {
			this.error_messages = err.error.error;
		} else {
			alert('Problems while saving data');
		}
	}

	cloneTemplate(template_id) {

		this.dropdownSettingsLanguage = CustomizeObject.dropDownSettings(true);

		this.templateService.getAll({id: template_id}).subscribe(templateData => {
			this.clonedTemplate = templateData;
			this.selected_template_name = templateData['data'][0].name;
			this.module_languages = templateData['data'][0].module.languages;
			this.showModal = true;
		});
		// combineLatest().subscribe(([templateData]) => {});
	}

	hide() {
		this.showModal = false;
	}
}
