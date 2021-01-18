import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { CourseUserRoleRoutingModule } from './course-user-role-routing.module';
import { CourseUserRoleComponent } from './course-user-role.component';
import { SectionService } from '../services/section.service';
import { FormComponent } from './form/form.component';
import { SharedModule } from '../shared/shared.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
	imports: [
		CommonModule,
		CourseUserRoleRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		NgMultiSelectDropDownModule.forRoot(),
		SharedModule,
		SweetAlert2Module.forRoot()
	],
	declarations: [CourseUserRoleComponent, FormComponent],
	providers: [SectionService]
})
export class CourseUserRoleModule {}
