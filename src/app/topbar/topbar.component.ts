import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CampaignDashboardService } from '../../app/services/campaign-dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomizeObject } from '../../app/shared/classes/cutomizeObject';
import { CampaignService } from '../services/campaign.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  campaigns: any;
  dropdownSettingsCampaign: {};
  campaignData: any;
  selectedCampaign: any = [];
  campaign_code: string;
  @Output() changeCampaign = new EventEmitter();

  constructor(
    private campaignDashboardService : CampaignDashboardService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private cs: CampaignService
  ) { }

  ngOnInit() {

    this.dropdownSettingsCampaign = CustomizeObject.dropDownSettings(true);
    
    const campaign_id = this.cs.getCampaignId();
    const that = this;
    
   this.campaignDashboardService.getCampaignData(campaign_id).subscribe(result => {
      this.campaignData = result['data'][0];
      this.selectedCampaign.push(this.campaignData);
      this.campaign_code = this.campaignData.cid;
      this.campaigns = this.campaignDashboardService.getCampaigns();
    });
    
    this.cs.currentMessage.subscribe(message => this.campaign_code = message)

  }

  copyInputMessage(campaign_code, event) {
		const selBox = document.createElement('textarea');
		selBox.style.position = 'fixed';
		selBox.style.left = '0';
		selBox.style.top = '0';
		selBox.style.opacity = '0';
		selBox.value = campaign_code;
		document.body.appendChild(selBox);
		selBox.focus();
		selBox.select();
		document.execCommand('copy');
    document.body.removeChild(selBox);
    
    const nextElement = event.target.nextSibling;
		nextElement.style.display = "block";
		setTimeout(() => { nextElement.style.display = "none"; }, 2000);
	}

}
