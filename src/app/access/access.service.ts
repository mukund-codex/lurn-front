import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable({
	providedIn: 'root'
})
export class AccessService {
	apiUrl: string = environment.apiUrl;

	constructor(private http: HttpClient) {}

	userAuthentication(userName, password) {
		const formData = new FormData();

		formData.append('username', userName);
		formData.append('password', password);

		const reqHeader = new HttpHeaders({
			'No-Auth': 'True'
		});

		return this.http.post(`${this.apiUrl}admin/login`, formData, {
			headers: reqHeader
		});
	}

	refreshToken(token) {
		const formData = new FormData();
		formData.append('refresh_token', token);

		const reqHeader = new HttpHeaders({
			'No-Auth': 'True'
		});

		return this.http.post(`${this.apiUrl}admin/refresh`, formData, {
			headers: reqHeader
		});
	}

	fetchPermissions(token: string) {
		return this.http.get(`${this.apiUrl}admin/user_details`);
	}

	getPermissions() {
		return localStorage.getItem('userPermissions');
	}

	logout() {
		const formData = new FormData();
		this.http
		.post(`${this.apiUrl}admin/logout`, formData)
		.subscribe((result) => {
		localStorage.clear();
		window.location.reload();
		});
	}
}
