import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TemplateRoutingModule } from './template-routing.module';
import { TemplateComponent } from './template.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ColorPickerModule } from 'ngx-color-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';
import { SharedModule } from '../shared/shared.module';
import { LightboxModule } from 'ngx-lightbox';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
	imports: [
		CommonModule,
		TemplateRoutingModule,
		NgMultiSelectDropDownModule,
		NgbModule,
		FormsModule,
		SharedModule,
		NgbModalModule,
		ColorPickerModule,
		ReactiveFormsModule,
		LightboxModule,
		SweetAlert2Module.forRoot()
	],
	declarations: [TemplateComponent, FormComponent],
	providers: [
		// CompanyService,
		// CompanyModel,
	]
})
export class TemplateModule {}
