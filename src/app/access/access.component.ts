import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-access',
	template: `
		<router-outlet></router-outlet>
	`,
	styleUrls: ['./access.component.css']
})
export class AccessComponent implements OnInit {
	constructor(private router: Router) {
		if (localStorage.getItem('userToken') != null) {
			this.router.navigate(['/home']);
		}
	}

	ngOnInit() {}
}
