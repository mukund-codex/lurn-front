import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { AccessService } from '../access.service';
// import { LocalStorage } from '@ngx-pwa/local-storage';

import { concatMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/concat';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	isLoginError = false;
	subscription = Subscription;
	show: boolean = false;

	constructor(private accessService: AccessService, private router: Router) {
		
	}

	ngOnInit() {
		
	}

	OnSubmit(userName, password) {
	
		this.isLoginError = false;

		this.accessService
			.userAuthentication(userName, password)
			.pipe(
				concatMap((user: any) => {
					
					if (user.data.access_token) {
						
						localStorage.setItem('userToken', user.data.access_token);
						localStorage.setItem('refreshToken', user.data.refresh_token);

						return this.accessService.fetchPermissions(user.data.access_token);
					}

					return of({ data: [] });
				})
			)
			.subscribe(
				(response: any) => {
					if (response.data && response.data.permissions) {
						localStorage.setItem('userPermissions', JSON.stringify(response.data.permissions));
						const userRole = (response.data.roles[0].name).replace(/["']/g, "");
						localStorage.setItem('userRole', userRole);
						localStorage.setItem('user_id', response.data.id);
						if(userRole == "prospect"){
							this.router.navigate(['/campaign']);
						}else{
							this.router.navigate(['/home']);
						}
						
					} else {
						this.isLoginError = true;
					}
				},
				(err: HttpErrorResponse) => {
					this.isLoginError = true;
				}
			);
	}

	togglePassword() {
		this.show = !this.show;
	}
}
