import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { RolesService } from '../services/roles.service';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { Observable } from 'rxjs/Observable';
import {
	concatMap,
	debounceTime,
	distinctUntilChanged,
	switchMap,
	map
} from 'rxjs/operators';
import 'rxjs/add/observable/merge';

import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CustomizeObject } from '../shared/classes/cutomizeObject';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-roles',
	templateUrl: './roles.component.html',
	styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit, AfterViewInit, OnDestroy {
	title: string;
	records: any;
	private subscription = new Subscription();
	@ViewChild('searchForm') sf: NgForm;

	parameters: {} = {};
	searchObj: {} = {};
	showExport: Boolean = false;
	showDelete: Boolean = false;
	showAdd: Boolean = false;

	constructor(
		private router: Router,
		private activeRoute: ActivatedRoute,
		private rolesService: RolesService,
		private toasterService: ToastrService
	) {}

	ngOnInit() {
		this.title = this.activeRoute.snapshot.data['title'];
		const permissionSet = this.rolesService.checkPermissionExist(['export-user-role', 'remove-user-role', 'create-user-role']);
		this.showExport = permissionSet[0];
		this.showDelete = permissionSet[1];
		this.showAdd = permissionSet[2];
	}

	ngAfterViewInit() {
		this.subscription = Observable.merge(
			this.activeRoute.queryParams.pipe(
				map(qParams => {
					this.parameters = CustomizeObject.merge(
						{},
						this.parameters,
						qParams
					);
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
		return this.rolesService.getAll(Obj);
	}

	search() {
		return this.sf.valueChanges.pipe(
			debounceTime(400),
			distinctUntilChanged(),
			map(valueObj => {
				this.searchObj = CustomizeObject.removeNullKeys(valueObj);
				this.parameters = CustomizeObject.merge(
					{},
					this.parameters,
					this.searchObj
				);

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

	delete(roles_id) {
		
		const formData = new FormData();
		this.rolesService.delete(formData, roles_id).subscribe(result => {
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

	export($evt) {
		
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
