import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivityLogComponent } from './activity-log.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ActivityLogRoutingModule } from './activity-log-routing.module';
import { ReportsService } from '../services/reports.service';


@NgModule({
	imports: [
		CommonModule,
		NgbModule,
    	FormsModule,
    	ActivityLogRoutingModule,
		ReactiveFormsModule,
		ColorPickerModule,
		NgMultiSelectDropDownModule.forRoot(),
		SharedModule,
		NgbModalModule
	],
	declarations: [ActivityLogComponent],
	providers: [ReportsService]
})
export class ActivityLogModule { }
