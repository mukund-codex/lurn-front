import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { CblocksService } from '../services/cblocks.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/mergeMap';
import { ToastrService } from 'ngx-toastr';
import { CustomizeObject } from '../shared/classes/cutomizeObject';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import { concatMap, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { CampaignService } from '../services/campaign.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-cblocks',
	templateUrl: './cblocks.component.html',
	styleUrls: ['./cblocks.component.css']
})

export class CblocksComponent implements OnInit {
	change_in_params: any;
	parameters: {} = {};
	records: any;
	searchObj: {} = {};
	message: {};
	module_name: string;
	campaign_id: string;
	private subscription = new Subscription();
	uploadFields: any = [];
	@ViewChild('searchForm') sf: NgForm;
	title: string;
	showExport: Boolean = false;
	showDelete: Boolean = false;

	constructor(
		private cblockService: CblocksService,
		private router: Router,
		private activeRoute: ActivatedRoute,
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
			this.parameters['campaign_id'] = this.campaign_id;
		}
		const permissionSet = this.cblockService.checkPermissionExist(['export-module', 'remove-module']);
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
			this.records = result;
			this.uploadFields = result['fields'];
		});
	}

	loadData(Obj) {
		if(this.campaign_id) {
			Obj.campaign_id = this.campaign_id;
		}
		return this.cblockService.getAll(Obj);
	}

	getLanguages(result) {
		for (let i = 0, l = result['data'].length; i < l; i++) {
			result['data'][i].language_names = this.multi_implode(
				result['data'][i].languages,
				','
			);
		}
		return result;
	}

	multi_implode(myarr, glue) {
		return myarr.map(e => e.name).join(glue);
	}

	pageChange(pageNumber) {
		this.router.navigate([], {
			relativeTo: this.activeRoute,
			queryParams: { page: pageNumber, campaign_id: this.campaign_id },
			queryParamsHandling: 'merge'
		});
	}

	delete(module_id) {
		
		const moduleData = new FormData();
		this.cblockService
			.delete(moduleData, module_id)
			.subscribe(result => {
				this.toasterService.success(
					'Records Deleted Successfully!',
					'Success!',
					{ positionClass: 'toast-top-right' }
				);
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

	addTemplate(module_id) {
		this.router.navigate(['template/add'], { queryParams: {module_id: module_id, campaign_id: this.campaign_id}} );
	}
	
	listTemplate(module_id) {
		this.router.navigate(['template/'], { queryParams: {module_id: module_id, campaign_id: this.campaign_id}} );
	}

	addForm(module_id) {
		this.router.navigate(['module-formbuilder/add'], { queryParams: {module_id: module_id, campaign_id: this.campaign_id}} );
	}

	listForms(module_id) {
		this.router.navigate(['module-formbuilder'], { queryParams: {module_id: module_id, campaign_id: this.campaign_id}} );
	}

	addMasterFile(module_id) {
		this.router.navigate(['master/add'], { queryParams: {module_id: module_id, campaign_id: this.campaign_id}} );
	}

	listMasterFile(module_id) {
		this.router.navigate(['master/'], { queryParams: {module_id: module_id, campaign_id: this.campaign_id}} );
	}

	export() {
		this.searchObj['campaign_id'] = this.getCurrentCampaign();
		const curDate = this.cblockService.getCurrentDate();
		const fileName = 'Module-'+ curDate;
		this.cblockService.exportData(this.searchObj, fileName);
	}

	search() {
		const name: {} = this.module_name ? { name: this.module_name } : {};

		this.searchObj = Object.assign(name, this.parameters);
		this.cblockService.getAll(this.searchObj).subscribe(result => {
			this.records = this.getLanguages(result);
		});

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
		this.sf.form.updateValueAndValidity();
	}
}
