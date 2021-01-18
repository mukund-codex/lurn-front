import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../services/campaign.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  campaigns: any;

  constructor(
    private campaignService: CampaignService
  ) { }

  ngOnInit() {
    this.campaignService.getAll().subscribe(result => {
      this.campaigns = result['data'];
    });
  }
}
