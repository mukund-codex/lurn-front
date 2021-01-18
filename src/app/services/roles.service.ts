import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';

@Injectable({
	providedIn: 'root'
})
export class RolesService extends GenericService {
	constructor(public http: HttpClient) {
		super('user/role', http);
	}
}
