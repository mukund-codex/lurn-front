import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DesignationRoutingModule } from './designation-routing.module';
import { DesignationComponent } from './designation.component';
import { DesignationService } from '../services/designation.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { FormComponent } from './form/form.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
	imports: [
		CommonModule,
		DesignationRoutingModule,
		NgbModule,
		FormsModule,
		NgbModalModule,
		ReactiveFormsModule,
		SharedModule,
		SweetAlert2Module.forRoot()
	],
	declarations: [DesignationComponent, FormComponent],
	providers: [DesignationService]
})
export class DesignationModule {}
