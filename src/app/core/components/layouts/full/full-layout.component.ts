import { Component, OnInit, Input, EventEmitter, ElementRef, Output, ViewChild } from "@angular/core";
import { NavigationEnd, Router, ActivatedRoute } from "@angular/router";
import { CampaignService } from "src/app/services/campaign.service";

const fireRefreshEventOnWindow = function () {
	const evt = document.createEvent("HTMLEvents");
	evt.initEvent("resize", true, false);
	window.dispatchEvent(evt);
};

@Component({
	selector: "app-full-layout",
	templateUrl: "./full-layout.component.html",
	styleUrls: ["./full-layout.component.scss"],
})
export class FullLayoutComponent implements OnInit {
	@Input() permissions: any = [];
	loadCampaignSidebar: Boolean = false;
	loadCourseSidebar: Boolean = false;
	campaignId;
	constructor(private elementRef: ElementRef, private router: Router, private activatedRoute: ActivatedRoute, private cs: CampaignService) {}

	ngOnInit() {
		this.permissions = JSON.parse(localStorage.getItem("userPermissions"));
	}

	onClick(event) {
		setTimeout(() => {
			fireRefreshEventOnWindow();
		}, 300);
	}
}
