import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';

@Injectable({
	providedIn: 'root'
})
export class UsersService extends GenericService {
	constructor(public http: HttpClient) {
		super('user', http);
	}

	getRoles() {
		return this.http.get(`${this.apiUrl}user/roles`);
	}
}
