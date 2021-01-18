import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../services/group.service';
import { CustomizeObject } from '../shared/classes/cutomizeObject';
import { Observable } from 'rxjs/Observable';
import { concatMap, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import 'rxjs/add/observable/merge';
import { forkJoin, of } from 'rxjs';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { CampaignService } from '../services/campaign.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-group',
	templateUrl: './group.component.html',
	styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit, AfterViewInit {
	title: string;
	groupData: any;
	public isCollapsed = true;
	company_name: string;
	subscription: Subscription;
	group_name: string;
	searchObj: {} = {};
	parameters: {} = {};
	campaign_id: string;
	message: {"text" : ""};
	group: string;
	@ViewChild('searchForm') sf: NgForm;
	uploadFields: any = [];
	uploadedFile: any = [];
	errors: any = [];
	showExport: Boolean = false;
	showDelete: Boolean = false;

	constructor(
		private activeRoute: ActivatedRoute,
		private router: Router,
		private groupService: GroupService,
		private cs: CampaignService,
		private toasterService: ToastrService
	) {}

	ngOnInit_() {
		this.activeRoute.params.subscribe(param => {
			const listObj = Object.assign(this.searchObj, param);
			this.groupData = this.groupService.getAll(listObj);
			this.parameters = param;
		});
	}

	getCurrentCampaign() {
		return this.cs.getCampaignId();
	}

	ngOnInit() {
		this.campaign_id = this.getCurrentCampaign();
		this.title = this.activeRoute.snapshot.data['title'];
		if(this.campaign_id) {
			this.parameters['campaign_id'] = this.campaign_id;
		}
		const permissionSet = this.groupService.checkPermissionExist(['export-group', 'remove-company']);
		this.showExport = permissionSet[0];
		this.showDelete = permissionSet[1];
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
			this.groupData = result;
			this.uploadFields = result['fields'];
		});
	}

	// Listener
	fileChange(file) {
		this.uploadedFile = file; // Handle Event Emitter
	}

	closePopup(response) {
		this.toasterService.success(response.data.count + ' Records Uploaded Successfully!', 'Success!', { positionClass: 'toast-top-right' });
		// alert(response.data.count + ' Records Uploaded Successfully!');
		this.sf.form.updateValueAndValidity();
	}

	upload(file) {
		const uploadData = new FormData();
		uploadData.set('upload_file', file, file.name);
		this.groupService.upload(uploadData).subscribe(
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

	add() {
		this.router.navigate(['group/add']);
	}

	pageChange(pageNumber) {
		this.router.navigate([], {
			relativeTo: this.activeRoute,
			queryParams: { page: pageNumber, campaign_id: this.campaign_id },
			queryParamsHandling: 'merge'
		});
	}

	edit(group_id) {
		this.router.navigate(['group/edit/' + group_id]);
	}

	delete(group_id) {

		const groupData = new FormData();
		this.groupService.delete(groupData, group_id).subscribe(param => {
			this.toasterService.success('Record Deleted!', 'Success!', {
				positionClass: 'toast-top-right'
			});
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

	export() {
		this.searchObj['campaign_id'] = this.getCurrentCampaign();
		const curDate = this.groupService.getCurrentDate();
		const fileName = 'Group-'+ curDate;
		this.groupService.exportData(this.searchObj, fileName);
	}

	loadData(Obj) {
		if(this.campaign_id) {
			Obj.campaign_id = this.campaign_id;
		}
		return this.groupService.getAll(Obj);
	}

	search() {
		return this.sf.valueChanges.pipe(
			debounceTime(400),
			distinctUntilChanged(),
			map(valueObj => {
				this.searchObj = CustomizeObject.removeNullKeys(valueObj);
				this.parameters = CustomizeObject.merge({}, this.parameters, this.searchObj);

				return this.parameters;
			}),
			switchMap(filterObj => this.loadData(filterObj))
		);
	}

	changeCampaign(campaign) {
		this.cs.setCampaignId(campaign.id);
		this.campaign_id = this.getCurrentCampaign();
		this.parameters['campaign_id'] = this.campaign_id;
		this.router.navigate(['group'], { queryParams : { campaign_id: campaign.id } });
		this.sf.form.updateValueAndValidity();
	}
}
