import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CampaignService } from 'src/app/services/campaign.service';
import { CourseService } from 'src/app/services/course.service';

const fireRefreshEventOnWindow = function() {
	const evt = document.createEvent('HTMLEvents');
	evt.initEvent('resize', true, false);
	window.dispatchEvent(evt);
};

@Component({
	selector: 'app-course-layout',
	templateUrl: './course-layout.component.html',
	styleUrls: ['./course-layout.component.scss']
})
export class CourseLayoutComponent implements OnInit, AfterViewInit {
	
	@Input() permissions: any = [];
	loadModuleSidebar: Boolean = false;

	constructor(
		private router:Router,  
		private activatedRoute: ActivatedRoute, 
		private cs: CampaignService,
		private courseService: CourseService) {	}

	ngOnInit() {
		this.activatedRoute.queryParams.subscribe(parameters => {
			if(!parameters.campaign_id) {
				alert("Please select campaign");
				this.router.navigate(['/campaign']);
			}
			if(!parameters.course_id) {
				alert("Please select course");
				this.router.navigate(['/course'], { queryParams : { campaign_id: parameters.campaign_id } });
			}

			this.cs.setCampaignId(parameters.campaign_id);
			
			this.courseService.setCourseId(parameters.course_id);
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
