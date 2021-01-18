import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';
import { QuizService } from '../services/quiz.service';

import { concatMap, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import 'rxjs/add/observable/merge';

import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CustomizeObject } from '../shared/classes/cutomizeObject';
import { HttpErrorResponse } from '@angular/common/http';
import { CampaignService } from '../services/campaign.service';
import { SectionService } from '../services/section.service';
import { CourseService } from '../services/course.service';
import { DomSanitizer } from '@angular/platform-browser';
import { param } from 'jquery';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit, AfterViewInit {

  title: string;
	records: any;
	errors: any = [];
	private subscription = new Subscription();
	uploadFields: any = [];
	@ViewChild('searchForm') sf: NgForm;
	@ViewChild('isCollapsed') isCollapsed: Boolean;
	uploadedFile: any = [];
	campaign_id: string;
	showExport: Boolean = false;
	showDelete: Boolean = true;
	showMultiDelete: Boolean = false;
	showAdd: Boolean = false;
	showEdit: Boolean = false;
	
	quizData : any;

	parameters: {} = {};
	searchObj: {} = {};
	SelectedIDs : any = [];
	section_id: any;
	course_id: string;
	sectionData: any;
	dropdownSettingsCompany: {};

	constructor(
		private router: Router,
		private activeRoute: ActivatedRoute,
		private quizService: QuizService,
		private toasterService: ToastrService,
		private cs: CampaignService,
		private ss:SectionService,
		private courseService:CourseService,
		private sanitizer: DomSanitizer
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
		
		
		this.dropdownSettingsCompany = CustomizeObject.dropDownSettings(true);
		this.sectionData = this.ss.getSectionData(this.course_id, this.campaign_id);

		this.activeRoute.queryParams.subscribe(params => {

			if(params.section_id) {
				this.ss.getAll({id: params.section_id}, 'section').subscribe(result => {
					this.section_id = [ {id: params['section_id'], name: result['data'][0].title } ];
					this.ss.setSectionId(this.section_id);
				});
			}
		  });


		this.quizService.getAll({ }, 'quiz').subscribe(campaignData => {
			if(campaignData['data']) {
			 const quizData = campaignData;
        	this.quizData = quizData;
			}
		});

		if(this.campaign_id) {
			this.parameters['campaign_id'] = this.campaign_id;
		}

		const permissionSet = this.quizService.checkPermissionExist(['export-quiz', 'remove-quiz', 'remove-all-quiz', 'create-quiz', 'modify-quiz']);
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


	searchSection(item: any) {
		this.subscription = Observable.merge(
			this.activeRoute.queryParams.pipe(
				map((qParams) => {
					let section_id;

					this.searchObj["section_id"] = item.id;
					this.parameters = CustomizeObject.merge({}, this.parameters, this.searchObj);
					return this.parameters;
				}),
				concatMap((nParam) => this.loadData(nParam))
			),
			this.search()
		).subscribe((result) => {
			this.records = result;
			this.uploadFields = result["fields"];
		});
	}
	
	loadData(Obj) {
		
		if(this.campaign_id) {
			Obj.campaign_id = this.campaign_id;
		}
		return this.quizService.getAll(Obj);

	}

	// Listener
	fileChange(file) {
		this.uploadedFile = file; // Handle Event Emitter
	}

	delete(quiz_id) {
		
		const quizData = new FormData();
		this.quizService.delete(quizData, quiz_id).subscribe(param => {
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

		this.quizService.delete_all(params).subscribe(param => {
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
			alert('Problems while deleting records!');
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
			queryParams: { page: pageNumber, campaign_id: this.campaign_id }
		});
	}

	upload(file) {
		const uploadData = new FormData();
		uploadData.set('upload_file', file, file.name);
		this.quizService.upload(uploadData).subscribe(
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
		const curDate = this.quizService.getCurrentDate();
		const fileName = 'Geography-'+ curDate;
		this.quizService.exportData(this.searchObj, fileName);
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	changeCampaign(campaign) {
		this.cs.setCampaignId(campaign.id);
		this.campaign_id = this.getCurrentCampaign();
		this.parameters['campaign_id'] = campaign.id;
		this.router.navigate(['quiz'], { queryParams : { section_id:this.section_id,campaign_id: campaign.id } });
		this.sf.form.updateValueAndValidity();
	}
}
