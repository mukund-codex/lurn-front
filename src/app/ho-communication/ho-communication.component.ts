import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { CustomizeObject } from '../shared/classes/cutomizeObject';
import { map, concatMap, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CampaignService } from '../services/campaign.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { HoCommunicationService } from '../services/ho-communication.service';
import { NgForm } from '@angular/forms';
import 'rxjs/add/observable/merge';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ho-communication',
  templateUrl: './ho-communication.component.html',
  styleUrls: ['./ho-communication.component.css']
})
export class HoCommunicationComponent implements OnInit {

	title: string;
	campaign_id: string;
	showExport: Boolean = false;
	showDelete: Boolean = false;
	subscription = new Subscription();
	@ViewChild('searchForm') sf: NgForm;
	parameters: {} = {};
	searchObj: {} = {};
	records: any;
	content: any;
	name: string;
	closeResult: string;
	content_title: string;

	constructor(
		private activeRoute: ActivatedRoute,
		private cs: CampaignService,
		private router: Router,
		private toasterService: ToastrService,
		private hoCommunicationService: HoCommunicationService,
		private sanitizer:DomSanitizer,
		private modalService: NgbModal
	) { }

  	ngOnInit(): void {
		this.title = this.activeRoute.snapshot.data['title'];
		this.campaign_id = this.getCurrentCampaign();
		const permissionSet = this.hoCommunicationService.checkPermissionExist(['export-assets', 'remove-assets']);
		this.showExport = permissionSet[0];
		this.showDelete = permissionSet[1];
	}

	//Bootstrap Modal Open event
	show(content, row, field) {
		this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', backdrop : 'static', keyboard : false, centered: true}).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		}, (reason) => {
			this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
		});

		if(field === 'html') {
			this.content_title = "HTML CONTENT";
			this.content = this.sanitizer.bypassSecurityTrustHtml(row.html);
		} else if (field === 'description') {
			this.content_title = "DESCRIPTION";
			this.content = this.sanitizer.bypassSecurityTrustHtml(row.description);
		}
		this.name = row.title;
	}

	getDismissReason(reason: any) : string {
		return  `with: ${reason}`;
	}

  	ngAfterViewInit() {

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

	getCurrentCampaign() {
		return this.cs.getCampaignId();
	}

	loadData(Obj) {
		return this.hoCommunicationService.getAll(Obj);
	}

	search() {
		return this.sf.valueChanges.pipe(
			debounceTime(400),
			distinctUntilChanged(),
			map(valueObj => {
				this.searchObj = CustomizeObject.removeNullKeys(valueObj);
				this.parameters = CustomizeObject.merge({}, this.parameters, this.searchObj);

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

	delete(assets_id) {
		
		const formData = new FormData();
		this.hoCommunicationService.delete(formData, assets_id).subscribe(result => {
			this.toasterService.success('Record Deleted!', 'Success!', {
				positionClass: 'toast-top-right'
			});
			this.sf.form.updateValueAndValidity();
		},
		(err: HttpErrorResponse) => {
			this.handleError(err);
		});
	}

	handleError(err: HttpErrorResponse) {
		if (err.status === 400) {
			this.toasterService.error(err.error.message, 'Error!', {
				positionClass: 'toast-top-right'
			});
		} else {
			alert('Problems while deleting records!');
		}
	}

	export() {

		const curDate = this.hoCommunicationService.getCurrentDate();
		const fileName = 'Assets-'+ curDate;
		this.hoCommunicationService.exportData(this.searchObj, fileName);
	}

	changeCampaign(campaign) {
		this.cs.setCampaignId(campaign.id);
		this.campaign_id = this.getCurrentCampaign();
		this.parameters['campaign_id'] = campaign.id;
		this.router.navigate(['ho-communication'], { queryParams : { campaign_id: campaign.id } });
		this.sf.form.updateValueAndValidity();
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	sendNotification(id) {
		this.hoCommunicationService.sendNotification(id).subscribe(result => {
			alert("Notification Sent Successfully!");
			this.sf.form.updateValueAndValidity();
		});
	}

}
