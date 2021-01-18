import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { CampaignService } from './campaign.service';

@Injectable({
	providedIn: 'root'
})
export class AdminRolesService extends GenericService {
	constructor(public http: HttpClient, private campaignService: CampaignService,) {
		super('admin/role', http);
	}

	getCampaignFromCompany(company_id) {
		return this.campaignService.getAll({ company_id: company_id });
	}

	getCompanies() {
		return this.campaignService.getCompanies();
	}
}
