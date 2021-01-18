import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ColorPickerModule } from 'ngx-color-picker';

import { ProspectComponent } from './prospect.component';
import { FormComponent } from './form/form.component';
import { ProspectRoutingModule } from './prospect-routing.module';
import { ProspectService } from '../services/prospect.service';
import { SharedModule } from '../shared/shared.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
	imports: [
		CommonModule, 
		ProspectRoutingModule, 
		FormsModule, 
		ColorPickerModule, 
		ReactiveFormsModule, 
		SharedModule,
		NgMultiSelectDropDownModule,
		SweetAlert2Module.forRoot()
	],
	declarations: [ProspectComponent, FormComponent],
	providers: [ProspectService]
})
export class ProspectModule {}
