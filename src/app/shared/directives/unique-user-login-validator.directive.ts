import { Directive, Inject } from '@angular/core';
import { AsyncValidator, AbstractControl, AsyncValidatorFn, ValidationErrors, NG_ASYNC_VALIDATORS } from '@angular/forms';

import { UsersService } from '../../services/users.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

export function uniqueUserLoginValidator(userService: UsersService, user_id: string): AsyncValidatorFn {
	return (c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
		const requestData = user_id ? { id: user_id, username: c.value } : { username: c.value };
		return userService.getAll(requestData).pipe(
			map((records: any) => {
				if (!user_id) {
					return records.data && records.data.length ? { uniqueUserLogin: true } : null;
				} else {
					return records.data && records.data.length ? null : { uniqueUserLogin: true };
				}
			})
		);
	};
}

@Directive({
	selector: '[uniqueUserLogin]',
	providers: [
		{
			provide: NG_ASYNC_VALIDATORS,
			useExisting: UniqueUserLoginValidatorDirective,
			multi: true
		}
	]
})
export class UniqueUserLoginValidatorDirective implements AsyncValidator {
	constructor(private userService: UsersService, @Inject(String) private user_id: string) {}

	validate(c: AbstractControl) {
		const requestData = this.user_id ? { id: this.user_id, username: c.value } : { username: c.value };

		return this.userService.getAll(requestData).pipe(
			map((records: any) => {
				if (!this.user_id) {
					return records.data && records.data.length ? { uniqueUserLogin: true } : null;
				} else {
					return records.data && records.data.length ? null : { uniqueUserLogin: true };
				}
			})
		);
	}
}
