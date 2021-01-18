import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModuleFormbuildersMasterService } from '../services/moduleFormbuildersMaster.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { CampaignService } from '../services/campaign.service';

@Component({
	selector: 'app-module-formbuilders-master',
	templateUrl: './module-formbuilders.component.html',
	styleUrls: ['./module-formbuilders.component.css']
})
export class FormbuildersComponent implements OnInit {
	searchObj: {} = {};
	formbuildersData: any;
	parameters: {} = {};
	isCollapsed = true;
	name: string;
	campaign_name: string;
	company_name: string;
	campaign_id: string;
	@ViewChild('searchForm') sf: NgForm;
	message: {"text" : ""};
	module_id: string;

	constructor(
		private formbuildersMasterService: ModuleFormbuildersMasterService,
		private router: Router,
		private activeRoute: ActivatedRoute,
		private toasterService: ToastrService,
		private cs: CampaignService
	) {}

	getCurrentCampaign() {
		return this.cs.getCampaignId();
	}

	ngOnInit() {
		this.activeRoute.queryParams.subscribe(queryParams => {
			this.module_id = queryParams.module_id;
		});

		this.campaign_id = this.getCurrentCampaign();
		if(this.campaign_id) {
			this.parameters['campaign'] = this.campaign_id;
			this.searchObj['campaign_id'] = this.campaign_id;
			this.searchObj['module_id'] = this.module_id;
		}
		this.activeRoute.queryParams.subscribe(param => {
			const listObj = Object.assign(this.searchObj, param);

			this.formbuildersData = this.formbuildersMasterService.getAll(listObj);
			this.parameters = param;
		});
	}

	add() {
		this.router.navigate(['module-formbuilders/add']);
	}

	pageChange(pageNumber) {
		this.router.navigate([], {
			relativeTo: this.activeRoute,
			queryParams: { page: pageNumber, campaign_id: this.campaign_id, module_id: this.module_id },
			queryParamsHandling: 'merge'
		});
	}

	delete(formbuilders_id) {
		if (confirm('Are you sure you want to delete Formbuilder?')) {
			const formbuildersData = new FormData();
			this.formbuildersMasterService.delete(formbuildersData, formbuilders_id).subscribe(result => {
				this.toasterService.success('Records Deleted Successfully!', 'Success!', { positionClass: 'toast-top-right' });
				this.search();
			});
		}
	}

	search() {
		const name: {} = this.name ? { name: this.name } : {};
		const campaign_name: {} = this.campaign_name ? { campaign_name: this.campaign_name } : {};
		const company_name: {} = this.company_name ? { company_name: this.company_name } : {};

		this.searchObj = Object.assign(name, campaign_name, company_name, this.parameters);
		this.formbuildersData = this.formbuildersMasterService.getAll(this.searchObj);
	}

	changeCampaign(campaign) {
		this.cs.setCampaignId(campaign.id);
		this.parameters['campaign_id'] = this.campaign_id;
		this.sf.form.updateValueAndValidity();
	}
}
