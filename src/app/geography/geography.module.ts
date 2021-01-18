import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { GeographyRoutingModule } from './geography-routing.module';
import { GeographyComponent } from './geography.component';
import { GeographyService } from '../services/geography.service';
import { FormComponent } from './form/form.component';
import { SharedModule } from '../shared/shared.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
	imports: [
		CommonModule,
		GeographyRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		NgMultiSelectDropDownModule.forRoot(),
		SharedModule,
		SweetAlert2Module.forRoot()
	],
	declarations: [GeographyComponent, FormComponent],
	providers: [GeographyService]
})
export class GeographyModule {}
