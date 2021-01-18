import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomRequestRoutingModule } from './custom-request-routing.module';
import { CustomRequestComponent } from './custom-request.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomRequestService } from '../services/custom-request.service';
import { SharedModule } from '../../app/shared/shared.module';

@NgModule({
	imports: [CommonModule, CustomRequestRoutingModule, NgbModule, SharedModule, NgbModalModule],
	declarations: [CustomRequestComponent],
	providers: [CustomRequestService]
})
export class CustomRequestModule {}
