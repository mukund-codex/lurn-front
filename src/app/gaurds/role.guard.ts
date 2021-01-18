import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route, CanActivate, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable({
	providedIn: 'root'
})
export class RoleGuard implements CanActivate, CanActivateChild {
	path: ActivatedRouteSnapshot[];
	route: ActivatedRouteSnapshot;

	constructor(private router: Router) {}

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		return true;
	}

	canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		const permissionSet = JSON.parse(localStorage.getItem('userPermissions'));
		const permissionRequest: string = route.data.permission;

		const permitted = permissionSet.find(obj => obj.name === permissionRequest);

		if (permitted && permitted.name) {
			
			return true;
		}
		// navigate to not found page
		this.router.navigate(['/login']);
		return false;
	}
}
