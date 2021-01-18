import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';
import { GeographyService } from '../../services/geography.service';

import { combineLatest } from 'rxjs';
import { concatMap, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';
import 'rxjs/add/observable/of';
import { CustomizeObject } from '../../shared/classes/cutomizeObject';
import { CampaignService } from 'src/app/services/campaign.service';
import { formatDate } from '@angular/common';
import { CourseService } from 'src/app/services/course.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { GroupService } from 'src/app/services/group.service';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
	title: string;
	urlKey: string;
	disabled: boolean;

	campaign_id = '';
	geography_id = '';
	course_id = '';
	courseForm: FormGroup;
	isDisabled = false;
	buildForm: boolean;
	dropdownSettings: {};
	submitted = false;
	minDate = {};
	image: any;
	image_url: string = '';
	companyData: any = [];
	campaignData: any = [];
	courseData: any;
	typesData: any = [];
	groupData: any = [];
	nationalZonesData: any = [];
	zonesData: any = [];
	regionsData: any = [];
	areaData: any = [];
	cityData: any = [];
	errors: any = [];
	error_messages: any = [];
	public Editor = ClassicEditor;

	showField = {
		'National Zone': false,
		Zone: false,
		Region: false,
		Area: false,
		City: false
	};

	fields = [
		{ keyname: 'national_zone', text: 'National Zone' },
		{ keyname: 'zone', text: 'Zone' },
		{ keyname: 'region', text: 'Region' },
		{ keyname: 'area', text: 'Area' },
		{ keyname: 'city', text: 'City' }
	];

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private activeRoute: ActivatedRoute,
		private geoService: GeographyService,
		public toasterService: ToastrService,
		private cs: CampaignService,
		private courseService: CourseService,
		private groupService: GroupService
	) {


		ClassicEditor.defaultConfig = {
			ckfinder: {
				uploadUrl: 'https://uat-lurn.techizertech.in/api/v1/files/upload',
				headers: {
					'X-CSRF-TOKEN': 'CSFR-Token',
					Authorization: 'Bearer ' + localStorage.getItem('userToken')
				}
			},
			placeholder: 'Type the content here!',
			toolbar: {
			items: [
				'heading',
				'|',
				'bold',
				'italic',
				'|',
				'bulletedList',
				'numberedList',
				//'|',
				//'insertTable',
				//'imageUpload',
				//'link',
				'|',
				'undo',
				'redo'
			]
			},
			image: {
				toolbar: [
					'imageStyle:full',
					'imageStyle:side',
					'|',
					'imageTextAlternative'
				]
			},
			table: {
			contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
			},
			language: 'en'
		  };
		  
	}

	getCurrentCampaign() {
		return this.cs.getCampaignId();
	}

	ngOnInit() {
		this.campaign_id = this.getCurrentCampaign();

		this.groupData = this.groupService.getGroupFromCampaign(this.campaign_id);
		const page = this.activeRoute.snapshot.data;
		this.title = page['title'];
		this.urlKey = page['urlKey'];
		this.disabled = page['urlKey'] === 'edit' ? false : false;
		this.dropdownSettings = CustomizeObject.dropDownSettings(true, true);
		const date = new Date();
		
		

		if (this.urlKey === 'add') {
			this.minDate = {year:date.getFullYear(),month: (date.getMonth() + 1), day: (date.getDate())};
			this.courseForm = this.create_form();
			this.buildForm = true;
		} else {
			this.activeRoute.params.pipe(concatMap((params: Params) => this.courseService.getAll({ id: params.id }))).subscribe((result: any) => {
				if (result.data && result.data[0]) {
					this.courseData = result.data[0];
					this.course_id = result.data[0].id;
					this.isDisabled = true;
					this.courseForm = this.create_form(this.courseData);
					this.buildForm = true;
				} else {
					this.buildForm = true;
				}
			});
		}
	}
	
	resetHeirarchyFor(controlName: string) {
		if (controlName === 'All') {
			this.courseForm.controls.national_zone.patchValue([]);
			this.nationalZonesData = [];
		}

		if (controlName === 'National Zone' || controlName === 'All') {
			this.courseForm.controls.zone.patchValue([]);
			this.zonesData = [];
		}

		if (controlName === 'National Zone' || controlName === 'Zone' || controlName === 'All') {
			this.courseForm.controls.region.patchValue([]);
			this.regionsData = [];
		}

		if (controlName === 'National Zone' || controlName === 'Zone' || controlName === 'Region' || controlName === 'All') {
			this.courseForm.controls.area.patchValue([]);
			this.areaData = [];
		}

		if (
			controlName === 'National Zone' ||
			controlName === 'Zone' ||
			controlName === 'Region' ||
			controlName === 'Area' ||
			controlName === 'All'
		) {
			this.courseForm.controls.city.patchValue([]);
			this.cityData = [];
		}
	}

	resetFieldsAndVAlidity() {
		// reset all geography fields [NZ, Z, R, A, C]
		for (const key in this.showField) {
			if (this.showField.hasOwnProperty(key)) {
				this.showField[key] = false;

				const formFieldNode = this.fields.find(o => o.text === key);
				this.courseForm.controls[formFieldNode.keyname].setValidators(null);

				this.courseForm.controls[formFieldNode.keyname].updateValueAndValidity();
			}
		}
	}

	requiredFields(geographyField: { id?: string; name?: string }) {
		if (geographyField.name) {
			const selectedTypeIndex = this.typesData.findIndex(obj => obj.name === geographyField.name);

			this.resetFieldsAndVAlidity();

			if (selectedTypeIndex > -1) {
				for (let i = 0; i < selectedTypeIndex; i++) {
					const key = this.typesData[i].name;
					this.showField[key] = true;

					const formFieldNode = this.fields.find(o => o.text === key);
					this.courseForm.controls[formFieldNode.keyname].setValidators([Validators.required]);

					this.courseForm.controls[formFieldNode.keyname].updateValueAndValidity();
				}
			}
		}
	}

	create_form(data ?: any): FormGroup {  

		if(data) {
			if(data.image) {
				this.image_url = data.image;	
			}
		}

		let start_date = [];
		let end_date = [];
		if (data) {
			if(data.start_date) {
				start_date = data.start_date.split('-');
			}
			if(data.end_date) {
				end_date = data.end_date.split('-');
			}
		}

		const form: FormGroup = this.fb.group({
			name: [data ? data.name: "", [Validators.required, Validators.minLength(3), Validators.maxLength(255), Validators.pattern('^([a-zA-Z0-9- ])+$')]],
			group_id: [data ? [{id:data.group_id, name:data.group_name}] : '',[Validators.required]],
			description: [data ? data.description: "", [Validators.required, Validators.minLength(5), Validators.maxLength(1000)]],
			image: ["", []],
			sort_order: [data ? data.sort_order: "", [Validators.required, Validators.pattern('^([0-9])+$')]],
			start_date: [
				data && data.start_date
					? {
							day: +start_date[2],
							month: +start_date[1],
							year: +start_date[0]
					  }
					: null,
				[]
			],
			end_date: [
				data && data.end_date
					? {
							day: +end_date[2],
							month: +end_date[1],
							year: +end_date[0]
					  }
					: null,
				[]
			]
		});

		return form;
	}

	listing(type, parent = null, campaign = null) {
		if (campaign) {
			return this.geoService.getGeography(type, parent, campaign);
		} else {
			return this.geoService.getGeography(type, parent);
		}
	}

	loadingFieldData(data, records) {
		if (data.name === 'National Zone') {
			this.nationalZonesData = records.data;
		}
		if (data.name === 'Zone') {
			this.zonesData = records.data;
		}
		if (data.name === 'Region') {
			this.regionsData = records.data;
		}
		if (data.name === 'Area') {
			this.areaData = records.data;
		}
		if (data.name === 'City') {
			this.cityData = records.data;
		}
	}

	getParent(fieldType: string) {
		if (fieldType === 'National Zone') {
			return this.courseForm.controls.national_zone.value;
		} else if (fieldType === 'Zone') {
			return this.courseForm.controls.zone.value;
		} else if (fieldType === 'Region') {
			return this.courseForm.controls.region.value;
		} else if (fieldType === 'Area') {
			return this.courseForm.controls.area.value;
		} else if (fieldType === 'City') {
			return this.courseForm.controls.city.value;
		} else {
			return null;
		}
	}

	initializeFields(fields) {
		const fieldCount = fields.length;
		let parent_id = null;

		for (let i = 0; i < fieldCount; i++) {
			if (i > 0) {
				const parentNode = this.getParent(fields[i - 1].name);
				if (parentNode.length) {
					if (parentNode[0]) {
						parent_id = parentNode[0].id;
					}
				}
			}

			this.listing(fields[i].id, parent_id, this.campaign_id).subscribe((records: any) => {
				this.loadingFieldData(fields[i], records);
			});
		}
	}

	updateValue(event, elem) {
		const currIndex = this.typesData.findIndex(obj => obj.name === elem);

		if (currIndex >= 0) {
			const nextData = this.typesData[currIndex + 1];

			this.listing(nextData.id, event.id, this.campaign_id).subscribe((records: any) => {
				this.loadingFieldData(nextData, records);
			});
		}
	}

	removeValue(event, elem) {
		this.resetHeirarchyFor(elem);
	}

	imageChange(files: FileList) {
		this.image = files.length ? files.item(0) : null;
	}

	onSubmit() {
		this.submitted = true;
		if (this.courseForm.invalid) {
			return;
		}

		const data = this.courseForm.value;
		const formData = new FormData();
		
		this.geoService.getCampaignDataById(this.campaign_id).subscribe(result => {
			formData.set('campaign_id', this.campaign_id);
			formData.set('name', data.name);
			if(data.description){
				formData.set('description', data.description);
			}
			
			if (this.image) {
				formData.set('image', this.image, this.image.name);
			}
			
			if(data.start_date) {	
				var start_day ;			
				if(data.start_date['day'] < 10) {
					start_day = "0"+data.start_date['day'];
				}else{
					start_day = data.start_date['day'];
				}

				const start_date = start_day+"-"+data.start_date['month']+"-"+data.start_date['year'];
				formData.set('start_date', start_date);
			}

			if(data.end_date) {		
				var end_day ;		
				if(data.end_date['day'] < 10) {
					end_day = "0"+data.end_date['day'];
				}else{
					end_day = data.end_date['day'];
				}
				
				const end_date = end_day+"-"+data.end_date['month']+"-"+data.end_date['year'];
				formData.set('end_date', end_date);
			}

			if(this.courseForm.value.group_id) {
				formData.set('group_id', this.courseForm.value.group_id[0]['id']);
			}

			formData.set('sort_order', data.sort_order);
	
			const typeIndex = this.typesData.findIndex(obj => obj.name === data.type[0].name);
	
			if (typeIndex > 0) {
				const parentType = this.typesData[typeIndex - 1];
				const parentObj = this.getParent(parentType.name);
	
				formData.set('parent_id', parentObj[0].id);
			}
	
			if (this.urlKey === 'add') {
				this.save(formData);
			} else {
				this.update(formData);
			}

		});


	}

	private save(formData) {
		this.courseService.save(formData).subscribe(
			(response: any) => {
				this.router.navigate(['/course'], { queryParams : { campaign_id: this.campaign_id } } ).then(() => {
					this.toasterService.success('Records Added Successfully!', 'Success!', { positionClass: 'toast-top-right' });
				});
			},
			(err: HttpErrorResponse) => {
				this.handleError(err, this.courseForm);
			}
		);
	}

	private update(formData) {
		this.courseService.update(formData, this.course_id).subscribe(
			(response: any) => {
				this.router.navigate(['/course'], { queryParams : { campaign_id: this.campaign_id } } ).then(() => {
					this.toasterService.success('Records Updated Successfully!', 'Success!', { positionClass: 'toast-top-right' });
				});
			},
			(err: HttpErrorResponse) => {
				this.handleError(err, this.courseForm);
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

	get geography() {
		return this.courseForm;
	}

	elementTouched(element) {
		element.markAsTouched();
	}

	changeCampaign(campaign) {
		this.cs.setCampaignId(campaign.id);
	}
}
