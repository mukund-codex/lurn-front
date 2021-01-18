import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { LanguageRoutingModule } from './language-routing.module';
import { LanguageComponent } from './language.component';
import { LanguageService } from '../services/language.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ColorPickerModule } from 'ngx-color-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { FormComponent } from './form/form.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
	imports: [
		CommonModule,
		LanguageRoutingModule,
		NgbModule,
		FormsModule,
		NgbModalModule,
		ColorPickerModule,
		ReactiveFormsModule,
		SharedModule,
		SweetAlert2Module.forRoot()
	],
	declarations: [LanguageComponent, FormComponent],
	providers: [LanguageService]
})
export class LanguageModule {}
