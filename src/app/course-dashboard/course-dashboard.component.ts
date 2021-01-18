import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaignDashboardService } from '../services/campaign-dashboard.service';
import { CampaignService } from '../services/campaign.service';

@Component({
  selector: 'app-course-dashboard',
  templateUrl: './course-dashboard.component.html',
  styleUrls: ['./course-dashboard.component.css']
})
export class CourseDashboardComponent implements OnInit {

  campaign_id: string;
  course_id:string;
  title: string;
  selectedCampaign: any;
  campaignData: any;
  campaignDashboardData: any;
  isAccessible: Boolean = false;

  constructor(
    private campaignDashboardService : CampaignDashboardService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private cs: CampaignService
  ) {
  }

  getCurrentCampaign() {
    return this.cs.getCampaignId();
  }

  ngOnInit() {
    
    const permissionSet = this.campaignDashboardService.checkPermissionExist(['list-geography']);
		this.isAccessible = permissionSet[0];

    this.campaign_id = this.getCurrentCampaign();
    this.title = this.activeRoute.snapshot.data['title'];    
    this.activeRoute.queryParams.subscribe(parameters => {
      if(!parameters.campaign_id) {
        alert('Please select campaign');
        this.router.navigate(['/campaign']);
      }
      this.campaignDashboardData = this.campaignDashboardService.getDashboardCount(parameters.campaign_id);
    });
  }

  changeCampaign(campaign) {
    this.cs.setCampaignId(campaign.id);
    this.campaign_id = campaign.campaign_id;
		this.router.navigate(['campaign-dashboard'], { queryParams : { campaign_id: campaign.id } });
    this.campaignDashboardData = this.campaignDashboardService.getDashboardCount(campaign.id);
  }

  changeCourse(course) {
    this.course_id = course.id;
		this.router.navigate(['course-dashboard'], { queryParams : { course_id: course.id, campaign_id: this.campaign_id } });
  }
}
