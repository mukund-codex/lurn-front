import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';
import { SectionService } from '../services/section.service';

import { concatMap, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import 'rxjs/add/observable/merge';

import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CustomizeObject } from '../shared/classes/cutomizeObject';
import { HttpErrorResponse } from '@angular/common/http';
import { CampaignService } from '../services/campaign.service';
import { CourseService } from '../services/course.service';
import { DomSanitizer } from '@angular/platform-browser';
import { GroupService } from '../services/group.service';
import { CourseUserRoleService } from '../services/course-user-role.service';

@Component({
	selector: 'app-section',
	templateUrl: './course-user-role.component.html',
	styleUrls: ['./course-user-role.component.css']
})
export class CourseUserRoleComponent implements OnInit, AfterViewInit {
	title: string;
	records: any;
	errors: any = [];
	course_id:any;
	private subscription = new Subscription();
	uploadFields: any = [];
	@ViewChild('searchForm') sf: NgForm;
	@ViewChild('isCollapsed') isCollapsed: Boolean;
	uploadedFile: any = [];
	campaign_id: string;
	showExport: Boolean = false;
	showDelete: Boolean = false;
	showMultiDelete: Boolean = false;
	showAdd: Boolean = false;
	showEdit: Boolean = false;
	sectionData : any = [];
	usersData: any = [];
	parameters: {} = {};
	searchObj: {} = {};
	SelectedIDs : any = [];

	constructor(
		private router: Router,
		private activeRoute: ActivatedRoute,
		private sectionService: SectionService,
		private toasterService: ToastrService,
		private cs: CampaignService,
		private courseService: CourseService,
		private sanitizer: DomSanitizer,
		private groupService: GroupService,
		private courseUserRoleService: CourseUserRoleService
	) {
	}

	getCurrentCampaign() {
		return this.cs.getCampaignId();
	}

	getCurrentCourse() {
		return this.courseService.getCourseId();
	}

	ngOnInit() {
		
		this.title = this.activeRoute.snapshot.data['title'];
		this.campaign_id = this.getCurrentCampaign();
		this.course_id = this.getCurrentCourse();

		// const courseData = this.courseService.getCourseById(this.course_id);
		
		// this.usersData = this.groupService.getUserFromGroup(this.course_id);

		this.sectionService.getAll({ }, 'section').subscribe(campaignData => {
			if(campaignData['data']) {
				
				const sectionData = campaignData;
				
				this.sectionData = sectionData;
			}
		});

		if(this.campaign_id) {
			this.parameters['campaign_id'] = this.campaign_id;
		}

		const permissionSet = this.courseUserRoleService.checkPermissionExist(['export-course-user-role', 'remove-course-user-role', 'remove-course-user-role', 'creates-course-user-role', 'modifys-course-user-role']);
		this.showExport = permissionSet[0];
		this.showDelete = permissionSet[1];
		this.showMultiDelete = permissionSet[2];
		this.showAdd = permissionSet[3];
		this.showEdit = permissionSet[4];
	}

	ngAfterViewInit() {
		this.subscription = Observable.merge(
			this.activeRoute.queryParams.pipe(
				map(qParams => {
					this.parameters = CustomizeObject.merge({}, this.parameters, qParams);
					return this.parameters;
				}),
				concatMap(nParam => this.loadData(nParam))
			),
			this.search()
		).subscribe(result => {
			
			result['data'].forEach((element, key) => {
				let str = this.sanitizer.bypassSecurityTrustHtml(element.description);
				result['data'][key].newStr = str;
			});

			this.records = result;
			this.uploadFields = result['fields'];
		});
	}

	loadData(Obj) {
		
		if(this.campaign_id) {
			Obj.campaign_id = this.campaign_id;
		}
		
		return this.courseUserRoleService.getAll(Obj);
		
	}

	openUrl(section_id,type){
		
		this.router.navigate(['/'+type], { queryParams : { section_id: section_id,course_id:this.course_id,campaign_id:this.campaign_id } } )
			
	}

	// Listener
	fileChange(file) {
		this.uploadedFile = file; // Handle Event Emitter
	}

