import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ShareDownloadComponent } from './share-download.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ShareDownloadRoutingModule } from './share-download-routing.module';
import { ReportsService } from '../services/reports.service';


@NgModule({
	imports: [
		CommonModule,
		NgbModule,
    	FormsModule,
    	ShareDownloadRoutingModule,
		ReactiveFormsModule,
		ColorPickerModule,
		NgMultiSelectDropDownModule.forRoot(),
		SharedModule,
		NgbModalModule
	],
	declarations: [ShareDownloadComponent],
	providers: [ReportsService]
})
export class ShareDownloadModule { }
