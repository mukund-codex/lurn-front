import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';

@Injectable({
	providedIn: 'root'
})
export class PasswordService extends GenericService {
	constructor(public http: HttpClient) {
		super('admin', http);
    }
    
    changePassword(resource) {
        return this.httpClient.post(this.apiUrl + `admin/change_password`, resource);
    }
}
