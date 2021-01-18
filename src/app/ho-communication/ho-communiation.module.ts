import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { HoCommunicationRoutingModule } from './ho-communiation-routing.module';
import { HoCommunicationComponent } from './ho-communication.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HoCommunicationService } from '../services/ho-communication.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../app/shared/shared.module';
import { FormComponent } from './form/form.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
	imports: [
		CommonModule,
		HoCommunicationRoutingModule,
		NgbModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule,
		NgbModalModule,
		SweetAlert2Module.forRoot()
	],
	declarations: [HoCommunicationComponent, FormComponent],
	providers: [HoCommunicationService]
})
export class HoCommunicationModule {}
