import { Component, OnInit } from '@angular/core';
import { AccessService } from '../../../../app/access/access.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

	user_id: string;
	showProfile: Boolean = false;

	constructor(private auth: AccessService) {}

	ngOnInit() {
		const userRole = localStorage.getItem('userRole');
		if(userRole !== "prospect") {
			this.showProfile = true;
		}
		this.user_id = localStorage.getItem('user_id');
	}

	logout() {
		this.auth.logout();
		// window.location.reload(true);
	}
}
