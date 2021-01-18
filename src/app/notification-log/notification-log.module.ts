import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NotificationLogComponent } from './notification-log.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NotificationLogRoutingModule } from './notification-log-routing.module';
import { ReportsService } from '../services/reports.service';

@NgModule({
	imports: [
		CommonModule,
		NgbModule,
    	FormsModule,
    	NotificationLogRoutingModule,
		SharedModule,
		NgbModalModule
	],
	declarations: [NotificationLogComponent],
	providers: [ReportsService]
})
export class NotificationLogModule { }
