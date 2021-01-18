import { NgModule, ElementRef, ViewChild } from '@angular/core';

import { CommonModule } from '@angular/common';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CampaignRoutingModule } from './campaign-routing.module';
import { CampaignComponent } from './campaign.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CampaignService } from '../services/campaign.service';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../app/shared/shared.module';
import { CampaignDashboardComponent } from '../campaign-dashboard/campaign-dashboard.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
	imports: [
		CommonModule,
		CampaignRoutingModule,
		NgbModule,
		FormsModule,
		ReactiveFormsModule,
		ColorPickerModule,
		NgMultiSelectDropDownModule.forRoot(),
		SharedModule,
		NgbModalModule,
		SweetAlert2Module.forRoot()
	],
	declarations: [CampaignComponent, CampaignDashboardComponent, FormComponent],
	providers: [CampaignService]
})
export class CampaignModule {}
