import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { RolesComponent } from './roles.component';
import { FormComponent } from './form/form.component';
import { RolesRoutingModule } from './roles-routing.module';
import { RolesService } from '../services/roles.service';
import { PermissionService } from '../services/permission.service';
import { SharedModule } from '../shared/shared.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
	imports: [
		CommonModule,
		RolesRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		NgMultiSelectDropDownModule.forRoot(),
		SharedModule,
		SweetAlert2Module.forRoot()
	],
	declarations: [RolesComponent, FormComponent],
	providers: [RolesService, PermissionService]
})
export class RolesModule {}
