import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DimensionRoutingModule } from './dimension-routing.module';
import { DimensionComponent } from './dimension.component';
import { DimensionService } from '../services/dimension.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ColorPickerModule } from 'ngx-color-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SharedModule } from '../shared/shared.module';
import { FormComponent } from './form/form.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
	imports: [
		CommonModule,
		DimensionRoutingModule,
		NgbModule,
		FormsModule,
		NgbModalModule,
		ColorPickerModule,
		ReactiveFormsModule,
		SharedModule,
		NgMultiSelectDropDownModule,
		SweetAlert2Module.forRoot()
	],
	declarations: [DimensionComponent, FormComponent],
	providers: [DimensionService, NgbActiveModal]
})
export class DimensionModule {}
