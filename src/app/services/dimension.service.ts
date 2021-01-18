import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';

@Injectable({
	providedIn: 'root'
})
export class DimensionService extends GenericService {
	constructor(public http: HttpClient) {
		super('dimension', http);
	}
}
