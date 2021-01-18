import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CompanyService } from './company.service';
import { GenericService } from './generic.service';
import { ProspectService } from './prospect.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class CampaignService extends GenericService {
	apiUrl: string = environment.apiUrl;
	formData = new FormData();
	campaign_id: string;
	campaignData: any;
	geo_master: any;
	private messageSource = new BehaviorSubject('');
  	currentMessage = this.messageSource.asObservable();

	constructor(
		public http: HttpClient, 
		private companyService: CompanyService,
		private prospectService: ProspectService
		) {
		super('campaign', http);
	}

	getCompanies() {
		return this.companyService.allRecords();
	}

	getCampaignCode() {
		return this.http.get(this.api() + 'campaign/generate_code');
	}

	setCampaignId(campaign_id) {
		this.campaign_id = campaign_id;
		this.getAll({ 'id': this.campaign_id }).subscribe(campaignData => {
			this.campaignData = campaignData;
			this.geo_master = campaignData['data'][0].geo_master;
		});
	}

	getCampaignId() {
		return this.campaign_id;
	}

	getProspects(company_id) {
		return this.http.get(this.api() + `admin/prospects_export?company_id=${company_id}`);
	}

	allTypes(campaign_id: string) {
		return this.http.get(this.api() + `campaign/geography_from_campaign?campaign_id=${campaign_id}`);
	}

	getGeographyDetails() {
		return this.http.get(this.apiUrl + `campaign/geography_master`);
	}
}
