import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaignService } from '../../app/services/campaign.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CustomizeObject } from '../shared/classes/cutomizeObject';

@Component({
	selector: 'app-campaign',
	templateUrl: './campaign.component.html',
	styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {
	campaignData: any;
	public isCollapsed = true;
	company_name: string;
	campaign_name: string;
	campaign_code: string;
	prospect_name: string;
	searchObj: {} = {};
	parameters: any;
	showExport: Boolean = false;
	showDelete: Boolean = false;
	showAdd: Boolean = false;
	companyData: any;
	dropdownSettingsCompany: {};
	company_id: any;
	showCompanyFilter = false;

	constructor(
		private activeRoute: ActivatedRoute,
		private router: Router,
		private campaignService: CampaignService,
		private toasterService: ToastrService
	) {}

	ngOnInit() {
		this.activeRoute.queryParams.subscribe(param => {
			const listObj = Object.assign(this.searchObj, param);
			this.campaignData = this.campaignService.getAll(listObj);
			this.parameters = param;
		});

		this.dropdownSettingsCompany = CustomizeObject.dropDownSettings(true);
		const permissionSet = this.campaignService.checkPermissionExist(['export-campaign', 'remove-campaign', 'create-campaign']);
		this.showExport = permissionSet[0];
		this.showDelete = permissionSet[1];
		this.showCompanyFilter = permissionSet[2];

		if(this.showCompanyFilter) {
			this.companyData = this.campaignService.getCompanies();
		}
	}

	ngAfterViewInit() {
		
	}

	search() {
		const company_id: {} = this.company_id ? (this.company_id[0] ? { company_id: this.company_id[0].id } : {}) : {};
		const campaign_name: {} = this.campaign_name ? { campaign_name: this.campaign_name } : {};
		const campaign_code: {} = this.campaign_code ? { cid: this.campaign_code } : {};

		this.searchObj = Object.assign(company_id, campaign_name, campaign_code, this.parameters);
		this.campaignData = this.campaignService.getAll(this.searchObj);
	}

	add() {
		this.router.navigate(['campaign/add']);
	}

	copyInputMessage(campaign_code) {
		const selBox = document.createElement('textarea');
		selBox.style.position = 'fixed';
		selBox.style.left = '0';
		selBox.style.top = '0';
		selBox.style.opacity = '0';
		selBox.value = campaign_code;
		document.body.appendChild(selBox);
		selBox.focus();
		selBox.select();
		document.execCommand('copy');
		document.body.removeChild(selBox);
	}

	pageChange(pageNumber) {
		this.router.navigate([], {
			relativeTo: this.activeRoute,
			queryParams: { page: pageNumber },
			queryParamsHandling: 'merge'
		});
	}

	edit(campaign_id) {
		this.router.navigate(['campaign/edit/' + campaign_id]);
	}

	delete(campaign_id) {
		const campaignData = new FormData();
		this.campaignService.delete(campaignData, campaign_id).subscribe(result => {
			if(result["success"]){
				this.toasterService.success('Record Deleted!', 'Success!', {
					positionClass: 'toast-top-right'
				});
			}else{
				this.toasterService.error(result["message"], 'Failed!', {
					positionClass: 'toast-top-right'
				});
			}
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

		const curDate = this.campaignService.getCurrentDate();
		const fileName = 'Campaign-'+ curDate;
		this.campaignService.exportData(this.searchObj, fileName);
	}

	campaignDashboard(campaign_id) {
		this.router.navigate(['/campaign-dashboard'],  { queryParams: {campaign_id : campaign_id} });
	}
}
