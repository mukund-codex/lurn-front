import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import 'rxjs/add/observable/of';
import { CustomizeObject } from '../../shared/classes/cutomizeObject';
import { CampaignService } from 'src/app/services/campaign.service';
import { QuizService } from 'src/app/services/quiz.service';
import { CourseService } from 'src/app/services/course.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { SectionService } from 'src/app/services/section.service';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
	
	campaign_id = '';
	course_id = '';
	title: string;
	
	quiz_id : '';
	section_id = ''
	description = '';
	type = '';
	quizForm: FormGroup;
	buildForm: boolean;
	dropdownSettings: {};
	color1 = '#ffffff';
	currentLogo: string;
	mediaFile: File = null;
	video_type : string = '';
	content :string = '' ;
	disabled: boolean = false;
	icon: any;
	previouslySelectedIcon: string;
	urlKey : any;
	quizData : any;
	public Editor = ClassicEditor;
	

	formData = new FormData();
	submitted = false;
	error_messages: any = [];
	
	is_show_duration:boolean = false;
	is_show_reattempt:boolean=false;
	
	sectionData: any;
	

	constructor(
		
		private activeRoute: ActivatedRoute,
		private router: Router,
		private fb: FormBuilder,
		public toasterService: ToastrService,
		private cs: CampaignService,
		private quizService: QuizService,
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
		this.dropdownSettings = CustomizeObject.dropDownSettings(true, true);
		this.sectionData = this.sectionService.getSectionData(this.course_id, this.campaign_id);
		
		const page = this.activeRoute.snapshot.data;
		this.title = page['title'];
		this.urlKey = page['urlKey'];
		this.disabled = page['urlKey'] === 'edit' ? false : false;

		if (this.urlKey === 'add') {
			this.activeRoute.queryParams.subscribe(params => {
				this.section_id = params['section_id'];
			  });
			  
			
			this.quizForm = this.create_form();

			this.quizForm.get("time_limit").valueChanges.subscribe(x => {
				if(x == "true"){this.is_show_duration = true ; }
				else{this.is_show_duration = false ; }
				
			 });
	
			 this.quizForm.get("reattempt").valueChanges.subscribe(x => {
				if(x == "true"){this.is_show_reattempt = true ; }
				else{this.is_show_reattempt = false ; }
				
			 });

			this.buildForm = true;
		} else {
			
			this.activeRoute.params.pipe(concatMap((params: Params) => this.quizService.getAll({ id: params.id }))).subscribe((result: any) => {
				if (result.data && result.data[0]) {
					this.quizData = result.data[0];
					this.quiz_id = result.data[0].id;
					//this.section_id = result.data[0].section_id;
					this.quizForm = this.create_form(this.quizData);
					this.buildForm = true;
				} else {
					this.buildForm = true;
				}
				
				this.quizForm.get("time_limit").valueChanges.subscribe(x => {
					if(x == "true"){this.is_show_duration = true ; }
					else{this.is_show_duration = false ; }
					
				 });
		
				 this.quizForm.get("reattempt").valueChanges.subscribe(x => {
					if(x == "true"){this.is_show_reattempt = true ; }
					else{this.is_show_reattempt = false ; }
					
				 });

			});
		}

		
	}
		

	create_form(data?: any): FormGroup {
		if(data) {
			if(data.time_limit == true) {
				this.is_show_duration = true;
			}
			if(data.reattempt == true) {
				this.is_show_reattempt = true;
			}
			if(data.icon) {
				this.previouslySelectedIcon = data.icon;	
			}
		}
		const form: FormGroup = this.fb.group({
			section: [data ? [{id:data.section_id, name:data.section_name}] : '',[Validators.required]],
			title: [data ? data.title : '', [Validators.required, Validators.pattern('^([a-zA-Z0-9 _-])+$'), Validators.minLength(3), Validators.maxLength(100)]],
			version: [data ? data.version : '', [Validators.required, Validators.min(1), Validators.max(10)]],
			icon: ['', []],
			description: [data ? data.description : '', [Validators.required]],
			sort_order: [data ? data.sort_order : '', [Validators.required, Validators.min(1), Validators.max(100)]],
			start_date: [data ? data.start_date : '', [Validators.required]],
			end_date: [data ? data.end_date : '', [Validators.required]],
			time_limit: [data ? data.time_limit : '', [Validators.required]],
			duration: [data ? data.duration_in_seconds : '', [ Validators.min(1), Validators.max(864000)]],
			passing_marks: [data ? data.passing_marks : '', [Validators.required, Validators.min(1), Validators.max(1000)]],
			reattempt: [data ? data.reattempt : '', [Validators.required]],
			reattempt_count: [data ? data.reattempt_count : '', [Validators.max(10)]]

		});

		// this.buildForm = true;
		return form;
	}

	
	onSubmit() {
		
		this.submitted = true;
		if (this.quizForm.invalid) {
			return;
		}

		this.formData = this.quizService.convertToFormData(this.quizForm.value);

		if(this.quizForm.value.version){
			this.formData.set('version', this.quizForm.value.version);
		}

		if(this.icon){
			this.formData.set('icon', this.icon, this.icon.name);
		}else{
			this.formData.delete('icon');
		}
		const section_id = this.quizForm.value.section ? this.quizForm.value.section[0].id : "";
		this.section_id  = section_id;
		this.formData.set('section_id', section_id);

		if (this.formData.get('duration') == "" || this.formData.get('duration') == "null") {
			this.formData.delete('duration');
		}

		if (this.formData.get('reattempt_count') == "" || this.formData.get('reattempt_count') == "null") {
			this.formData.delete('reattempt_count');
		}

		!this.quiz_id ? this.save() : this.update();
	}

	iconChange(files: FileList) {
		this.icon = files.length ? files.item(0) : null;
	}

	private save() {
		
		this.quizService.save(this.formData).subscribe(
			(response: any) => {
				this.router.navigate(['/quiz'], { queryParams : { course_id:this.course_id,campaign_id: this.campaign_id, section_id : this.section_id} } ).then(() => {
					this.toasterService.success('Records Added Successfully!', 'Success!', { positionClass: 'toast-top-right' });
				});
			},
			(err: HttpErrorResponse) => {
				this.handleError(err, this.quizForm);
			}
		);
	}

	private update() {
		
		this.quizService.update(this.formData, this.quiz_id).subscribe(
			(response: any) => {
				this.router.navigate(['/quiz'], { queryParams : { course_id:this.course_id,campaign_id: this.campaign_id ,section_id : this.section_id} } ).then(() => {
					this.toasterService.success('Records Updated Successfully!', 'Success!', { positionClass: 'toast-top-right' });
				});
			},
			(err: HttpErrorResponse) => {
				this.handleError(err, this.quizForm);
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

	

	logoChange(files: FileList) {
		this.mediaFile = files.length ? files.item(0) : null;
	}

	colorChanged(color) {
		this.settings.controls[0].get('color').patchValue(color);
	}

	get settings(): FormArray {
		return this.quizForm.get('settings') as FormArray;
	}

	get quiz(): FormGroup {
		return this.quizForm;
	}

	
	elementTouched(element) {
		element.markAsTouched();
	}
}
