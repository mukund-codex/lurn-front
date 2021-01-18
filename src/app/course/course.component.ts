import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../app/services/course.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import { concatMap, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import 'rxjs/add/observable/merge';
import { ToastrService } from 'ngx-toastr';
import { CustomizeObject } from '../shared/classes/cutomizeObject';
import { CampaignService } from '../services/campaign.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

	campaignData: any;
	courseData: any;
	public isCollapsed = true;
	private subscription = new Subscription();
	campaign_id : any;
	company_id: any;
	company_name: string;
	course_name: string;
	course_description: string;
	course_image: string;
	searchObj: {} = {};
	parameters: any;
	showExport: Boolean = false;
	showDelete: Boolean = false;
	showEdit: Boolean = false;
	companyData: any;
	dropdownSettingsCompany: {};
	course_id: any;
	showCompanyFilter = true;
	showCampaignFilter = true;
	errors: any = [];
	uploadFields: any = [];
	uploadedFile: any = [];

	constructor(
		private activeRoute: ActivatedRoute,
		private router: Router,
		private courseService: CourseService,
		private toasterService: ToastrService,
		private cs: CampaignService
	) {}

	ngOnInit() {
		this.activeRoute.queryParams.subscribe(param => {
			const listObj = Object.assign(this.searchObj, param);
			this.courseData = this.courseService.getAll(listObj);
			this.parameters = param;
		});
		this.dropdownSettingsCompany = CustomizeObject.dropDownSettings(true);
		const permissionSet = this.courseService.checkPermissionExist(['export-course', 'remove-course', 'create-course', 'upload-course', 'modify-course']);
		this.showExport = permissionSet[0];
		this.showDelete = permissionSet[1];
		this.showCompanyFilter = permissionSet[2];
		this.showCampaignFilter = permissionSet[3];
		this.showEdit = permissionSet[4];

		if(this.showCompanyFilter) {
			this.companyData = this.courseService.getCompanies();
		}

		if(this.showCampaignFilter) {
			this.campaignData = this.courseService.getCampaigns(this.company_id);
		}

		this.campaign_id = this.getCurrentCampaign();
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
		).subscribe(result => {
			
			this.uploadFields = result['fields'];
		});
	}
	loadData(Obj) {
		
		if (this.campaign_id) {
			Obj.campaign_id = this.campaign_id;
		}
		return this.courseService.getAll(Obj);
	}
	getCurrentCampaign() {
		return this.cs.getCampaignId();
	}

	search() {
		const course_id: {} = this.course_id ? (this.course_id[0] ? { course_id: this.course_id[0].id } : {}) : {};
		const course_name: {} = this.course_name ? { course_name: this.course_name } : {};
		// const campaign_code: {} = this.campaign_code ? { cid: this.campaign_code } : {};

		this.searchObj = Object.assign(course_id, course_name, this.parameters);
		this.courseData = this.courseService.getAll(this.searchObj);
	}

	add() {
		
		this.router.navigate(['course/add']);
	}

	copyInputMessage(campaign_code) {
		const selBox = document.createElement('textarea');
		selBox.style.position = 'fixed';
		selBox.style.left = '0';
		selBox.style.top = '0';
		selBox.style.opacity = '0';
		selBox.value = campaign_code;
		document.body.appendChild(selBox);
		selBox.focus();
		selBox.select();
		document.execCommand('copy');
		document.body.removeChild(selBox);
	}

	pageChange(pageNumber) {
		this.router.navigate([], {
			relativeTo: this.activeRoute,
			queryParams: { page: pageNumber },
			queryParamsHandling: 'merge'
		});
	}

	edit(course_id) {
		this.router.navigate(['course/edit/' + course_id]);
	}

	section(course_id){
		this.router.navigate(['section?course_id=' + course_id+"&campaign_id="+this.campaign_id]);
	}

	delete(course_id) {
		const courseData = new FormData();
		this.courseService.delete(courseData, course_id).subscribe(result => {
			if(result["success"]){
				this.toasterService.success('Record Deleted!', 'Success!', {
					positionClass: 'toast-top-right'
				});
			}else{
				this.toasterService.error(result["message"], 'Failed!', {
					positionClass: 'toast-top-right'
				});
			}
			this.search();
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
			alert('Problems while deleting records!');
		}
	}

	export() {

		const curDate = this.courseService.getCurrentDate();
		const fileName = 'Course-'+ curDate;
		this.courseService.exportData(this.searchObj, fileName);
	}

	 courseDashboard(course_id) {
	 	this.router.navigate(['/course-dashboard'],  { queryParams: {campaign_id : this.campaign_id,course_id:course_id} });
	 }

	fileChange(file) {
		this.uploadedFile = file; // Handle Event Emitter
	}

	upload(file) {
		const uploadData = new FormData();
		uploadData.set('upload_file', file, file.name);
		this.courseService.upload(uploadData).subscribe(
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
		// this.sf.form.updateValueAndValidity();
		this.search();
	}

	changeCampaign(campaign) {
		this.cs.setCampaignId(campaign.id);
		this.campaign_id = this.getCurrentCampaign();
		this.parameters['campaign_id'] = campaign.id;
		this.router.navigate(['geography'], { queryParams : { campaign_id: campaign.id } });
		// this.sf.form.updateValueAndValidity();
		this.search();
	}

}
