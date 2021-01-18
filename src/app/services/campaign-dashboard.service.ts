import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CampaignService } from './campaign.service';
import { GenericService } from './generic.service';

@Injectable({
	providedIn: 'root'
})
export class CampaignDashboardService extends GenericService {
	apiUrl: string = environment.apiUrl;
	formData = new FormData();

	constructor(
		public http: HttpClient, 
		private campaignService: CampaignService,
		) {
		super('campaign', http);
	}

	getCampaigns() {
		return this.campaignService.allRecords();
	}

	getCampaignData(campaign_id) {
		return this.campaignService.getAll({ id: campaign_id });
	}

	getDashboardCount(campaign_id) {
		return this.httpClient.get(this.apiUrl + "campaign/get_count_campaign?campaign_id=" + campaign_id);
	}
}
