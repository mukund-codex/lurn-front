import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ColorPickerModule } from 'ngx-color-picker';

import { CompanyComponent } from './company.component';
import { FormComponent } from './form/form.component';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyService } from '../services/company.service';
import { SharedModule } from '../shared/shared.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
	imports: [CommonModule, CompanyRoutingModule, FormsModule, ColorPickerModule, ReactiveFormsModule, SharedModule, SweetAlert2Module.forRoot()],
	declarations: [CompanyComponent, FormComponent],
	providers: [CompanyService]
})
export class CompanyModule {}
