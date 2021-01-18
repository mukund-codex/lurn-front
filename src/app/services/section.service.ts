import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { CompanyService } from './company.service';
import { CampaignService } from './campaign.service';
import { stream } from 'xlsx/types';

@Injectable({
	providedIn: 'root'
})
export class SectionService extends GenericService {
	section_id: string;
	course_id:string;

	constructor(public http: HttpClient, private companyService: CompanyService, private campaignService: CampaignService) {
		super('section', http);
	}
	
	setSectionId(section_id) {
		this.section_id = section_id;
	}

	getSectionId() {
		return this.section_id;
	}

	
	setCourseId(course_id) {
		this.course_id = course_id;
	}

	getCourseId() {
		return this.course_id;
	}

	getCampaigns(company_id) {
		return this.campaignService.getAll({ company_id: company_id });
	}

	getTypesFromCampaign(campaign_id) {
		return this.http.get(`${this.apiUrl}campaign/geography_from_campaign?campaign_id=` + campaign_id);
	}

	getSectionData(course_id,campaign_id){
		return this.http.get(`${this.apiUrl}section/section_dropdown_list?campaign_id=` + campaign_id+"&course_id="+course_id);
	}

}
