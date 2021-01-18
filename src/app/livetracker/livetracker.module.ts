import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { LivetrackerComponent } from './livetracker.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../app/shared/shared.module';
import { LivetrackerRoutingModule } from './livetracker-routing.module';
import { ReportsService } from '../services/reports.service';


@NgModule({
	imports: [
		CommonModule,
		NgbModule,
    FormsModule,
    LivetrackerRoutingModule,
		ReactiveFormsModule,
		ColorPickerModule,
		NgMultiSelectDropDownModule.forRoot(),
		SharedModule,
		NgbModalModule
	],
	declarations: [LivetrackerComponent],
	providers: [ReportsService]
})
export class LivetrackerModule { }
