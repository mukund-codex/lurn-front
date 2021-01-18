import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { QuizReportComponent } from './quiz-report.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { QuizReportRoutingModule } from './quiz-report-routing.module';
import { ReportsService } from '../services/reports.service';

@NgModule({
	imports: [
		CommonModule,
		NgbModule,
    	FormsModule,
    	QuizReportRoutingModule,
		NgMultiSelectDropDownModule.forRoot(),
		SharedModule,
		NgbModalModule
	],
	declarations: [QuizReportComponent],
	providers: [ReportsService]
})
export class QuizReportModule { }
