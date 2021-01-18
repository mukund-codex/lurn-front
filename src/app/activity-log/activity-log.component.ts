import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CustomizeObject } from '../shared/classes/cutomizeObject';
import { CampaignService } from '../services/campaign.service';
import { ReportsService } from '../services/reports.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import 'rxjs/add/observable/merge';
import { map, concatMap, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.css']
})
export class ActivityLogComponent implements OnInit, AfterViewInit {

  title: string;
  campaigns: any;
  dropdownSettingsCampaign: {};
  campaignData: any;
  companyData: any;
  selectedCampaign: any = [];
  records: any;
  campaign_id: any;
  searchObj: {} = {};
  parameters: {} = {};
  @ViewChild('searchForm') sf: NgForm;
  private subscription = new Subscription();

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private campaignService: CampaignService,
    private reportsService: ReportsService
  ) { }

  getCurrentCampaign() {
    return this.campaignService.getCampaignId();
  }

  ngOnInit(): void {
    this.title = this.activeRoute.snapshot.data['title'];
    this.campaign_id = this.getCurrentCampaign();

    if(this.campaign_id) {
			this.parameters['campaign_id'] = this.campaign_id;
		}
  }

  ngAfterViewInit() {
    this.loadReportData();
  }
  
  loadReportData(){
    this.subscription = Observable.merge(
			this.activeRoute.queryParams.pipe(
				map(qParams => {
					this.parameters = CustomizeObject.merge({}, this.parameters, qParams);
					return this.parameters;
				}),
				concatMap(nParam => this.loadData(nParam))
			),
			this.search()
		).subscribe(result => {
      this.records = result;
		});
  }

	loadData(Obj) {
		if(this.campaign_id) {
			Obj.campaign_id = this.campaign_id;
		}
		return this.reportsService.getActivityLog(Obj);
  }
  
  search(Obj = {}) {
		return this.sf.valueChanges.pipe(
			debounceTime(400),
			distinctUntilChanged(),
			map(valueObj => {
				this.searchObj = CustomizeObject.removeNullKeys(valueObj);
				this.parameters = CustomizeObject.merge({}, this.parameters, this.searchObj, Obj);

				return this.parameters;
			}),
			switchMap(filterObj => this.loadData(filterObj))
		);
  }
  
  // export() {
	// 	this.searchObj['campaign_id'] = this.getCurrentCampaign();
	// 	this.reportsService.lastLoginExport(this.searchObj).subscribe(records => {
	// 		const final_array = [];
	// 		records['data'].map(function(result, i) {
	// 			final_array[i] = {
  //         'Company Name' : result.company_name, 
  //         'Campaign Name' : result.campaign_name, 
  //         'User Name' : result.users_name ? result.users_name : "",
  //         'Geography Name' : result.geography_name ? result.geography_name : "",
  //         'Manager Geography Name' : result.mgr_geography_name ? result.mgr_geography_name : "",
  //         'Manager User Name' : result.mgr_users_name ? result.mgr_users_name : "",
  //         'Last Login' : result.last_login ? result.last_login : ""
  //       };
	// 		});
	// 		this.excelService.exportAsExcelFile(final_array, this.title);
	// 	});
	// }

  pageChange(pageNumber) {
    this.router.navigate([], {
      relativeTo: this.activeRoute,
      queryParams: { page: pageNumber, campaign_id: this.campaign_id }
    });
  }

  changeCampaign(campaign) {
		this.campaignService.setCampaignId(campaign.id);
		this.campaign_id = this.getCurrentCampaign();
		this.parameters['campaign_id'] = this.campaign_id;
		this.sf.form.updateValueAndValidity();
  }

  ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

}
