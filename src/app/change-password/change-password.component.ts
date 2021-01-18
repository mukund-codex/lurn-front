import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { PasswordService } from '../services/password.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})

export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  buildForm = false;
  title: string;
  submitted = false;
  formData: any;
  mismatchPassword = false;
  error_messages: any = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    public toasterService: ToastrService,
    private passwordService: PasswordService
    ) { }

  ngOnInit(): void {
    this.title = this.activeRoute.snapshot.data['title'];
    this.changePasswordForm = this.fb.group({
      'current_password': ['',Validators.required],
      'new_password': ['',[Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
      'new_password_confirmation': ['',[Validators.required, Validators.minLength(4), Validators.maxLength(25)]]
    });
    this.buildForm = true;
  }

  onPasswordChange() {
    this.mismatchPassword = !(this.changePasswordForm.controls['new_password'].value == this.changePasswordForm.controls['new_password_confirmation'].value);
  }

  onSubmit() {
		
		this.submitted = true;
		if (this.changePasswordForm.invalid) {
			return;
		}

		this.formData = this.passwordService.convertToFormData(this.changePasswordForm.value);
		this.passwordService.changePassword(this.formData).subscribe(
			(response: any) => {
				this.router.navigate(['/company']).then(() => {
					this.toasterService.success('Password Updated Successfully!', 'Success!', { positionClass: 'toast-top-right' });
				});
			},
			(err: HttpErrorResponse) => {
				this.handleError(err, this.changePasswordForm);
			}
		);;
	}

  handleError(err: HttpErrorResponse, form: FormGroup) {
		if (err.status === 400) {
			form.setErrors(err.error);
			this.error_messages = err.error.error;
		} else {
			alert('Problems while saving data');
		}
	}
}
