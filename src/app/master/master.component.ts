import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MasterService } from '../services/master.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import 'rxjs/add/operator/mergeMap';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import { map, concatMap } from 'rxjs/operators';
import { CustomizeObject } from '../shared/classes/cutomizeObject';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-master',
	templateUrl: './master.component.html',
	styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit, AfterViewInit {
	masterData: any;
	searchObj: {} = {};
	parameters: {} = {};
	module_name: string;
	name: string;
	language_name: string;
	change_in_params: any;
	records: any;
	campaign_id: string;
	module_id: string;
	showExport: Boolean = false;
	showDelete: Boolean = false;
	private subscription = new Subscription();

	constructor(
		private router: Router,
		private masterService: MasterService,
		private activeRoute: ActivatedRoute,
		private toasterService: ToastrService
	) {}

	ngOnInit() {
		this.activeRoute.queryParams.subscribe(queryParams => {
			this.campaign_id = queryParams.campaign_id;
			this.module_id = queryParams.module_id;
		});
		const permissionSet = this.masterService.checkPermissionExist(['export-masterfile', 'remove-masterfile']);
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
			// this.search()
		).subscribe(result => {
			this.records = result;
		});
	}

	loadData(Obj) {
		if(this.campaign_id) {
			Obj.campaign_id = this.campaign_id;
		}
		return this.masterService.getAll(Obj);
	}

	add() {
		this.router.navigate(['master/add']);
	}

	pageChange(pageNumber) {
		this.router.navigate([], {
			relativeTo: this.activeRoute,
			queryParams: { page: pageNumber },
			queryParamsHandling: 'merge'
		});
	}

	edit(master_id) {
		this.router.navigate(['master/edit/' + master_id]);
	}

	delete(master_id) {
		if (confirm('Are you sure you want to delete Master?')) {
			const masterData = new FormData();
			this.masterService.delete(masterData, master_id).subscribe(result => {
				this.toasterService.success('Records Deleted Successfully!', 'Success!', { positionClass: 'toast-top-right' });
				this.search();
			},
			(err: HttpErrorResponse) => {
				this.handleError(err);
			});
		}
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

	search() {
		const name: {} = this.name ? { name: this.name } : {};
		const module_name: {} = this.module_name ? { module_name: this.module_name } : {};
		const language_name: {} = this.language_name ? { language_name: this.language_name } : {};

		this.searchObj = Object.assign(name, module_name, language_name, this.parameters);

		this.masterService.getAll(this.searchObj).subscribe(result => {
			this.records = result;
		});
	}

	addTemplate(master_file_id) {
	}
}
