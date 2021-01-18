import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterMappingRoutingModule } from './master-mapping-routing.module';
import { MasterMappingComponent } from './master-mapping.component';
import { DimensionService } from '../services/dimension.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ColorPickerModule } from 'ngx-color-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { FormComponent } from './form/form.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
	imports: [
		CommonModule,
		MasterMappingRoutingModule,
		NgbModule,
		FormsModule,
		NgbModalModule,
		ColorPickerModule,
		ReactiveFormsModule,
		SharedModule,
		NgMultiSelectDropDownModule
	],
	declarations: [MasterMappingComponent, FormComponent],
	providers: [DimensionService, NgbActiveModal]
})
export class MasterMappingModule { }

