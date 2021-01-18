import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';

@Injectable({
	providedIn: 'root'
})

export class HoCommunicationService extends GenericService {
	constructor(public http: HttpClient) {
		super('post', http);
	}

	sendNotification(id) {
		return this.http.get(this.apiUrl + `post/send_notification?post_id=${id}`);
	}

	deleteMedia(resource, id) {
		resource.append('_method', 'DELETE');
		return this.httpClient.post(this.apiUrl + `post/delete_media/` + id, resource);
	}
}
