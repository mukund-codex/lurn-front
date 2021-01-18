import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';

import { concatMap, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import 'rxjs/add/observable/merge';

import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { CustomizeObject } from '../shared/classes/cutomizeObject';
import { AdminService } from '../services/admin.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
	title: string;
	records: any;
	private subscription = new Subscription();
	@ViewChild('searchForm') sf: NgForm;

	parameters: {} = {};
	searchObj: {} = {};
	showExport: Boolean = false;
	showDelete: Boolean = false;
	showAdd: Boolean = false;
	showEdit: Boolean = false;

	constructor(
		private router: Router,
		private activeRoute: ActivatedRoute,
		private adminService: AdminService,
		private toasterService: ToastrService
	) {}

	ngOnInit() {
		this.title = this.activeRoute.snapshot.data['title'];
		const permissionSet = this.adminService.checkPermissionExist(['export-admin', 'remove-admin', 'create-admin', 'modify-admin']);
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
			this.records = result;
		});
	}

	loadData(Obj) {
		return this.adminService.getAll(Obj);
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

	delete(admin_id) {

		const formData = new FormData();
		this.adminService.delete(formData, admin_id).subscribe(result => {
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

		const curDate = this.adminService.getCurrentDate();
		const fileName = 'Admin-'+ curDate;
		this.adminService.exportData(this.searchObj, fileName);
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
