import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { QuizAnswerReportComponent } from './quiz-answer-report.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { QuizAnswerReportRoutingModule } from './quiz-answer-report-routing.module';
import { ReportsService } from '../services/reports.service';

@NgModule({
	imports: [
		CommonModule,
		NgbModule,
    	FormsModule,
    	QuizAnswerReportRoutingModule,
		NgMultiSelectDropDownModule.forRoot(),
		SharedModule,
		NgbModalModule
	],
	declarations: [QuizAnswerReportComponent],
	providers: [ReportsService]
})
export class QuizAnswerReportModule { }
