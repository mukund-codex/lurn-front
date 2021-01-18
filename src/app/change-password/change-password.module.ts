import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { ChangePasswordComponent } from './change-password.component';
import { CblocksService } from '../services/cblocks.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	imports: [
		CommonModule,
		ChangePasswordRoutingModule,
		NgbModule,
		FormsModule,
		NgbModalModule,
		ReactiveFormsModule,
		SharedModule,
	],
	declarations: [
		ChangePasswordComponent,
	],
	providers: [CblocksService]
})
export class ChangePasswordModule {}
