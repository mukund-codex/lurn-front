import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MasterComponent } from './master.component';
import { MasterRoutingModule } from './master-routing.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MasterService } from '../services/master.service';
import { SharedModule } from '../shared/shared.module';
import { FormComponent } from './form/form.component';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
	imports: [CommonModule, 
		MasterRoutingModule, 
		FormsModule, 
		ReactiveFormsModule, 
		NgMultiSelectDropDownModule.forRoot(), 
		ColorPickerModule,
		SharedModule],
	declarations: [MasterComponent, FormComponent],
	providers: [MasterService]
})
export class MasterModule {}
