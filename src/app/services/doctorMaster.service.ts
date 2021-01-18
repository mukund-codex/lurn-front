import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { CampService } from './camp.service';
import { LanguageService } from './language.service';

@Injectable({
	providedIn: 'root'
})
export class DoctorMasterService extends GenericService {
	constructor(public http: HttpClient, private campService: CampService, private languageService: LanguageService) {
		super('formbuilders_master', http);
	}

	getCompanies() {
		return this.campService.getCompanies();
	}

	getCampaignsFromCompany(company_id) {
		return this.campService.getCampaignsFromCompany(company_id);
	}

	getLanguages() {
		return this.languageService.allRecords();
	}

	getCampsFromCompany(company_id) {
		return this.campService.getAll({ company_id: company_id });
	}

	getObjectFromCamp(camp_id) {
		return this.getAll({ camp_id: camp_id });
	}
}
