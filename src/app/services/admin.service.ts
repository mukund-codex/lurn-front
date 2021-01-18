import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';

@Injectable({
	providedIn: 'root'
})
export class AdminService extends GenericService {
	constructor(public http: HttpClient) {
		super('admin', http);
	}

	getRoles() {
		return this.http.get(`${this.apiUrl}admin/role/export?type=prospect`);
	}
}
