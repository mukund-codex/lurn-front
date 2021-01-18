import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { CompanyService } from './company.service';
import { CampaignService } from './campaign.service';
import { stream } from 'xlsx/types';

@Injectable({
	providedIn: 'root'
})
export class QuizQuestionsService extends GenericService {
	constructor(public http: HttpClient, private companyService: CompanyService, private campaignService: CampaignService) {
		super('quiz_question', http);
	}
	
	getGeography(type: string, parent = null, campaign: string = '') {
		let str = '';
		let qp = '';

		if (type) {
			str += 'type=' + type;
		}
		if (campaign) {
			str += '&campaign_id=' + campaign;
		}
		if (parent) {
			str += '&parent_id=' + parent;
		}
		if (str !== '') {
			qp = '?' + str;
		}

		return this.http.get(this.api() + `geography/geography_data${qp}`);
	}

	getCompanies() {
		return this.companyService.allRecords();
	}

	getCampaigns(company_id) {
		return this.campaignService.getAll({ company_id: company_id });
	}

	getTypesFromCampaign(campaign_id) {
		return this.http.get(`${this.apiUrl}campaign/geography_from_campaign?campaign_id=` + campaign_id);
	}

	getNationalZones(campaign_id, type, parent_id = 0) {
		if (parent_id) {
			return this.http.get(`${this.apiUrl}geography/geography_data?campaign_id=` + campaign_id + `&type=` + type + `&parent_id=` + parent_id);
		} else {
			return this.http.get(`${this.apiUrl}geography/geography_data?campaign_id=` + campaign_id + `&type=` + type);
		}
	}

	getZones(campaign_id, type, parent_id) {
		return this.http.get(`${this.apiUrl}geography`);
	}

	getCampaignDataById(campaign_id) {
		return this.campaignService.getAll({id : campaign_id});
	}
}
