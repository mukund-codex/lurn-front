import { NgModule, ElementRef, ViewChild } from "@angular/core";

import { CommonModule } from "@angular/common";

import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { CourseDashboardRoutingModule } from "./course-dashboard-routing.module";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CampaignDashboardService } from "../services/campaign-dashboard.service";
import { SharedModule } from "../../app/shared/shared.module";
import { CourseDashboardComponent } from "./course-dashboard.component";

@NgModule({
	imports: [CommonModule, CourseDashboardRoutingModule, NgbModule, SharedModule, NgbModalModule],
	declarations: [CourseDashboardComponent],
	providers: [CampaignDashboardService],
})
export class CourseDashboardModule {}
