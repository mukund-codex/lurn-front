import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import 'rxjs/add/observable/of';
import { CustomizeObject } from '../../shared/classes/cutomizeObject';
import { CampaignService } from 'src/app/services/campaign.service';
import { QuizQuestionsService } from 'src/app/services/quiz-questions.service';
import { identifierModuleUrl, IfStmt } from '@angular/compiler';
import { CourseService } from 'src/app/services/course.service';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
	
	campaign_id = '';
	title: string;
	
	quiz_id : '';
	question_id : '';
	section_id = ''
	description = '';
	type = '';
	quizquestionForm: FormGroup;
	buildForm: boolean;
	dropdownSettings: {};
	
	currentLogo: string;
	mediaFile: File = null;
	video_type : string = '';
	course_id: any;
	disabled: boolean = false;
	image: any;
	quiz_image: any;
	urlKey : any;
	quizData : any;
	inputs: any;
	selectedImage: any;
	
	isEdit: boolean = false;
	formData = new FormData();
	submitted = false;
	error_messages: any = [];

	show_media_file:boolean=false;
	show_video_type:boolean=false;
	show_video_link:boolean=false;
	
	
		
	constructor(
		private activeRoute: ActivatedRoute,
		private router: Router,
		private fb: FormBuilder,
		public toasterService: ToastrService,
		private cs: CampaignService,
		private courseService: CourseService,
		private quizQuestionsService: QuizQuestionsService
	) {}

	
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

		this.campaign_id = this.getCurrentCampaign();
		const page = this.activeRoute.snapshot.data;
		this.title = page['title'];
		this.urlKey = page['urlKey'];
		this.disabled = page['urlKey'] === 'edit' ? false : false;
		this.dropdownSettings = CustomizeObject.dropDownSettings(true, true);

		this.quiz_id = this.activeRoute.queryParams['value']['quiz_id'];
		
		if (this.urlKey === 'add') {
			
			this.quizquestionForm = this.create_form();
			this.inputs = this.fb.array([]);
			this.quizquestionForm.addControl("inputs", this.inputs);
			this.inputs.push(this.createInputRow());
			this.onChanges();
			this.buildForm = true;
		} else {
			this.activeRoute.params.pipe(concatMap((params: Params) => this.quizQuestionsService.getAll({ id: params.id }))).subscribe((result: any) => {
				
				if (result.data && result.data[0]) {
					this.isEdit = true;
					const data = result.data[0];
					this.quizData = result.data[0];
					this.quiz_id = data.quiz_id;
					this.question_id = data.id;
					this.quizquestionForm = this.create_form(this.quizData);
					this.inputs = this.fb.array([]);
					this.quizquestionForm.addControl("inputs", this.inputs);
					data.answers.forEach(element => {
						this.inputs.push(this.createInputRow(element));	
					});
					this.onChanges();
					this.buildForm = true;
				} else {
					this.buildForm = true;
				}
			});
		}
	}

	create_form(data?: any): FormGroup {
		if(data) {
			if(data.media_link) {
				this.selectedImage = data.media_link;
				this.show_media_file = true;
			}
		}
		const form: FormGroup = this.fb.group({
			title: [data ? data.title : '', [Validators.required, Validators.maxLength(1000)]],
			media_file: [data ? data.media_file : '', !this.question_id ?  [Validators.required] : []],
			question_type: [data ? data.question_type : '', [Validators.required]],
			sort_order: [data ? data.sort_order : '', [Validators.required]],
			marks: [data ? data.marks : '', []],
			settings: [data ? data.settings : '', []],
			answers: [data ? data.answers : '', []],
			positive: [data ? data.marks.positive : '', [Validators.required]],
			negative: [data ? data.marks.negative : '', []],
			is_required: [data ? data.settings.is_required : '', [Validators.required]],
			input_answer_type: [data ? data.settings.input_answer_type : '', [Validators.required]],
			video_type: [data ? data.video_type: '', !this.question_id ?   [Validators.required] : []],
			video_link_id: [data? data.video_link_id: '', !this.question_id ?  [Validators.required]: []]

		});
		// this.buildForm = true;
		return form;
	}

	onChanges(result?: any): void {
		
		this.quizquestionForm.get('question_type').valueChanges.subscribe(val => {
			
			if (val === 'video') {
				this.show_media_file = true;
				this.show_video_link = true;
				this.show_video_type = true;

				this.quizquestionForm.get('media_file').setValidators([]);
				this.quizquestionForm.get('media_file').updateValueAndValidity();
				this.quizquestionForm.get('video_type').setValidators([]);
				this.quizquestionForm.get('video_type').updateValueAndValidity();
				this.quizquestionForm.get('video_link_id').setValidators([]);
				this.quizquestionForm.get('video_link_id').updateValueAndValidity();
				
			}else if (val === 'audio') {

				this.show_media_file = true;
				this.show_video_link = false;
				this.show_video_type = false;

				this.quizquestionForm.get('media_file').setValidators([Validators.required]);
				this.quizquestionForm.get('video_type').setValidators([]);
				this.quizquestionForm.get('video_type').updateValueAndValidity();
				this.quizquestionForm.get('video_link_id').setValidators([]);
				this.quizquestionForm.get('video_link_id').updateValueAndValidity();

			}else if (val === 'image') {

				this.show_media_file = true;
				this.show_video_link = false;
				this.show_video_type = false;

				this.quizquestionForm.get('media_file').setValidators([Validators.required]);
				this.quizquestionForm.get('video_type').setValidators([]);
				this.quizquestionForm.get('video_type').updateValueAndValidity();
				this.quizquestionForm.get('video_link_id').setValidators([]);
				this.quizquestionForm.get('video_link_id').updateValueAndValidity();
			}else {

				this.show_media_file = false;
				this.show_video_link = false;
				this.show_video_type = false;

				this.quizquestionForm.get('media_file').setValidators([]);
				this.quizquestionForm.get('media_file').updateValueAndValidity();
				this.quizquestionForm.get('video_type').setValidators([]);
				this.quizquestionForm.get('video_type').updateValueAndValidity();
				this.quizquestionForm.get('video_link_id').setValidators([]);
				this.quizquestionForm.get('video_link_id').updateValueAndValidity();
			}
			this.quizquestionForm.updateValueAndValidity();
				
		})

		const inputs = this.quizquestionForm.value.inputs;
		
		inputs.forEach((element, i) => {

			let formGroup = <FormGroup>this.inputs.controls[i];

			this.quizquestionForm.get('input_answer_type').valueChanges.subscribe(val => {
				
				if(val === 'video' || val === 'audio' || val === 'text'){
					this.quizquestionForm.removeControl('inputs');
					formGroup.get('type').setValidators([]);
					formGroup.get('type').updateValueAndValidity();
					formGroup.get('valid').setValidators([]);
					formGroup.get('valid').updateValueAndValidity();
					formGroup.get('value').setValidators([]);
					formGroup.get('value').updateValueAndValidity();
					formGroup.get('media_file').setValidators([]);
					formGroup.get('media_file').updateValueAndValidity();
					formGroup.get('video_type').setValidators([]);
					formGroup.get('video_type').updateValueAndValidity();
					formGroup.get('video_link_id').setValidators([]);
					formGroup.get('video_link_id').updateValueAndValidity();

					this.inputs.removeAt(i);
				}else {
					this.inputs = this.fb.array([]);
					this.inputs.push(this.createInputRow());
					this.quizquestionForm.addControl("inputs", this.inputs);
					
					formGroup.get('type').setValidators([Validators.required]);
					formGroup.get('type').updateValueAndValidity();
					formGroup.get('valid').setValidators([Validators.required]);
					formGroup.get('valid').updateValueAndValidity();
					formGroup.get('value').setValidators([Validators.required]);
					formGroup.get('value').updateValueAndValidity();
					formGroup.get('media_file').setValidators([]);
					formGroup.get('media_file').updateValueAndValidity();
					formGroup.get('video_type').setValidators([]);
					formGroup.get('video_type').updateValueAndValidity();
					formGroup.get('video_link_id').setValidators([]);
					formGroup.get('video_link_id').updateValueAndValidity();
				}

			});
			
			this.quizquestionForm.get('inputs')['controls'][i]['controls']['type'].valueChanges.subscribe(val => {
				
				if (val === 'video') {
					this.inputs = this.fb.array([]);
					this.inputs.push(this.createInputRow());

					// formGroup.get('video_type').setValidators([]);
					// formGroup.get('video_type').updateValueAndValidity();
					// formGroup.get('video_link_id').setValidators([]);
					// formGroup.get('video_link_id').updateValueAndValidity();
					formGroup.addControl("video_type", new FormControl("", []));
					formGroup.addControl("video_link_id", new FormControl("", []));
				}

			});

		});

	}

	clearFormArray = (formArray: FormArray) => {
		while (formArray.length !== 0) {
		  formArray.removeAt(0)
		}
	}

	createInputRow(row?: any): FormGroup {
		return this.fb.group({
			type: [row ? row.type: "", [Validators.required]],
			valid: [row ? row.valid: "false", [Validators.required]],
			value: [row ? row.value: "", [Validators.required]],
			media_file: [row ? row.media_file : "", []],
			video_type: [row ? row.video_type : "", []],
			video_link_id: [row ? row.video_link_id : "", []],
			answer_id: [row ? row.id : "", []]
		});
	}

	onAddInput(row?: any) {
		if(typeof row === 'boolean') {
			if(row === false) {
				this.clearFormArray(this.inputs);
			} else {
				// this.inputs.push(this.createInputRow());
				(<FormArray>this.quizquestionForm.get('inputs')).push(this.createInputRow());
				this.onChanges();
			}
		} else {
			// this.inputs.push(this.createInputRow(row));
			(<FormArray>this.quizquestionForm.get('inputs')).push(this.createInputRow());
		}
	}

	onRemoveInput(rowIndex: number) {
		this.inputs.removeAt(rowIndex);
	}

	onSubmit() {
		this.submitted = true;
		if (this.quizquestionForm.invalid) {
			return;
		}

		this.formData = this.quizQuestionsService.convertToFormData(this.quizquestionForm.value);
		
		this.deleteKeysFromFormData([
			'inputs[type]',
			'inputs[valid]',
			'inputs[value]',
			'answers',
			'marks',
			'settings',
			'positive',
			'negative',
			'image',
			'media_file',
			'is_required',
			'answers[id]',
			'answers[type]',
			'answers[valid]',
			'answers[value]',
			'answers[media_file]',
			'input_answer_type',
			'answers[video_type]',
			'answers[video_link_id]',
			'video_type',
			'video_link_id',
		]);

		const is_required = (this.quizquestionForm.value.is_required == "true") ? true : false; 

		if(this.image){
			this.formData.set("media_file", this.image);
		}

		if(this.isEdit && this.selectedImage) {
			this.formData.set('media_name', this.selectedImage);
		}
		
		this.formData.set("settings[is_required]", is_required.toString());

		this.formData.set("settings[input_answer_type]", this.quizquestionForm.value.input_answer_type);

		if(this.quizquestionForm.value.positive) {	
			this.formData.set("marks[positive]", this.quizquestionForm.value.positive);
		}
		
		if(this.quizquestionForm.value.negative) {	
			this.formData.set("marks[negative]", this.quizquestionForm.value.negative);
		}

		if(this.quizquestionForm.value.video_type){
			this.formData.set("video_type", this.quizquestionForm.value.video_type);
		}

		if(this.quizquestionForm.value.video_link_id){
			this.formData.set("video_link_id", this.quizquestionForm.value.video_link_id);
		}

		this.formData.set('quiz_id', this.quiz_id);

		const answers = this.quizquestionForm.value.inputs;
		
		if(answers){
			answers.forEach((element, i) => {
				console.log(element);
				if(element.answer_id !== '') {
					this.formData.set("answers["+i+"][id]", element.answer_id);
					this.formData.set("answers["+i+"][is_added]", 'false');
				}else {
					this.formData.set("answers["+i+"][is_added]", 'true');
				}
				this.formData.set("answers["+i+"][type]", element.type);
				this.formData.set("answers["+i+"][valid]", element.valid);
				this.formData.set("answers["+i+"][value]", element.value);
				if(this.quiz_image) {
					this.formData.set("answers["+i+"][media_file]", this.quiz_image, this.quiz_image.name);
				}
				if(element.video_type) {
					this.formData.set("answers["+i+"][video_type]", element.video_type);
				}
				if(element.video_link_id) {
					this.formData.set("answers["+i+"][video_link_id]", element.video_link_id);
				}
			});
		}
		
		!this.question_id ? this.save() : this.update();
	}

	imageChange(files: FileList) {
		this.image = files.length ? files.item(0) : null;
	}

	quizImageChange(files: FileList) {
		this.quiz_image = files.length ? files.item(0) : null;
	}

	private save() {
		
		this.quizQuestionsService.save(this.formData).subscribe(
			(response: any) => {
				this.router.navigate(['/quiz-questions/'], { queryParams : { campaign_id: this.campaign_id, quiz_id : this.quiz_id, course_id: this.getCurrentCourse() } } ).then(() => {
					this.toasterService.success('Records Added Successfully!', 'Success!', { positionClass: 'toast-top-right' });
				});
			},
			(err: HttpErrorResponse) => {
				this.handleError(err, this.quizquestionForm);
			}
		);
	}

	private update() {
		
		this.quizQuestionsService.update(this.formData, this.question_id).subscribe(
			(response: any) => {
				this.router.navigate(['/quiz-questions/'], { queryParams : { campaign_id: this.campaign_id, quiz_id: this.quiz_id, course_id: this.getCurrentCourse() } } ).then(() => {
					this.toasterService.success('Records Updated Successfully!', 'Success!', { positionClass: 'toast-top-right' });
				});
			},
			(err: HttpErrorResponse) => {
				this.handleError(err, this.quizquestionForm);
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
		return this.quizquestionForm.get('settings') as FormArray;
	}

	get lesson(): FormGroup {
		return this.quizquestionForm;
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
