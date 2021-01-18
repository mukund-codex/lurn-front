import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { LanguageService } from './language.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class CblocksService extends GenericService {
	
	module_id: string;
	module_type: string;
	moduleData: any;
	private messageSource = new BehaviorSubject('');
	currentMessage = this.messageSource.asObservable();

	private messageSource2 = new BehaviorSubject('');
	currentMessage2 = this.messageSource.asObservable();

	constructor(public http: HttpClient, private languageService: LanguageService) {
		super('module', http);
	}

	getLanguages() {
		return this.languageService.allRecords();
	}

	setModuleId(module_id) {
		this.module_id = module_id;
		this.getAll({ 'id': this.module_id }).subscribe(moduleData => {
			this.moduleData = moduleData;
			this.module_type = moduleData['data'][0].type;
			this.messageSource.next(moduleData['data'][0].start_date);
			this.messageSource2.next(moduleData['data'][0].end_date);
		});
	}

	getModuleType() {
		return this.module_type;
	}

	getModuleId() {
		return this.module_id;
	}
}
