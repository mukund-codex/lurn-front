import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DimensionService } from '../services/dimension.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-dimension',
	templateUrl: './dimension.component.html',
	styleUrls: ['./dimension.component.css']
})
export class DimensionComponent implements OnInit {
	searchObj: {} = {};
	dimensionData: any;
	parameters: {} = {};
	isCollapsed = true;
	height: string;
	weight: string;
	name: string;
	message: {"text" : ""};
	showExport: Boolean = false;
	showDelete: Boolean = false;
	
	constructor(
		private activeRoute: ActivatedRoute,
		private router: Router,
		private dimensionService: DimensionService,
		private toasterService: ToastrService
	) {}

	ngOnInit() {
		this.activeRoute.queryParams.subscribe(param => {
			const listObj = Object.assign(this.searchObj, param);

			this.dimensionData = this.dimensionService.getAll(listObj);
			this.parameters = param;
		});
		const permissionSet = this.dimensionService.checkPermissionExist(['export-dimension', 'remove-dimension']);
		this.showExport = permissionSet[0];
		this.showDelete = permissionSet[1];
	}

	add() {
		this.router.navigate(['dimension/add']);
	}

	pageChange(pageNumber) {
		this.router.navigate([], {
			relativeTo: this.activeRoute,
			queryParams: { page: pageNumber },
			queryParamsHandling: 'merge'
		});
	}

	edit(dimension_id) {
		this.router.navigate(['dimension/edit/' + dimension_id]);
	}

	delete(dimension_id) {

		const dimensionData = new FormData();
		this.dimensionService.delete(dimensionData, dimension_id).subscribe(result => {
			this.toasterService.success('Records Deleted Successfully!', 'Success!', { positionClass: 'toast-top-right' });
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

	export() {

		const curDate = this.dimensionService.getCurrentDate();
		const fileName = 'Dimension-'+ curDate;
		this.dimensionService.exportData(this.searchObj, fileName);
	}

	search() {
		const height: {} = this.height ? { name: this.height } : {};
		const weight: {} = this.weight ? { name: this.weight } : {};
		const name: {} = this.name ? { name: this.name } : {};

		this.searchObj = Object.assign(name, height, weight, this.parameters);
		this.dimensionData = this.dimensionService.getAll(this.searchObj);
	}
}
