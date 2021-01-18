import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CampaignService } from 'src/app/services/campaign.service';

const fireRefreshEventOnWindow = function() {
	const evt = document.createEvent('HTMLEvents');
	evt.initEvent('resize', true, false);
	window.dispatchEvent(evt);
};

@Component({
	selector: 'app-campaign-layout',
	templateUrl: './campaign-layout.component.html',
	styleUrls: ['./campaign-layout.component.scss']
})
export class CampaignLayoutComponent implements OnInit, AfterViewInit {
	
	@Input() permissions: any = [];
	loadCampaignSidebar: Boolean = false;
	campaignId;
	constructor(
		private router:Router,  
		private activatedRoute: ActivatedRoute, 
		private cs: CampaignService) {	}

	ngOnInit() {
		this.activatedRoute.queryParams.subscribe(parameters => {
			if(!parameters.campaign_id) {
				
				this.router.navigate(['/campaign']);
			}
			this.cs.setCampaignId(parameters.campaign_id);
		})
		this.permissions = JSON.parse(localStorage.getItem('userPermissions'));
	}

	ngAfterViewInit() {
		
	}

	onClick(event) {
		setTimeout(() => {
			fireRefreshEventOnWindow();
		}, 300);
	}
}
