import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CompanyService } from './company.service';
import { CampaignService } from './campaign.service';
import { GenericService } from './generic.service';
import { GroupService } from './group.service';
import { CourseService } from './course.service';

@Injectable({
	providedIn: 'root'
})
export class CourseUserRoleService extends GenericService {
	apiUrl: string = environment.apiUrl;
	formData = new FormData();

	constructor(public http: HttpClient, private campaignService: CampaignService, private companyService: CompanyService, private groupService: GroupService, private courseService: CourseService) {
		super('course_user_role', http);
	}

	// getCompanies() {
	// 	return this.companyService.allRecords();
	// }

	// getCampaignFromCompany(company_id) {
	// 	return this.campaignService.getAll({ company_id: company_id });
	// }

	// getUsersFromCampaign(campaign_id) {
	// 	return this.http.get(`${this.apiUrl}campaign/campaign_users/` + campaign_id);
	// }

	// getGroupFromCampaign(campaign_id) {
	// 	return this.http.get(`${this.apiUrl}group?campaign_id=` + campaign_id);
	// }
	
	// getUserFromGroup(group_id) {
	// 	return this.http.get(`${this.apiUrl}group?id=` + group_id);
	// }
}
