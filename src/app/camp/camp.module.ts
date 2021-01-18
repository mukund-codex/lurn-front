import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CampRoutingModule } from './camp-routing.module';
import { CampComponent } from './camp.component';
import { CampService } from '../services/camp.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ColorPickerModule } from 'ngx-color-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ModuleListComponent } from './module-list/module-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	imports: [
		CommonModule,
		CampRoutingModule,
		NgbModule,
		FormsModule,
		NgbModalModule,
		ColorPickerModule,
		ReactiveFormsModule,
		SharedModule,
		NgMultiSelectDropDownModule
	],
	declarations: [CampComponent, FormComponent, ModuleListComponent],
	providers: [CampService, NgbActiveModal]
})
export class CampModule {}
