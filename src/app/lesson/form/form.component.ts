import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { LessonService } from '../../services/lesson.service';

import { concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import 'rxjs/add/observable/of';
import { CustomizeObject } from '../../shared/classes/cutomizeObject';
import { CampaignService } from 'src/app/services/campaign.service';
import { CourseService } from 'src/app/services/course.service';
import { SectionService } from 'src/app/services/section.service';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
	campaign_id = '';
	title: string;
	lesson_id = '';
	section_id = '';
	course_id = '';
	description = '';
	type = '';
	lessonForm: FormGroup;
	buildForm: boolean;
	dropdownSettings: {};
	color1 = '#ffffff';
	currentLogo: string;
	mediaFile: File = null;
	video_type : string = '';
	content :string = '' ;
	disabled: boolean = false;
	public Editor = ClassicEditor;
	formData = new FormData();
	submitted = false;
	error_messages: any = [];
	isEdit : boolean = false ;
	typesData: any = [{'id':'video','name':'video'},
					{'id':'pdf','name':'pdf'},
					{'id':'image','name':'image'},
					{'id':'article','name':'article'},
					{'id':'html','name':'html'}
					
				];
	videoTypeData : any = [{'id':'vimeo','name':'vimeo'},
							{'id':'youtube','name':'youtube'}];

	showField = {html: false,
		article:false,
		video:false,
		pdf:false,
		image:false};			
   
		sectionData: any;
		lessonData:any;
		dropdownSettingsSingle: {};
	constructor(
		private lessonService: LessonService,
		private activeRoute: ActivatedRoute,
		private router: Router,
		private fb: FormBuilder,
		public toasterService: ToastrService,
		private cs: CampaignService,
		private courseService:CourseService,
		private sectionService:SectionService
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

	getCurrentCourse() {
		return this.courseService.getCourseId();
	}

	ngOnInit() {
		
		this.campaign_id = this.getCurrentCampaign();
		this.course_id = this.getCurrentCourse();
		this.buildForm = false;
		this.title = this.activeRoute.snapshot.data['title'];
		

		this.sectionData = this.sectionService.getSectionData(this.course_id, this.campaign_id);
		
		this.activeRoute.params
			.pipe(
				concatMap((params: Params): any => {
					if (params.id) {
						
						return this.lessonService.getAll({
							id: params.id
						});
					}
					return of({ data: [] });
				})
			)
			.subscribe((result: any) => {
				if (result.data[0] && this.activeRoute.snapshot.data['urlKey'] === 'edit') {
					for (const field of Object.keys(this.showField)) {
					
						if(result.data[0].type == field){
							this.showField[field] = true;
						}else{
							this.showField[field] = false;
						}
					}

					this.lesson_id = result.data[0].id;
					this.lessonData = this.lessonService.getLesson(this.course_id, this.campaign_id, this.lesson_id);
					//this.section_id = result.data[0].section_id;
					this.lessonForm = this.create_form(result.data[0]);
						
					if(result.data[0].type == "video" && (result.data[0].video_type == "vimeo" || result.data[0].video_type == "youtube")){
						this.lessonForm.controls.video_type.setValue([{id:result.data[0].video_type,name:result.data[0].video_type}]);
						this.lessonForm.controls.video_link_id.setValue(result.data[0].media_url);
					}
					if(result.data[0].type == "article"){
						this.lessonForm.controls.article_link.setValue(result.data[0].article_link);
					}
					this.isEdit = true;
				}

				if (this.activeRoute.snapshot.data['urlKey'] === 'add') {
					this.lessonData = this.lessonService.getLesson(this.course_id, this.campaign_id, this.lesson_id);
					this.activeRoute.queryParams.subscribe(params => {
						this.section_id = params['section_id'];
					  });
					  
					this.lessonForm = this.create_form();
				}



				this.lessonForm.get("type").valueChanges.subscribe(x => {
					for (const field of Object.keys(this.showField)) {
						if(x[0]) {
							if(x[0].name == field){
								this.showField[field] = true;
								if(field === 'pdf' || field === 'image') {
									if(! this.isEdit ) {
										this.lessonForm.get('mediaFile').setValidators([]); //Validators.required
										this.lessonForm.get('mediaFile').updateValueAndValidity();
									}
								}else if(field === 'article') {
									if(! this.isEdit ) {
										this.lessonForm.get('article_link').setValidators([]); //Validators.required
										this.lessonForm.get('article_link').updateValueAndValidity();
									}
								}else if(field === 'html') {
									if(! this.isEdit ) {
										this.lessonForm.get('content').setValidators([]); //Validators.required
										this.lessonForm.get('content').updateValueAndValidity();
									}
								}else {
									this.lessonForm.get('mediaFile').setValidators([]);
									this.lessonForm.get('mediaFile').updateValueAndValidity();
									this.lessonForm.get('article_link').setValidators([]);
									this.lessonForm.get('article_link').updateValueAndValidity();
									this.lessonForm.get('content').setValidators([]);
									this.lessonForm.get('content').updateValueAndValidity();
								}
							}else{
								this.showField[field] = false;
								this.lessonForm.get('mediaFile').setValidators([]);
								this.lessonForm.get('mediaFile').updateValueAndValidity();
								this.lessonForm.get('article_link').setValidators([]);
								this.lessonForm.get('article_link').updateValueAndValidity();
								this.lessonForm.get('content').setValidators([]);
								this.lessonForm.get('content').updateValueAndValidity();
							}
						}						
					}
					
				 });

			});


			
	}

	create_form(data?: any): FormGroup {
		this.dropdownSettingsSingle = CustomizeObject.dropDownSettings(true, true);
		this.dropdownSettings = CustomizeObject.dropDownSettings();
		if(data) {
			if(data.media_url && (data.type == "image" || data.type == "video" || data.type == "pdf")) {
				if(data.video_type != "vimeo" && data.video_type != "youtube"){
				this.currentLogo = data.media_url;
				}
			}
		}
		const form: FormGroup = this.fb.group({
			
			section: [data ? [{id:data.section_id,name:data.section}] : '',[Validators.required]],
			title: [data ? data.title : '', [Validators.required, Validators.pattern('^([a-zA-Z0-9 _-])+$'), Validators.minLength(3), Validators.maxLength(50)]],
			mediaFile: [],
			type: [data ? [{id:data.type,name:data.type}] : '', [Validators.required]],
			description: [data ? data.description : '', [Validators.required]],
			content: [data ? data.content : '', []],
			video_type:[null , []],
			article_link:[null, []],
			video_link_id:[null, []],
			sort_order: [data ? data.sort_order : '', [Validators.required,Validators.pattern('^([0-9])+$')]],
			dependent:[data ? data.dependent : '', [Validators.required]],
			dependent_on:[data ? data.dependent_on : '', , []]
		});

	
		this.buildForm = true;
		return form;
	}
	
	

	/*setting_arr(data?: Lesson): FormGroup {
		return this.fb.group({
			sender_id: [data && data.settings ? data.settings.sender_id : '', [Validators.pattern('^[a-zA-Z]{6}$')]],
			pagination: [data && data.settings ? data.settings.pagination : '', [Validators.pattern('^([1-9]){1}([0-9]){0,2}$')]],
			color: [data && data.settings ? data.settings.color : '']
		});
	}*/

	onSubmit() {

		const section_id = this.lessonForm.value.section ? this.lessonForm.value.section[0].id : "";
		this.section_id  = section_id;

		this.submitted = true;
		if (this.lessonForm.invalid) {
			return;
		}

		this.formData = this.lessonService.convertToFormData(this.lessonForm.value);

		this.deleteKeysFromFormData([
			'dependent_on[id]',
			'dependent_on[name]',
			'mediaFile',
			'dependent_on'
		]);

		if(this.lessonForm.value.dependent) {
			this.formData.set('dependent', this.lessonForm.value.dependent);
		}

		if(this.lessonForm.value.dependent_on && this.lessonForm.value.dependent == 'true') {
			const dependentData = this.lessonForm.value.dependent_on;
			dependentData.forEach((element, i) => {
				this.formData.set("dependent_on["+i+"][id]", element.id);
			});
		}

		if (this.mediaFile) {
			this.formData.set('media_file', this.mediaFile, this.mediaFile.name);
		}

		if(this.isEdit && this.currentLogo) {
			this.formData.set('media_name', this.currentLogo);
		}
		
		if (this.formData.get('video_type') == "" || this.formData.get('video_type') == "null") {
			this.formData.delete('video_type');
		}

		
		if (this.formData.get('video_link_id') == "" || this.formData.get('video_link_id') == "null") {
			this.formData.delete('video_link_id');
		}

		if (this.formData.get('article_link') == "" || this.formData.get('article_link') == "null") {
			this.formData.delete('article_link');
		}
		
		if (this.formData.get('mediaFile') == "" || this.formData.get('mediaFile') == "null"){
			this.formData.delete('mediaFile');
		}
		
		if (this.formData.get('content') == "" || this.formData.get('content') == "null") {
			this.formData.delete('content');
		}

		!this.lesson_id ? this.save() : this.update();
	}

	private save() {
		
		this.lessonService.save(this.formData).subscribe(
			(response: any) => {
				this.router.navigate(['/lesson'], { queryParams : { section_id:this.section_id,campaign_id: this.campaign_id,course_id:this.course_id } } ).then(() => {
					this.toasterService.success('Records Added Successfully!', 'Success!', { positionClass: 'toast-top-right' });
				});
			},
			(err: HttpErrorResponse) => {
				this.handleError(err, this.lessonForm);
			}
		);
	}

	private update() {
		
		this.lessonService.update(this.formData, this.lesson_id).subscribe(
			(response: any) => {
				this.router.navigate(['/lesson'], { queryParams : { section_id:this.section_id,campaign_id: this.campaign_id,course_id:this.course_id } } ).then(() => {
					this.toasterService.success('Records Updated Successfully!', 'Success!', { positionClass: 'toast-top-right' });
				});
			},
			(err: HttpErrorResponse) => {
				this.handleError(err, this.lessonForm);
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
		this.lesson.get('username').patchValue(random);
	}

	logoChange(files: FileList) {
		this.mediaFile = files.length ? files.item(0) : null;
	}

	colorChanged(color) {
		this.settings.controls[0].get('color').patchValue(color);
	}

	get settings(): FormArray {
		return this.lessonForm.get('settings') as FormArray;
	}

	get lesson(): FormGroup {
		return this.lessonForm;
	}
	
	elementTouched(element) {
		element.markAsTouched();
	}

	private deleteKeysFromFormData(arr) {
		const that = this;
		arr.forEach(function(row, i) {
			that.formData.delete(row);
		});
	}
}