	delete(section_id) {
		
		const sectionData = new FormData();
		this.courseUserRoleService.delete(sectionData,section_id).subscribe(param => {
			if(param["success"]){
				this.toasterService.success('Record Deleted!', 'Success!', {
					positionClass: 'toast-top-right'
				});
			}else{
				this.toasterService.error(param["message"], 'Failed!', {
					positionClass: 'toast-top-right'
				});
			}
				this.sf.form.updateValueAndValidity();
			},
			(err: HttpErrorResponse) => {
				this.handleError(err);
			}
		);
	}

	checkAll(event) {
		const checked = event.target.checked;
		this.records['data'].forEach((item, i) => {
			item.selected = checked;
			this.selectID(item['id'], checked);
		});
	}

	/* Checkbox Check */
	selectID(id, event:any) {

		let checked : Boolean;
		if(typeof event === 'boolean') {
			checked = event;	
		} else {
			checked = event.target.checked;
		}

		checked ? this.SelectedIDs.push(id) : this.SelectedIDs.pop(id);
	}

	/* Deleting No Records */
	invalidSelection() {
		alert("Please Select atleast one record!");
	}

	/* Deleting Selected Records */
	deleteSelected() {
		const params = {id: this.SelectedIDs};

		this.courseUserRoleService.delete_all(params).subscribe(param => {
			this.toasterService.success(param['data'] + ' Records Deleted Successfully!', 'Success!', { positionClass: 'toast-top-right' });
			this.sf.form.updateValueAndValidity();
		},
		(err: HttpErrorResponse) => {
			this.handleError(err);
		});
	}

	handleError(err: HttpErrorResponse) {
		if (err.status === 400) {
			this.toasterService.error(err.error.message, 'Error!', {
				positionClass: 'toast-top-right'
			});
		} else {
			this.toasterService.error(err.error.message, 'Problems while deleting records!', {
				positionClass: 'toast-top-right'
			});
			// alert('Problems while deleting records!');
		}
	}

	search(Obj = {}) {
		return this.sf.valueChanges.pipe(
			debounceTime(400),
			distinctUntilChanged(),
			map(valueObj => {
				this.searchObj = CustomizeObject.removeNullKeys(valueObj);
				this.parameters = CustomizeObject.merge({}, this.parameters, this.searchObj, Obj);

				return this.parameters;
			}),
			switchMap(filterObj => this.loadData(filterObj))
		);
	}

	pageChange(pageNumber) {
		this.router.navigate([], {
			relativeTo: this.activeRoute,
			queryParams: { page: pageNumber, campaign_id: this.campaign_id,course_id:this.course_id }
		});
	}

	upload(file) {
		const uploadData = new FormData();
		uploadData.set('upload_file', file, file.name);
		this.courseUserRoleService.upload(uploadData).subscribe(
			(responseData: any) => this.closePopup(responseData),
			(err: HttpErrorResponse) => this.controlError(err)
		);
	}

	controlError(err) {
		if (err.status === 400) {
			for (const field of Object.keys(err.error.error)) {
				const errorData = err.error.error[field];
				this.errors.push(errorData);
			}
			alert(err.error.error.upload_file);
		}
	}

	closePopup(response) {
		this.toasterService.success(response.data.count + ' Records Uploaded Successfully!', 'Success!', { positionClass: 'toast-top-right' });
		// alert(response.data.count + ' Records Uploaded Successfully!');
		this.sf.form.updateValueAndValidity();
	}

	export() {

		this.searchObj['campaign_id'] = this.getCurrentCampaign();
		this.searchObj['course_id'] = this.course_id;
		const curDate = this.courseUserRoleService.getCurrentDate();
		const fileName = 'Course-User-Roles-'+ curDate;
		this.courseUserRoleService.exportData(this.searchObj, fileName);
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	changeCourse(course) {
		this.courseService.setCourseId(course.id);
		this.campaign_id = this.getCurrentCampaign();
		this.parameters['course_id'] = course.id;
		this.router.navigate(['section'], { queryParams : { course_id:course.id,campaign_id: this.campaign_id } });
		this.sf.form.updateValueAndValidity();
	}
	
}
