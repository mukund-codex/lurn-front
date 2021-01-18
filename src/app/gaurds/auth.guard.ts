import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CanActivate } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	path: ActivatedRouteSnapshot[];
	route: ActivatedRouteSnapshot;

	constructor(private router: Router) {}

	canActivate(path, route): boolean {
		
		if (localStorage.getItem('userToken') != null) {
			
			return true;
		}
		
		this.router.navigate(['/login']);
		return false;
	}
}
