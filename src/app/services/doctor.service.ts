import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { CampService } from './camp.service';

@Injectable({
	providedIn: 'root'
})
export class DoctorService extends GenericService {
	constructor(public http: HttpClient, private campService: CampService) {
		super('doctor', http);
	}

	getCamps() {
		return this.campService.getAll();
	}

	saveDoctor(resource) {
		return this.httpClient.post(this.apiUrl + `doctor/doctor_create`, resource);
	}

	updateDoctor(resource, id) {
		resource.set('_method', 'PUT');
		return this.httpClient.post(this.apiUrl + `doctor/doctor_update/` + id, resource);
	}

}
