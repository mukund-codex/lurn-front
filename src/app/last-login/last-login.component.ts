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
  selector: 'app-last-login',
  templateUrl: './last-login.component.html',
  styleUrls: ['./last-login.component.css']
})

export class LastLoginComponent implements OnInit, AfterViewInit {

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
  showExport: Boolean = false;
  isAccessible: Boolean = false;
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
    const permissionSet = this.reportsService.checkPermissionExist(['last-login-report-export', 'export-campaign']);
    this.showExport = permissionSet[0];
    this.isAccessible = permissionSet[1];
  }

  ngAfterViewInit() {
    this.loadReportData();
  }
  
  loadReportData() {
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
		return this.reportsService.getLastLogin(Obj);
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
  
  export() {
    this.searchObj['campaign_id'] = this.getCurrentCampaign();
    const curDate = this.reportsService.getCurrentDate();
		const fileName = 'Last-Login-'+ curDate;
		this.reportsService.exportData(this.searchObj, fileName, 'report', 'last_login_export');
	}

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
