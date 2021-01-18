import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CourseDetailsReportComponent } from './course-details-report.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CourseDetailsReportRoutingModule } from './course-details-report-routing.module';
import { ReportsService } from '../services/reports.service';

@NgModule({
	imports: [
		CommonModule,
		NgbModule,
    	FormsModule,
    	CourseDetailsReportRoutingModule,
		NgMultiSelectDropDownModule.forRoot(),
		SharedModule,
		NgbModalModule
	],
	declarations: [CourseDetailsReportComponent],
	providers: [ReportsService]
})
export class CourseDetailsReportModule { }
