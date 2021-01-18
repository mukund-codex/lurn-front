import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TotalUniqueFormDataReportComponent } from './total-unique-form-data-report.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TotalUniqueFormDataRoutingModule } from './total-unique-form-data-report-routing.module';
import { ReportsService } from '../services/reports.service';

@NgModule({
	imports: [
		CommonModule,
		NgbModule,
    	FormsModule,
		TotalUniqueFormDataRoutingModule,
		NgMultiSelectDropDownModule.forRoot(),
		SharedModule,
		NgbModalModule
	],
	declarations: [TotalUniqueFormDataReportComponent],
	providers: [ReportsService]
})
export class TotalUniqueFormDataReportModule { }
