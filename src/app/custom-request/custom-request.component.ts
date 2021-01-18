import { Component, OnInit } from '@angular/core';
import { CustomRequestService } from '../services/custom-request.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-custom-request',
	templateUrl: './custom-request.component.html',
	styleUrls: ['./custom-request.component.css']
})
export class CustomRequestComponent implements OnInit {
	parameters: {} = {};
	searchObj: {} = {};
	customRequestData: any;
	doctor_name: string;
	masterfile_name: string;
	language_name: string;
	template_name: string;
	camp_name: string;
	module_name: string;
	first_name: string;
	last_name: string;
	message: {"text" : ""};

	constructor(
		private customRequestService: CustomRequestService,
		private activeRoute: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit() {
		this.activeRoute.queryParams.subscribe(param => {
			const listObj = Object.assign(this.searchObj, param);
			this.customRequestData = this.customRequestService.getAll(listObj);
			this.parameters = param;
		});
	}

	pageChange(pageNumber) {
		this.router.navigate([], {
			relativeTo: this.activeRoute,
			queryParams: { page: pageNumber },
			queryParamsHandling: 'merge'
		});
	}

	search() {
		const camp_name: {} = this.camp_name ? { camp_name: this.camp_name } : {};
		const masterfile_name: {} = this.masterfile_name ? { masterfile_name: this.masterfile_name } : {};
		const module_name: {} = this.module_name ? { module_name: this.module_name } : {};
		const template_name: {} = this.template_name ? { template_name: this.template_name } : {};
		const language_name: {} = this.language_name ? { language_name: this.language_name } : {};
		const first_name: {} = this.first_name ? { first_name: this.first_name } : {};
		const last_name: {} = this.last_name ? { last_name: this.last_name } : {};

		this.searchObj = Object.assign(camp_name, masterfile_name, module_name, first_name, last_name, template_name, language_name, this.parameters);
		this.customRequestData = this.customRequestService.getAll(this.searchObj);
	}
}
