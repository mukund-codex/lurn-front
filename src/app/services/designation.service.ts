import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';

@Injectable({
    providedIn: 'root'
})

export class DesignationService extends GenericService {

    constructor(public http: HttpClient) {
        super('designation', http);
    }
}
