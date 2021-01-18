import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { FooterComponent } from "./components/footer/footer.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { ToggleFullscreenDirective } from "./directives/toggle-fullscreen.directive";
import { CampaignSidebarComponent } from "./components/campaign-sidebar/campaign-sidebar.component";
import { CourseSidebarComponent } from "./components/course-sidebar/course-sidebar.component";

@NgModule({
	exports: [CommonModule, FooterComponent, NavbarComponent, SidebarComponent, CampaignSidebarComponent, CourseSidebarComponent, NgbModule],
	imports: [RouterModule, CommonModule, NgbModule],
	declarations: [FooterComponent, NavbarComponent, SidebarComponent, ToggleFullscreenDirective, CampaignSidebarComponent, CourseSidebarComponent],
})
export class CoreModule {}
