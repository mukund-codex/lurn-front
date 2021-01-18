import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { CampaignService } from './campaign.service';
import { GroupService } from './group.service';
import { FormbuilderService } from './formbuilder.service';

@Injectable({
	providedIn: 'root'
})
export class CampService extends GenericService {
	constructor(
		public http: HttpClient,
		private groupService: GroupService,
		private campaignService: CampaignService,
		private formbuilderService: FormbuilderService
	) {
		super('camp', http);
	}

	getCampaigns() {
		return this.campaignService.allRecords();
	}

	getModules() {
		return this.http.get(this.apiUrl + 'module');
	}

	getCompanies() {
		return this.campaignService.getCompanies();
	}
	getGroup() {
		return this.groupService.allRecords();
	}

	getForms(campaign_id) {
		return this.formbuilderService.getAll({ campaign_id: campaign_id });
	}

	getCampaignsFromCompany(company_id) {
		return this.campaignService.getAll({ company_id: company_id });
	}

	getCampaignFromCompany(company_id) {
		return this.campaignService.getAll({ company_id: company_id });
	}
	getGroupFromcampaign(campaign_id) {
		return this.groupService.getAll({ campaign_id: campaign_id });
	}
}
