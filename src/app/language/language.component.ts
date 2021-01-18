import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/merge';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { CustomizeObject } from '../shared/classes/cutomizeObject';
import { map, concatMap, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-language',
	templateUrl: './language.component.html',
	styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit, AfterViewInit {
	records: any;
	language_name: string;
	change_in_params: any;
	parameters: {} = {};
	searchObj: {} = {};
	showExport: Boolean = false;
	showDelete: Boolean = false;
	message: {"text" : ""};
	title: string;
	private subscription = new Subscription();
	@ViewChild('searchForm') sf: NgForm;

	constructor(
		private languageService: LanguageService,
		private router: Router,
		private activeRoute: ActivatedRoute,
		private toasterService: ToastrService
	) {}

	ngOnInit() {

		this.title = this.activeRoute.snapshot.data['title'];
		const permissionSet = this.languageService.checkPermissionExist(['export-language', 'remove-language']);
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
		});
	}

	loadData(Obj) {
		return this.languageService.getAll(Obj);
	}

	pageChange(pageNumber) {
		this.router.navigate([], {
			relativeTo: this.activeRoute,
			queryParams: { page: pageNumber }
		});
	}

	delete(company_id) {

		const companyData = new FormData();
		this.languageService
			.delete(companyData, company_id)
			.subscribe(result => {
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

		const curDate = this.languageService.getCurrentDate();
		const fileName = 'Language-'+ curDate;
		this.languageService.exportData(this.searchObj, fileName);
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
}
