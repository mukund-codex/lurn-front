import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CblocksRoutingModule } from './cblocks-routing.module';
import { CblocksComponent } from './cblocks.component';
import { CblocksService } from '../services/cblocks.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ColorPickerModule } from 'ngx-color-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { FormComponent } from './form/form.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
// import { FormComponent } from './form/form.component';

@NgModule({
	imports: [
		CommonModule,
		CblocksRoutingModule,
		NgbModule,
		FormsModule,
		NgbModalModule,
		NgMultiSelectDropDownModule.forRoot(),
		ColorPickerModule,
		ReactiveFormsModule,
		SharedModule,
		SweetAlert2Module.forRoot()
	],
	declarations: [
		CblocksComponent,
		FormComponent
		// FormComponent
	],
	providers: [CblocksService]
})
export class CblocksModule {}
