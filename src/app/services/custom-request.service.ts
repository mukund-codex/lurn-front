import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GenericService } from './generic.service';

@Injectable({
	providedIn: 'root'
})
export class CustomRequestService extends GenericService {
	apiUrl: string = environment.apiUrl;
	formData = new FormData();

	constructor(public http: HttpClient) {
		super('custom', http);
	}
}
