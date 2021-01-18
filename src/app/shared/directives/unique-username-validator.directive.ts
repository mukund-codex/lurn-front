import { Directive, Inject } from '@angular/core';
import {
	AsyncValidator,
	AbstractControl,
	AsyncValidatorFn,
	ValidationErrors,
	NG_ASYNC_VALIDATORS
} from '@angular/forms';

import { CompanyService } from '../../services/company.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

export function uniqueUsernameValidator(
	companyService: CompanyService,
	company_id: string
): AsyncValidatorFn {
	return (
		c: AbstractControl
	):
		| Promise<ValidationErrors | null>
		| Observable<ValidationErrors | null> => {
		const requestData = company_id
			? { id: company_id, username: c.value }
			: { username: c.value };

		return companyService.getAll(requestData).pipe(
			map((records: any) => {
				if (!company_id) {
					return records.data && records.data.length
						? { uniqueUsername: true }
						: null;
				} else {
					return records.data && records.data.length
						? null
						: { uniqueUsername: true };
				}
			})
		);
	};
}

@Directive({
	selector: '[uniqueUsername]',
	providers: [
		{
			provide: NG_ASYNC_VALIDATORS,
			useExisting: UniqueUsernameValidatorDirective,
			multi: true
		}
	]
})
export class UniqueUsernameValidatorDirective implements AsyncValidator {
	constructor(
		private companyService: CompanyService,
		@Inject(String) private company_id: string
	) {}

	validate(c: AbstractControl) {
		const requestData = this.company_id
			? { id: this.company_id, username: c.value }
			: { username: c.value };

		return this.companyService.getAll(requestData).pipe(
			map((records: any) => {
				if (!this.company_id) {
					return records.data && records.data.length
						? { uniqueUsername: true }
						: null;
				} else {
					return records.data && records.data.length
						? null
						: { uniqueUsername: true };
				}
			})
		);
	}
}
