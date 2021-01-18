import { Component, OnInit, Input } from '@angular/core';
import { ROUTES } from './sidebar-routes.config';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';

// import { LocalStorage } from '@ngx-pwa/local-storage';
import { findNode } from '@angular/compiler';

declare let $: any;

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
	currentDate: Date = new Date();
	public menuItems: any[];
	@Input() permissions: any[];

	constructor(
		private router: Router,
		private route: ActivatedRoute // , protected localStorage: LocalStorage
	) {}

	ngOnInit() {
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
