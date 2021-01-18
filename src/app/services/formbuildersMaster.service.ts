import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { CampaignService } from './campaign.service';
import { LanguageService } from './language.service';

@Injectable({
	providedIn: 'root'
})
export class FormbuildersMasterService extends GenericService {
	constructor(public http: HttpClient, private campaignService: CampaignService, private languageService: LanguageService) {
		super('form_master', http);
	}

	getCompanies() {
		return this.campaignService.getCompanies();
	}

	getLanguages() {
		return this.languageService.allRecords();
	}

	getCampaignFromCompany(company_id) {
		return this.campaignService.getAll({ company_id: company_id });
	}

	getObjectFromCamp(camp_id) {
		return this.getAll({ camp_id: camp_id });
	}

	getCampaignData(campaign_id) {
		return this.campaignService.getAll({id: campaign_id});
	}
}
