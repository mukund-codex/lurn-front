import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CourseReportComponent } from './course-report.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CourseReportRoutingModule } from './course-report-routing.module';
import { ReportsService } from '../services/reports.service';

@NgModule({
	imports: [
		CommonModule,
		NgbModule,
    	FormsModule,
    	CourseReportRoutingModule,
		NgMultiSelectDropDownModule.forRoot(),
		SharedModule,
		NgbModalModule
	],
	declarations: [CourseReportComponent],
	providers: [ReportsService]
})
export class CourseReportModule { }
