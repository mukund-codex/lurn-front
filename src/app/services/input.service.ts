import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GenericService } from './generic.service';
import { GroupService } from './group.service';
import { CampService } from './camp.service';
import { CblocksService } from './cblocks.service';
import { TemplateService } from './template.service';
import { MasterService } from './master.service';

@Injectable({
	providedIn: 'root'
})
export class InputService extends GenericService {
	apiUrl: string = environment.apiUrl;
	formData = new FormData();

	constructor(
		public http: HttpClient,
		private groupService: GroupService,
		private campService: CampService,
		private cblocksService: CblocksService,
		private templateService: TemplateService,
		private masterService: MasterService
	) {
		super('input_mapping', http);
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

	getModulesFromCamp(camp_id) {
		return this.cblocksService.getAll({ camp_id: camp_id });
	}

	save(resource) {
		return this.httpClient.post(this.apiUrl + `input_mapping/create_template`, resource);
	}

	saveMasterfileMapping(resource) {
		return this.httpClient.post(this.apiUrl + `input_mapping/create_masterfile`, resource);
	}

	getTemplatesFromModule(module_id) {
		return this.templateService.getAll({ module_id: module_id });
	}

	getTemplateById(template_id) {
		return this.templateService.getAll({ id: template_id });
	}

	getMasterfilesFromModule(module_id) {
		return this.masterService.getAll({ module_id: module_id });
	}

	getMasterfileById(masterfile_id) {
		return this.masterService.getAll({ id: masterfile_id });
	}
}
