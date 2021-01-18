import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TemplateMappingRoutingModule } from './template-mapping-routing.module';
import { TemplateMappingComponent } from './template-mapping.component';
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
		TemplateMappingRoutingModule,
		NgbModule,
		FormsModule,
		NgbModalModule,
		ColorPickerModule,
		ReactiveFormsModule,
		SharedModule,
		NgMultiSelectDropDownModule
	],
	declarations: [TemplateMappingComponent, FormComponent],
	providers: [DimensionService, NgbActiveModal]
})
export class TemplateMappingModule {}
