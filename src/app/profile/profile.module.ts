import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProfileService } from '../services/profile.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	imports: [
		CommonModule,
		ProfileRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule,
	],
	declarations: [ProfileComponent],
	providers: [ProfileService]
})
export class ProfileModule {}
