import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CampService } from '../services/camp.service';
import { ToastrService } from 'ngx-toastr';
import { NgbDateFRParserFormatter } from './../../app/ngb-date-fr-parser-formatter';

@Component({
	selector: 'app-camp',
	templateUrl: './camp.component.html',
	styleUrls: ['./camp.component.css']
})
export class CampComponent extends NgbDateFRParserFormatter implements OnInit {
	searchObj: {} = {};
	campData: any;
	parameters: {} = {};
	isCollapsed = true;
	camp_name: string;
	message: {"text" : ""};

	constructor(
		private campService: CampService,
		private router: Router,
		private activeRoute: ActivatedRoute,
		private toasterService: ToastrService
	) {
		super();
	}

	ngOnInit() {
		this.activeRoute.queryParams.subscribe(param => {
			const listObj = Object.assign(this.searchObj, param);

			this.campData = this.campService.getAll(listObj);
			this.parameters = param;
		});
	}

	add() {
		this.router.navigate(['camp/add']);
	}

	pageChange(pageNumber) {
		this.router.navigate([], {
			relativeTo: this.activeRoute,
			queryParams: { page: pageNumber },
			queryParamsHandling: 'merge'
		});
	}

	edit(camp_id) {
		this.router.navigate(['camp/edit/' + camp_id]);
	}

	delete(camp_id) {
		if (confirm('Are you sure you want to delete Camp?')) {
			const campData = new FormData();
			this.campService.delete(campData, camp_id).subscribe(result => {
				this.toasterService.success('Records Deleted Successfully!', 'Success!', { positionClass: 'toast-top-right' });
				this.search();
			});
		}
	}

	export() {
		
	}

	search() {
		const name: {} = this.camp_name ? { name: this.camp_name } : {};

		this.searchObj = Object.assign(name, this.parameters);
		this.campData = this.campService.getAll(this.searchObj);
	}
}
