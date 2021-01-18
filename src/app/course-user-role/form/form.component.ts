import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { SectionService } from '../../services/section.service';

import { concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import 'rxjs/add/observable/of';
import { CustomizeObject } from '../../shared/classes/cutomizeObject';
import { CampaignService } from 'src/app/services/campaign.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CourseService } from 'src/app/services/course.service';
import { GroupService } from 'src/app/services/group.service';


@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
	campaign_id = '';
	title: string;
	section_id = ''
	description = '';
	courseUserRoleForm: FormGroup;
	buildForm: boolean;
	dropdownSettings: {};
	color1 = '#ffffff';
	currentLogo: string;
	course_id:string;
	group_id: string;
	public Editor = ClassicEditor;
	usersData: any;
	
	formData = new FormData();
	submitted = false;
	error_messages: any = [];
	
	dropdownSettingsSingle: {};
	constructor(
		private sectionService: SectionService,
		private activeRoute: ActivatedRoute,
		private router: Router,
		private fb: FormBuilder,
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
	
	getCurrentCourse() {
		return this.courseService.getCourseId();
	}

	ngOnInit() {
		
		this.campaign_id = this.getCurrentCampaign();
		this.course_id = this.getCurrentCourse();
		
		let group_id;



		this.courseService.getCourseById(this.course_id).subscribe(result => {
			group_id = result['data'][0]['group_id'];
			this.group_id = group_id;
			this.usersData = this.groupService.getUserFromGroup(this.group_id);
		});
		
		this.buildForm = false;
		this.title = this.activeRoute.snapshot.data['title'];
		this.dropdownSettings = CustomizeObject.dropDownSettings(true, true);

		this.activeRoute.params
			.pipe(
				concatMap((params: Params): any => {
					if (params.id) {
						
						return this.sectionService.getAll({
							id: params.id
						});
					}
					return of({ data: [] });
				})
			)
			.subscribe((result: any) => {
				if (result.data[0] && this.activeRoute.snapshot.data['urlKey'] === 'edit') {

					this.section_id = result.data[0].id;
					this.course_id = result.data[0].course_id;
					this.courseUserRoleForm = this.create_form(result.data[0]);
				}

				if (this.activeRoute.snapshot.data['urlKey'] === 'add') {
					this.activeRoute.queryParams.subscribe(params => {
						this.course_id = params['course_id'];
					  });
					  this.courseUserRoleForm = this.create_form();
				}
			});

	}

	create_form(data?: Section): FormGroup {
		this.dropdownSettingsSingle = CustomizeObject.dropDownSettings(true, true, 'id', 'first_name');
		this.dropdownSettings = CustomizeObject.dropDownSettings();
		const form: FormGroup = this.fb.group({
			// title: [data ? data.title : '', [Validators.required, Validators.pattern('^([a-zA-Z0-9 _-])+$'), Validators.minLength(3), Validators.maxLength(100)]]
			user_id: ["", []]
		});

		this.buildForm = true;
		return form;
	}


	onSubmit() {
		
		this.submitted = true;
		if (this.courseUserRoleForm.invalid) {
			return;
		}

		this.formData = this.sectionService.convertToFormData(this.courseUserRoleForm.value);


		this.formData.set('course_id',this.course_id);
		
		!this.section_id ? this.save() : this.update();
	}

	private save() {
		this.sectionService.save(this.formData).subscribe(
			(response: any) => {
				this.router.navigate(['/section'], { queryParams : { course_id:this.course_id,campaign_id: this.campaign_id } } ).then(() => {
					this.toasterService.success('Records Added Successfully!', 'Success!', { positionClass: 'toast-top-right' });
				});
			},
			(err: HttpErrorResponse) => {
				this.handleError(err, this.courseUserRoleForm);
			}
		);
	}

	private update() {
		
		this.sectionService.update(this.formData, this.section_id).subscribe(
			(response: any) => {
				this.router.navigate(['/section'], { queryParams : { course_id:this.course_id,campaign_id: this.campaign_id } } ).then(() => {
					this.toasterService.success('Records Updated Successfully!', 'Success!', { positionClass: 'toast-top-right' });
				});
			},
			(err: HttpErrorResponse) => {
				this.handleError(err, this.courseUserRoleForm);
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
		this.section.get('username').patchValue(random);
	}

	

	colorChanged(color) {
		this.settings.controls[0].get('color').patchValue(color);
	}

	get settings(): FormArray {
		return this.courseUserRoleForm.get('settings') as FormArray;
	}

	get section(): FormGroup {
		return this.courseUserRoleForm;
	}

	
	elementTouched(element) {
		element.markAsTouched();
	}
}
