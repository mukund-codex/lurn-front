import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { CampaignService } from './campaign.service';

@Injectable({
	providedIn: 'root'
})
export class ModuleFormbuildersMasterService extends GenericService {
		constructor(public http: HttpClient, private campaignService: CampaignService) {
		super('form_secondary', http);
	}

	getCampaignData(campaign_id) {
		return this.campaignService.getAll({id: campaign_id});
	}
}
