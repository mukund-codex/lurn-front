import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { MasterService } from './master.service';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class TemplateService extends GenericService {

	apiUrl: string = environment.apiUrl;

	constructor(public http: HttpClient, private masterService: MasterService) {
		super('template', http);
	}

	getModules() {
		return this.masterService.getModules();
	}

	getDimensions() {
		return this.masterService.getDimensions();
	}

	getTemplate(id){
		return this.httpClient.get(this.apiUrl + 'template' + `?id=${id}`);
	}

	getAllFontStyles() {
		return this.httpClient.get('https://poster-service.techizertech.in/api/v1/poster/getFontFace');
	}

	cloneTemplate(resource) {
		return this.httpClient.post(this.apiUrl + `template/clone_template`, resource);
	}
}
