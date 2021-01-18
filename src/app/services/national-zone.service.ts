import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class NationalZoneService {
	apiUrl: string = environment.apiUrl;
	formData = new FormData();
	constructor(private http: HttpClient) {}

	getAll(pageNumber = 0) {
		return this.http.get(`${this.apiUrl}national_zone?page=` + pageNumber);
	}

	delete(nationalZoneData, national_zone_id) {
		return this.http.post(
			`${this.apiUrl}national_zone/delete/` + national_zone_id,
			nationalZoneData
		);
	}

	saveNationalZoneData(nationalZoneData) {
		return this.http.post(
			`${this.apiUrl}national_zone/create`,
			nationalZoneData
		);
	}

	getNationalZoneDetailsById(national_zone_id) {
		return this.http.get(
			`${this.apiUrl}national_zone/show/` + national_zone_id
		);
	}

	updateNationalZoneData(nationalZoneData, national_zone_id) {
		return this.http.post(
			`${this.apiUrl}national_zone/update/` + national_zone_id,
			nationalZoneData
		);
	}

	export() {
		const httpOptions = {
			headers: new HttpHeaders({
				responseType: 'text/plain;charset=UTF-8',
				'Content-Type': 'text/plain;charset=UTF-8',
				/*                 responseType: 'blob' as 'json', */
				Accept: 'plain/text',
				observe: 'response'
			})
		};
		return this.http.get(`${this.apiUrl}national_zone/export`, httpOptions);
	}
}
