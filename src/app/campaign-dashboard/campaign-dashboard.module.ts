import { NgModule, ElementRef, ViewChild } from '@angular/core';

import { CommonModule } from '@angular/common';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CampaignDashboardRoutingModule } from './campaign-dashboard-routing.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CampaignDashboardService } from '../services/campaign-dashboard.service';
import { SharedModule } from '../../app/shared/shared.module';

@NgModule({
	imports: [
		CommonModule,
		CampaignDashboardRoutingModule,
		NgbModule,
		SharedModule,
		NgbModalModule
	],
	declarations: [],
	providers: [CampaignDashboardService]
})
export class CampaignDashboardModule {}
