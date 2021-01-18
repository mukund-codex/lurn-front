import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';

@Injectable({
	providedIn: 'root'
})
export class ProfileService extends GenericService {
	constructor(public http: HttpClient) {
		super('admin', http);
    }
    
    update_profile(resource, id) {
        resource.set('_method', 'PUT');
        return this.httpClient.post(this.apiUrl + `admin/update_profile/` + id , resource);
    }
}
