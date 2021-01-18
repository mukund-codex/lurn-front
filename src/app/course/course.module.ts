import { NgModule, ElementRef, ViewChild } from '@angular/core';

import { CommonModule } from '@angular/common';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CourseRoutingModule } from './course-routing.module';
import { CourseComponent } from './course.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CourseService } from '../services/course.service';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../app/shared/shared.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
	imports: [
		CommonModule,
		CourseRoutingModule,
		NgbModule,
		FormsModule,
		ReactiveFormsModule,
		ColorPickerModule,
		NgMultiSelectDropDownModule.forRoot(),
		SharedModule,
		NgbModalModule,
		SweetAlert2Module.forRoot()
	],
	declarations: [CourseComponent, FormComponent],
	providers: [CourseService]
})
export class CourseModule {}
