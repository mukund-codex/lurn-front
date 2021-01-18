import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { AccessService } from '../access/access.service';

@Injectable({
	providedIn: 'root'
})

export class HttpErrorInterceptor implements HttpInterceptor {
	constructor(private inj: Injector, private router: Router, public toasterService: ToastrService, private auth: AccessService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		const auth = this.inj.get(AccessService);

		return next.handle(req).pipe(
			catchError((error: HttpErrorResponse) => {
				
				if (error instanceof HttpErrorResponse) {
					
					if (error.status === 403 || error.status === 401) {
						this.auth.logout();
						this.router.navigateByUrl('/login');
					
					} else if(error.status !== 400) {
						this.toasterService.error('An Unexpected error occured', 'Server Error!', { positionClass: 'toast-top-right' });
						return throwError(error);
					}
					return throwError(error);
				
				} else {
					this.toasterService.error('Please refresh & try again', 'Unexpected Error!', { positionClass: 'toast-top-right' });
					return throwError(error);
				}
			})
		);
	}
}
