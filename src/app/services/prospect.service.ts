import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ProspectService extends GenericService {
	apiUrl: string = environment.apiUrl;
	
	constructor(public http: HttpClient) {
		super('admin/prospects_list', http);
	}

	getProspects(params) {
		const queryString = this.formatQueryString(params);
		return this.http.get(`${this.apiUrl}admin/prospects_list` + `${queryString}`);
	}

	export(params: {}) {
		const queryString = this.formatQueryString(params);
		return this.httpClient.get(this.apiUrl + `admin/prospects_export${queryString}`);
	}
}
