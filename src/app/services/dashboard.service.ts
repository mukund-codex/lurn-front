import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GenericService } from './generic.service';
import { GroupService } from './group.service';
import { CampService } from './camp.service';
import { CblocksService } from './cblocks.service';
import { TemplateService } from './template.service';

@Injectable({
	providedIn: 'root'
})
export class DashboardService extends GenericService {
	apiUrl: string = environment.apiUrl;
	formData = new FormData();

	constructor(
		public http: HttpClient,
		private groupService: GroupService,
		private campService: CampService
	) {
		super('form_input_mapping', http);
	}

	getCompanies() {
		return this.groupService.getCompanies();
	}

	getCampaignFromCompany(company_id) {
		return this.groupService.getCampaignFromCompany(company_id);
	}

	getCampsFromCampaign(campaign_id) {
		return this.campService.getAll({ campaign_id: campaign_id });
	}

	getTotalCompany(from_date: any, to_date: any) {
		return this.http.get(this.apiUrl + `company/count?from_date=${from_date}&to_date=${to_date}`);
	}

	getTotalCampaign(from_date: any, to_date: any, company_id: any) {
		if (!company_id) { 
			return this.http.get(this.apiUrl + `campaign/count?from_date=${from_date}&to_date=${to_date}`); 
		} else { 
			return this.http.get(this.apiUrl + `campaign/count?from_date=${from_date}&to_date=${to_date}&company_id=${company_id}`); 
		}
	}

	getTotalCamp(from_date: any, to_date: any, campaign_id: any) {
		if (!campaign_id) { 
			return this.http.get(this.apiUrl + `camp/count?from_date=${from_date}&to_date=${to_date}`); 
		} else { 
			return this.http.get(this.apiUrl + `camp/count?from_date=${from_date}&to_date=${to_date}&campaign_id=${campaign_id}`); 
		}
	}

	getActiveCamp(from_date: any, to_date: any, campaign_id: any) {
		if (!campaign_id) { 
			return this.http.get(this.apiUrl + `camp/active_count?from_date=${from_date}&to_date=${to_date}`);
		} else { 
			return this.http.get(this.apiUrl + `camp/active_count?from_date=${from_date}&to_date=${to_date}&campaign_id=${campaign_id}`); 
		}
	}

	getTotalDoctor(from_date: any, to_date: any, camp_id: any) {
		if (!camp_id) { 
			return this.http.get(this.apiUrl + `doctor/count?from_date=${from_date}&to_date=${to_date}`);
		} else { 
			return this.http.get(this.apiUrl + `doctor/count?from_date=${from_date}&to_date=${to_date}&campaign_id=${camp_id}`); 
		}
	}

	getRequestCount(from_date: any, to_date: any, camp_id: any) {
		if (!camp_id) { 
			return this.http.get(this.apiUrl + `custom/count?from_date=${from_date}&to_date=${to_date}`);
		} else { 
			return this.http.get(this.apiUrl + `custom/count?from_date=${from_date}&to_date=${to_date}&campaign_id=${camp_id}`);
		}
	}

	getMasterCount(from_date: any, to_date: any, module_id: any) {
		if (!module_id) { 
			return this.http.get(this.apiUrl + `doctor/count?from_date=${from_date}&to_date=${to_date}`);
		} else { 
			return this.http.get(this.apiUrl + `doctor/count?from_date=${from_date}&to_date=${to_date}&campaign_id=${module_id}`); 
		}
	}

	// getTotalDoctor(from_date: any, to_date: any, camp_id: any) {
	// 	if (!camp_id) { 
	// 		return this.http.get(this.apiUrl + `doctor/count?from_date=${from_date}&to_date=${to_date}`);
	// 	} else { 
	// 		return this.http.get(this.apiUrl + `doctor/count?from_date=${from_date}&to_date=${to_date}&campaign_id=${camp_id}`); 
	// 	}
	// }


// http://192.168.0.3/cubit/public/api/v1/custom/count
// Filters - camp_id, module_id, language_id, doctor_id, from_date, to_date

// http://192.168.0.3/cubit/public/api/v1/masterfile/count
// Filters -module_id, language_id, from_date, to_date

// http://192.168.0.3/cubit/public/api/v1/template/count
// Filters -module_id, language_id, from_date, to_date

}
