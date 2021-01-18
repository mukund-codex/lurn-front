import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DesignationService } from '../services/designation.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})

export class DesignationComponent implements OnInit {

	change_in_params: any;
	parameters: {} = {};
	searchObj: {} = {};
	records: any;
	designation_name: string;
	SelectedIDs : any = [];
	@ViewChild('searchForm') sf: NgForm;
	uploadedFile: any = [];
	errors: any = [];
	uploadFields: any = [];
	showExport: Boolean = false;
	showDelete: Boolean = false;
	showMultiDelete: Boolean = false;
	showAdd: Boolean = false;
	showEdit: Boolean = false;

  	constructor(
		private activeRoute: ActivatedRoute,
		private designationService: DesignationService,
		private router: Router,
		private toasterService: ToastrService
	) { }

  	ngOnInit() {
		this.change_in_params = this.activeRoute.queryParams
		.flatMap(params => {
			this.parameters = params;
			const listObj = Object.assign(this.searchObj, params);

			return this.designationService.getAll(listObj);
		})
		.subscribe(result => {
			this.records = result;
			this.uploadFields = result['fields'];
		});
		const permissionSet = this.designationService.checkPermissionExist(['export-designation', 'remove-designation', 'create-designation', 'modify-designation']);
		this.showExport = permissionSet[0];
		this.showDelete = permissionSet[1];
		this.showAdd = permissionSet[2];
		this.showEdit = permissionSet[3];
		this.showMultiDelete = true;
	}

	pageChange(pageNumber) {
		this.router.navigate([], {
			relativeTo: this.activeRoute,
			queryParams: { page: pageNumber },
			queryParamsHandling: 'merge'
		});
	}

	delete(company_id) {

		const companyData = new FormData();
		this.designationService
			.delete(companyData, company_id)
			.subscribe(result => {
				this.toasterService.success('Record Deleted!', 'Success!', {
					positionClass: 'toast-top-right'
				});
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

		const curDate = this.designationService.getCurrentDate();
		const fileName = 'Designation-'+ curDate;
		this.designationService.exportData(this.searchObj, fileName);
	}

	search() {
		const name: {} = this.designation_name ? { name: this.designation_name } : {};

		this.searchObj = Object.assign(name, this.parameters);
		this.designationService.getAll(this.searchObj).subscribe(result => {
			this.records = result;
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

		this.designationService.delete_all(params).subscribe(param => {
			this.toasterService.success(param['data'] + ' Records Deleted Successfully!', 'Success!', { positionClass: 'toast-top-right' });
			this.search();
			// this.sf.form.updateValueAndValidity();
		},
		(err: HttpErrorResponse) => {
			this.handleError(err);
		});
	}

	// Listener
	fileChange(file) {
		this.uploadedFile = file; // Handle Event Emitter
	}

	upload(file) {
		const uploadData = new FormData();
		uploadData.set('upload_file', file, file.name);
		this.designationService.upload(uploadData).subscribe(
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

	closePopup(response) {
		this.toasterService.success(response.data.count + ' Records Uploaded Successfully!', 'Success!', { positionClass: 'toast-top-right' });
		// alert(response.data.count + ' Records Uploaded Successfully!');
		this.search();
		// this.sf.form.updateValueAndValidity();
	}
}
