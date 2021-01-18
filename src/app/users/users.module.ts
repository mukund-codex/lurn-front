import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ColorPickerModule } from 'ngx-color-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { FormComponent } from './form/form.component';
import { SharedModule } from '../shared/shared.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
	imports: [
		CommonModule,
		UsersRoutingModule,
		NgbModule,
		FormsModule,
		NgMultiSelectDropDownModule.forRoot(),
		ColorPickerModule,
		ReactiveFormsModule,
		SharedModule,
		SweetAlert2Module.forRoot()
	],
	declarations: [UsersComponent, FormComponent],
	providers: [
		// CompanyService,
		// CompanyModel,
	]
})
export class UsersModule {}
