import { NgModule, ElementRef, ViewChild } from '@angular/core';

import { CommonModule } from '@angular/common';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { GroupRoutingModule } from './group-routing.module';
import { GroupComponent } from './group.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GroupService } from '../services/group.service';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../app/shared/shared.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
	imports: [
		CommonModule,
		GroupRoutingModule,
		NgbModule,
		FormsModule,
		ReactiveFormsModule,
		NgMultiSelectDropDownModule.forRoot(),
		SharedModule,
		NgbModalModule,
		SweetAlert2Module.forRoot()
	],
	declarations: [GroupComponent, FormComponent],
	providers: [GroupService]
})
export class GroupModule {}
