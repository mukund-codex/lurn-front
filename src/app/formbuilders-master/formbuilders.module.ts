import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormbuildersRoutingModule } from './formbuilders-routing.module';
import { FormbuildersComponent } from './formbuilders.component';
import { CblocksService } from '../services/cblocks.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ColorPickerModule } from 'ngx-color-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { FormComponent } from './form/form.component';

@NgModule({
	imports: [
		CommonModule,
		FormbuildersRoutingModule,
		NgbModule,
		FormsModule,
		NgbModalModule,
		NgMultiSelectDropDownModule.forRoot(),
		ColorPickerModule,
		ReactiveFormsModule,
		SharedModule
	],
	declarations: [FormbuildersComponent, FormComponent],
	providers: [CblocksService]
})

export class FormbuildersModule {}
