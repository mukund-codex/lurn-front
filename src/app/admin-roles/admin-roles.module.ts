import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { AdminRolesComponent } from './admin-roles.component';
import { FormComponent } from './form/form.component';
import { AdminRolesRoutingModule } from './admin-roles-routing.module';
import { AdminRolesService } from '../services/admin-roles.service';
import { AdminPermissionService } from '../services/admin-permission.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	imports: [CommonModule, AdminRolesRoutingModule, FormsModule, ReactiveFormsModule, NgMultiSelectDropDownModule.forRoot(), SharedModule],
	declarations: [AdminRolesComponent, FormComponent],
	providers: [AdminRolesService, AdminPermissionService]
})
export class AdminRolesModule {}
