import { Component, OnInit, Input } from '@angular/core';
import { ROUTES } from './campaign-sidebar-routes.config';
import { RouteInfo } from './campaign-sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';

// import { LocalStorage } from '@ngx-pwa/local-storage';
import { findNode } from '@angular/compiler';
import { CampaignService } from 'src/app/services/campaign.service';

declare let $: any;

@Component({
  selector: 'app-campaign-sidebar',
  templateUrl: './campaign-sidebar.component.html',
  styleUrls: ['./campaign-sidebar.component.css']
})
export class CampaignSidebarComponent implements OnInit {
	currentDate: Date = new Date();

  public menuItems: any[];
	@Input() permissions: any[];
	campaignId: string;
	currentPath: string;

	constructor(
		private router: Router,
		private route: ActivatedRoute, // , protected localStorage: LocalStorage
		private cs: CampaignService
	) {}

	ngOnInit() {
	
		this.campaignId = this.cs.getCampaignId();
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
			if(menuPath == '/home') {
				this.router.navigate([menuPath]);
			} else {
				this.router.navigate([menuPath], { queryParams : { campaign_id: this.cs.getCampaignId() } });
			}
		}
	}

	gotoRoute(menuClass , menuPath) {
		if(menuClass == "") {
			this.currentPath = menuPath;
			if(menuPath == '/home') {
				this.router.navigate([menuPath]);
			} else {
				this.router.navigate([menuPath], { queryParams : { campaign_id: this.cs.getCampaignId() } });
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
