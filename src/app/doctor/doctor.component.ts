import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../services/doctor.service';
import { CustomizeObject } from '../shared/classes/cutomizeObject';
import { NgForm } from '@angular/forms';
import { CampaignService } from '../services/campaign.service';
import { Subscription, Observable, combineLatest } from 'rxjs'
import 'rxjs/add/observable/merge';
import { map, concatMap, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-doctor',
	templateUrl: './doctor.component.html',
	styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
	doctorData: any;
	errors: any = [];
	searchObj: {} = {};
	parameters: {} = {};
	camp_id: {};
	campData: any;
	formData:any = [];
	fields: any = [];
	fieldsData: [{}];
	noFormFound: Boolean = false;
	records: any;
	message: { "text": "" };
	campaign_id: string;
	@ViewChild('searchForm') sf: NgForm;
	@ViewChild('isCollapsed') isCollapsed: Boolean;
	uploadedFile: any = [];
	formHeaders: any;
	private subscription = new Subscription();
	uploadFields: any = [];
	showExport: Boolean = false;
	showDelete: Boolean = false;
	showMultiDelete: Boolean = false;
	SelectedIDs : any = [];

	constructor(
		private router: Router,
		private activeRoute: ActivatedRoute,
		private toasterService: ToastrService,
		private doctorService: DoctorService,
		private campaignService: CampaignService
	) { }

	ngOnInit() {
		this.campaign_id = this.campaignService.getCampaignId();
		if (this.campaign_id) {
			this.parameters['campaign'] = this.campaign_id;
		}
		const permissionSet = this.doctorService.checkPermissionExist(['export-doctor', 'remove-doctor', 'remove-all-doctor']);
		this.showExport = permissionSet[0];
		this.showDelete = permissionSet[1];
		this.showMultiDelete = permissionSet[2];
	}

	ngAfterViewInit() {
		this.loadDoctorsData();
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

	loadDoctorsData() {
		this.formData = [];
		this.campaignService.show(this.campaign_id).subscribe(result => {
			if(result['data'][0].form) {
				this.formHeaders = result['data'][0].form['form'];
				this.formHeaders.forEach((item,i)=> {
					this.formData.push({name : item.name, type: item.type});
				});
			} else {
				this.noFormFound = true;
			}
		});

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
			this.noFormFound = false;
		});
	}

	loadData(Obj) {
		if (this.campaign_id) {
			Obj.campaign_id = this.campaign_id;
		}
		return this.doctorService.getAll(Obj);
	}

	add() {
		const camp_id = this.camp_id[0].id;
		this.router.navigate(['doctor/add/' + camp_id]);
	}

	fileChange(file) {
		this.uploadedFile = file;
	}

	campChange() {
		this.parameters = {};
		this.router.navigate([], {
			relativeTo: this.activeRoute,
			queryParams: { page: 1 },
			queryParamsHandling: 'merge'
		});
	}

	changeCampaign(campaign) {
		
		this.campaignService.setCampaignId(campaign.id);
		this.campaign_id = this.campaignService.getCampaignId();
		this.parameters['campaign'] = this.campaign_id;
		this.loadDoctorsData();
	}

	export() {

		this.searchObj['campaign_id'] = this.campaign_id;
		const curDate = this.doctorService.getCurrentDate();
		const fileName = 'Doctor-'+ curDate;
		this.doctorService.exportData(this.searchObj, fileName);
	}

	pageChange(pageNumber) {
		this.router.navigate([], {
			relativeTo: this.activeRoute,
			queryParams: { page: pageNumber, campaign_id: this.campaign_id },
			queryParamsHandling: 'merge'
		});
	}

	closePopup(response) {
		this.toasterService.success(response.data.count + ' Records Uploaded Successfully!', 'Success!', { positionClass: 'toast-top-right' });
		// alert(response.data.count + ' Records Uploaded Successfully!');
		this.sf.form.updateValueAndValidity();
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	upload(file) {
		const uploadData = new FormData();
		uploadData.set('upload_file', file, file.name);
		this.doctorService.upload(uploadData).subscribe(
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

	delete(doctor_id) {
		
		const formData = new FormData();
		this.doctorService.delete(formData, doctor_id).subscribe(result => {
			this.toasterService.success('Record Deleted!', 'Success!', {
				positionClass: 'toast-top-right'
			});
			this.sf.form.updateValueAndValidity();
		},
		(err: HttpErrorResponse) => {
			this.handleError(err);
		});
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
		this.doctorService.delete_all(params).subscribe(param => {
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

}
