import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from '../services/profile.service';
import { DateValidator } from '../shared/date.validator';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  title: string;
  profileForm: FormGroup;
  buildForm = false;
  submitted = false;
  formData: any;
  error_messages: any = [];
  user_id: string;
  minDate = {};
	maxDate = {};

  constructor(
    private activeRoute: ActivatedRoute,
    private adminService: AdminService,
    private fb: FormBuilder,
    private toasterService: ToastrService,
    private profileService: ProfileService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.title = this.activeRoute.snapshot.data['title'];

    this.user_id = localStorage.getItem('user_id');
    const date = new Date();
		date.setDate(date.getDate() - 1);
		this.minDate = { year: date.getFullYear() - 100, month: 1, day: 1 };
		this.maxDate={year:date.getFullYear(),month: (date.getMonth() + 1), day: (date.getDate()) };

    this.adminService.show(this.user_id).subscribe(result => {
      if (result['data'][0]) {
        this.profileForm = this.create_form(result['data'][0]);
        this.buildForm = true;
      }
    });

  }

  create_form(data: any) {

    let dob = [];
		if (data) {
			if(data.dob) {
				dob = data.dob.split('-');
			}
		}

    return this.fb.group({
      first_name: [data ? data.first_name : null, [Validators.required, Validators.pattern('^([a-zA-Z ])+$'), Validators.minLength(3), Validators.maxLength(20)]],
			last_name: [data ? data.last_name : null, [Validators.required, Validators.pattern('^([a-zA-Z ])+$'), Validators.minLength(3), Validators.maxLength(20)]],
			email: [data ? data.email : null, [Validators.maxLength(100), Validators.email]],
			dob: [
				data
					? {
							day: +dob[2],
							month: +dob[1],
							year: +dob[0]
					  }
					: null,
				[DateValidator.dateVaidator]
			],
			username: [
				data ? data.username : '',
				[Validators.required, Validators.pattern('^([a-zA-Z0-9])+$'),
				Validators.minLength(6), Validators.maxLength(50)]
			],
			mobile: [data ? data.mobile : null, [Validators.pattern('^[7-9]{1}([0-9]){9}$')]],
    });
  }

  onSubmit() {
		
		this.submitted = true;
		if (this.profileForm.invalid) {
			return;
		}
    
    if(!this.profileForm.value.email) {
      delete this.profileForm.value.email;
    }
    if(!this.profileForm.value.mobile) {
      delete this.profileForm.value.mobile;
    }
    if(!this.profileForm.value.dob) {
      delete this.profileForm.value.dob;
    }
    
    this.formData = this.profileService.convertToFormData(this.profileForm.value);
    

		this.profileService.update_profile(this.formData, this.user_id).subscribe(
			(response: any) => {
				this.router.navigate(['/home']).then(() => {
					this.toasterService.success('Profile Updated Successfully!', 'Success!', { positionClass: 'toast-top-right' });
				});
			},
			(err: HttpErrorResponse) => {
				this.handleError(err, this.profileForm);
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
