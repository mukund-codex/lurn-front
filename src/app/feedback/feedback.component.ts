import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomizeObject } from '../shared/classes/cutomizeObject';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaignService } from 'src/app/services/campaign.service';
import { ReportsService } from 'src/app/services/reports.service';
import { Subscription, Observable } from 'rxjs';
import 'rxjs/add/observable/merge';
import { map, concatMap, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  title: string;
  dropdownSettings: {};
  campaign_id: string;
  parameters: {} = {};
  searchObj: {} = {};
  showExport: Boolean = false;
  isAccessible: Boolean = false;
  records: any;
  @ViewChild('searchForm') sf: NgForm;
  private subscription = new Subscription();

  constructor(
    private activeRoute: ActivatedRoute,
    private campaignService: CampaignService,
    private reportsService: ReportsService,
    private router: Router
  ) { }

  getCurrentCampaign() {
    return this.campaignService.getCampaignId();
  }

  ngOnInit(): void {

    this.title = this.activeRoute.snapshot.data['title'];
    this.dropdownSettings = CustomizeObject.dropDownSettings(true);
    this.campaign_id = this.getCurrentCampaign();

    if(this.campaign_id) {
      this.parameters['campaign_id'] = this.campaign_id;
    }

    const permissionSet = this.reportsService.checkPermissionExist(['feedback-export', 'export-campaign']);
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
      
      let date_time;
      result['data'].forEach((element, i) => {
        date_time = this.reportsService.getDateTimeFromTimeZone(element['created_at']);
        result['data'][i].created_at = date_time;
      });
      this.records = result;
    });
  }

  loadData(Obj) {
    if(this.campaign_id) {
    Obj.campaign_id = this.campaign_id;
    }
    return this.reportsService.getFeedbackList(Obj);
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
