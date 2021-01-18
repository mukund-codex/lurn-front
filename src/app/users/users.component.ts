import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';

import { concatMap, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import 'rxjs/add/observable/merge';

import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CustomizeObject } from '../shared/classes/cutomizeObject';
import { UsersService } from '../services/users.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CampaignService } from '../services/campaign.service';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit, OnDestroy {
	title: string;
	records: any;
	errors: any = [];
	private subscription = new Subscription();
	@ViewChild('searchForm', {static : false}) sf: NgForm;
	campaign_id: string;

	parameters: {} = {};
	searchObj: {} = {};
	uploadFields: any = [];
	uploadedFile: any = [];
	showExport: Boolean = false;
	showDelete: Boolean = false;
	showMultiDelete: Boolean = false;
	showAdd: Boolean = false;
	showEdit: Boolean = false;
	geographyData: any;
	SelectedIDs : any = [];
	
	constructor(
		private router: Router,
		private activeRoute: ActivatedRoute,
		private userService: UsersService,
		private toasterService: ToastrService,
		private cs: CampaignService
	) {}

	getCurrentCampaign() {
		return this.cs.getCampaignId();
	}

	ngOnInit() {
		this.title = this.activeRoute.snapshot.data['title'];
		this.campaign_id = this.getCurrentCampaign();
		if(this.campaign_id) {
			this.parameters['campaign'] = this.campaign_id;
		}

		this.userService.getAll({ 'id' : this.campaign_id }, 'campaign').subscribe(campaignData => {
			if(campaignData['data']) {
				const geographyData = campaignData['data'][0].geo_master;
				this.geographyData = geographyData;
			}
		});

		const permissionSet = this.userService.checkPermissionExist(['export-user', 'remove-user', 'remove-all-user', 'create-user', 'modify-user']);
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
			this.records = result;
			this.uploadFields = result['fields'];
		});
	}

	// Listener
	fileChange(file) {
		this.uploadedFile = file; // Handle Event Emitter
	}

	closePopup(response) {
		alert(response.data ? response.data.count : 0 + ' Records Uploaded Successfully!');
		this.sf.form.updateValueAndValidity();
	}

	upload(file) {
		const uploadData = new FormData();
		uploadData.set('upload_file', file, file.name);
		this.userService.upload(uploadData).subscribe(
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

	loadData(Obj) {
		if(this.campaign_id) {
			Obj.campaign_id = this.campaign_id;
		}
		return this.userService.getAll(Obj);
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

	pageChange(pageNumber) {
		this.router.navigate([], {
			relativeTo: this.activeRoute,
			queryParams: { page: pageNumber, campaign_id: this.campaign_id }
		});
	}

	export() {
		this.searchObj['campaign_id'] = this.getCurrentCampaign();
		const curDate = this.userService.getCurrentDate();
		const fileName = 'Manpower-'+ curDate;
		this.userService.exportData(this.searchObj, fileName);
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

	delete(user_id) {
		
		const userData = new FormData();
		this.userService.delete(userData, user_id).subscribe(param => {
			this.toasterService.success('Record Deleted!', 'Success!', {
				positionClass: 'toast-top-right'
			});
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
		this.userService.delete_all(params).subscribe(param => {
			this.toasterService.success(param['data'] + ' Records Deleted Successfully!', 'Success!', { positionClass: 'toast-top-right' });
			this.sf.form.updateValueAndValidity();
		},
		(err: HttpErrorResponse) => {
			this.handleError(err);
		});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	changeCampaign(campaign) {
		this.cs.setCampaignId(campaign.id);
		this.campaign_id = this.getCurrentCampaign();
		this.parameters['campaign_id'] = this.campaign_id;
		this.router.navigate(['manpower/users'], { queryParams : { campaign_id: campaign.id } });
		this.sf.form.updateValueAndValidity();
	}
}
