import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DoctorMasterService } from '../services/doctorMaster.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-doctor-master',
	templateUrl: './doctor.component.html',
	styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
	searchObj: {} = {};
	doctorData: any;
	parameters: {} = {};
	isCollapsed = true;
	doctor_name: string;
	message: {"text" : ""};

	constructor(
		private doctorMasterService: DoctorMasterService,
		private router: Router,
		private activeRoute: ActivatedRoute,
		private toasterService: ToastrService
	) {}

	ngOnInit() {
		this.activeRoute.queryParams.subscribe(param => {
			const listObj = Object.assign(this.searchObj, param);

			this.doctorData = this.doctorMasterService.getAll(listObj);
			this.parameters = param;
		});
	}

	add() {
		this.router.navigate(['doctor-master/add']);
	}

	pageChange(pageNumber) {
		this.router.navigate([], {
			relativeTo: this.activeRoute,
			queryParams: { page: pageNumber },
			queryParamsHandling: 'merge'
		});
	}

	edit(doctor_id) {
		this.router.navigate(['doctor-master/edit/' + doctor_id]);
	}

	delete(doctor_id) {
		if (confirm('Are you sure you want to delete Doctor?')) {
			const doctorData = new FormData();
			this.doctorMasterService.delete(doctorData, doctor_id).subscribe(result => {
				this.toasterService.success('Records Deleted Successfully!', 'Success!', { positionClass: 'toast-top-right' });
				this.search();
			});
		}
	}

	export() {
		
	}

	search() {
		const name: {} = this.doctor_name ? { name: this.doctor_name } : {};

		this.searchObj = Object.assign(name, this.parameters);
		this.doctorData = this.doctorMasterService.getAll(this.searchObj);
	}
}
