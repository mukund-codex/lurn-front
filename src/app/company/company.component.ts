import { Component, OnInit, ViewChild, OnDestroy, ViewChildren, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../services/company.service';

import { concatMap, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import 'rxjs/add/observable/merge';

import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CustomizeObject } from '../shared/classes/cutomizeObject';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-company',
	templateUrl: './company.component.html',
	styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit, AfterViewInit, OnDestroy {
	title: string;
	records: any;
	uploadFields: string;
	private subscription = new Subscription();
	@ViewChild('searchForm') sf: NgForm;

	parameters: {} = {};
	searchObj: {} = {};
	showDelete: Boolean = false;
	showExport: Boolean = false;
	showAdd: Boolean = false;
	showEdit: Boolean = false;

	constructor(
		private router: Router,
		private activeRoute: ActivatedRoute,
		private companyService: CompanyService,
		private toasterService: ToastrService
	) {}

	ngOnInit() {
		this.title = this.activeRoute.snapshot.data['title'];
		const permissionSet = this.companyService.checkPermissionExist(['export-company', 'remove-company', 'create-company', 'modify-company']);
		this.showExport = permissionSet[0];
		this.showDelete = permissionSet[1];
		this.showAdd = permissionSet[2];
		this.showEdit = permissionSet[3];
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
			const temp = result['fields'].join(' | ');
			this.uploadFields = temp;
			this.records = result;
		});
	}

	loadData(Obj) {
		return this.companyService.getAll(Obj);
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
			queryParams: { page: pageNumber }
		});
	}

	delete(company_id) {
		
		const formData = new FormData();
		this.companyService.delete(formData, company_id).subscribe(result => {
			
			if(result["success"]){
				this.toasterService.success('Record Deleted!', 'Success!', {
					positionClass: 'toast-top-right'
				});
			}else{
				this.toasterService.error(result["message"], 'Failed!', {
					positionClass: 'toast-top-right'
				});
			}
			
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

		const curDate = this.companyService.getCurrentDate();
		const fileName = 'Company-'+ curDate;
		this.companyService.exportData(this.searchObj, fileName);
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
