import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { CampaignService } from './campaign.service';
import { LanguageService } from './language.service';

@Injectable({
	providedIn: 'root'
})
export class FormbuilderService extends GenericService {
	constructor(public http: HttpClient, private campaignService: CampaignService, private languageService: LanguageService) {
		super('form_master', http);
	}

	getCampaigns(company_id) {
		return this.campaignService.getAll({ company_id: company_id });
	}

	getLanguages() {
		return this.languageService.allRecords();
	}
}
