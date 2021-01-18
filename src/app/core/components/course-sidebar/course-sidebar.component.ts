import { Component, OnInit, Input } from '@angular/core';
import { ROUTES } from './course-sidebar-routes.config';
import { RouteInfo } from './course-sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';

// import { LocalStorage } from '@ngx-pwa/local-storage';
import { findNode } from '@angular/compiler';
import { CampaignService } from 'src/app/services/campaign.service';
import { CourseService } from 'src/app/services/course.service';

declare let $: any;

@Component({
  selector: 'app-course-sidebar',
  templateUrl: './course-sidebar.component.html',
  styleUrls: ['./course-sidebar.component.css']
})
export class CourseSidebarComponent implements OnInit {

	currentDate: Date = new Date();
  	public menuItems: any[];
	@Input() permissions: any[];
	campaignId: string;
	courseId: string;
	currentPath: string;
	course_id: string;
	course_name: string;
	loadSidebarMenu = false;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private cs: CampaignService,
		private courseService: CourseService
	) {}

	ngOnInit() {
	
		this.campaignId = this.cs.getCampaignId();
		this.course_id = this.courseService.getCourseId();

		this.courseService.getAll({id: this.course_id}).subscribe(courseData => {
			
			this.course_name = courseData['data'][0].name;
			this.loadSidebarMenu = true;
		});

		const currentRoute = this.router.url.split('?');

		if(currentRoute.length) {
			this.currentPath = currentRoute[0];
		}
    	$.getScript('./assets/js/app-sidebar.js');
		this.menuItems = ROUTES.filter(menuItem => menuItem);

		this.menuItems.map(menu => {
			return this.permissions.map(obj => {
				this.findNode(obj.name, menu);

				if (menu.submenu.length) {
					const hasOneTrue = menu.submenu.forEach(element => {
						if (element.show === true) {
							menu.show = true;
							return;
						}
					});
				}
			});
		});
	}

	@Input() gotoRoute1(menuClass , menuPath) {
		if(menuClass == "") {
			this.currentPath = menuPath;
			if(menuPath == '/home' || menuPath == '/campaign') {
				this.router.navigate([menuPath]);
			} else {
				this.router.navigate([menuPath], { queryParams : { campaign_id: this.cs.getCampaignId(), course_id: this.courseService.getCourseId() } });
			}
		}
	}

	gotoRoute(menuClass , menuPath) {
		if(menuClass == "") {
			this.currentPath = menuPath;
			if(menuPath == '/home' || menuPath == '/campaign') {
				this.router.navigate([menuPath]);
			} else if(menuPath == '/campaign-dashboard' || menuPath == '/course') {
				this.router.navigate([menuPath], { queryParams : { campaign_id: this.cs.getCampaignId() } });
			} else {
				this.router.navigate([menuPath], { queryParams : { campaign_id: this.cs.getCampaignId(), course_id: this.courseService.getCourseId() } });
			}
		}
	}

	findNode(permission, currentNode) {
		if (permission === currentNode.permission) {
			currentNode.show = true;
			return currentNode;
		} else {
			// tslint:disable-next-line: forin
			for (const index in currentNode.submenu) {
				const node = currentNode.submenu[index];

				if (node.submenu.length) {
					findNode(permission, node);
				}

				if (node.permission === permission) {
					node.show = true;
					return node;
				}

				// return node;
			}
			return currentNode;
		}
	}

	// NGX Wizard - skip url change
	ngxWizardFunction(path: string) {
		if (path.indexOf('forms/ngx') !== -1) {
			this.router.navigate(['forms/ngx/wizard'], { skipLocationChange: false });
		}
	}

}
