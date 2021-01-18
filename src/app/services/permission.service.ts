import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';

@Injectable({
	providedIn: 'root'
})
export class PermissionService extends GenericService {
	constructor(public http: HttpClient) {
		super('user/permission', http);
	}
}
