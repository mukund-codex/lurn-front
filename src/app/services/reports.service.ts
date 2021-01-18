import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { share, shareReplay } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})

export class ReportsService extends GenericService {
	
	constructor(public http: HttpClient) {
		super('report', http);
	}

	getLastLogin(params){
		const queryString = this.formatQueryString(params);
		return this.httpClient.get(this.apiUrl + 'report/last_login' + `${queryString}`).pipe(share());
	}

	getQuizReport(params){
		const queryString = this.formatQueryString(params);
		return this.httpClient.get(this.apiUrl + 'quiz/quiz_report' + `${queryString}`).pipe(share());
	}

	getQuizAnswerReport(params){
		const queryString = this.formatQueryString(params);
		return this.httpClient.get(this.apiUrl + 'quiz/quiz_answer_report' + `${queryString}`).pipe(share());
	}

	getQuizAnswerDetailsReport(params){
		const queryString = this.formatQueryString(params);
		return this.httpClient.get(this.apiUrl + 'quiz/quiz_answer_details' + `${queryString}`).pipe(share());
	}

	getTotalUniqueFormData(params){
		const queryString = this.formatQueryString(params);
		return this.httpClient.get(this.apiUrl + 'report/total_unique_form_data_report' + `${queryString}`).pipe(share());
	}

	getShareDownload(params){
		const queryString = this.formatQueryString(params);
		return this.httpClient.get(this.apiUrl + 'custom/share_download_report' + `${queryString}`).pipe(share());
	}

	getActivityLog(params){
		return this.http.get(this.apiUrl + `custom/activity_log`);
	}

	getNotificationLog(params) {
		const queryString = this.formatQueryString(params);
		return this.httpClient.get(this.apiUrl + 'notification' + `${queryString}`).pipe(share());
	}

	getCourseReport(params) {
		const queryString = this.formatQueryString(params);
		return this.httpClient.get(this.apiUrl + 'report/course_report' + `${queryString}`).pipe(share());
	}

	getCourseDetailsReport(params) {
		const queryString = this.formatQueryString(params);
		return this.httpClient.get(this.apiUrl + 'report/course_details_report' + `${queryString}`).pipe(share());
	}

	getFeedbackList(params) {
		const queryString = this.formatQueryString(params);
		return this.httpClient.get(this.apiUrl + 'user/feedback_list' + `${queryString}`).pipe(share());
	}
}
