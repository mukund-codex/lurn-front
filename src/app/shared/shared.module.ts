import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { UiSwitchModule } from "ngx-toggle-switch";
import { CustomFormsModule } from "ngx-custom-validators";

import { ActionbtnsComponent } from "./components/actionbtns/actionbtns.component";
import { UniqueEmailValidatorDirective } from "./directives/unique-email-validator.directive";
import { UniqueUsernameValidatorDirective } from "./directives/unique-username-validator.directive";
import { UniqueUserLoginValidatorDirective } from "./directives/unique-user-login-validator.directive";
import { TopbarComponent } from "../topbar/topbar.component";
import { CourseTopbarComponent } from "../course-topbar/course-topbar.component";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";

@NgModule({
	exports: [
		CommonModule,
		ActionbtnsComponent,
		TopbarComponent,
		CourseTopbarComponent,
		UniqueEmailValidatorDirective,
		UniqueUsernameValidatorDirective,
		UniqueUserLoginValidatorDirective,
		NgbModule,
		UiSwitchModule,
		CKEditorModule,
	],
	imports: [RouterModule, CommonModule, NgbModule, FormsModule, NgMultiSelectDropDownModule, CustomFormsModule, SweetAlert2Module, CKEditorModule],
	declarations: [
		ActionbtnsComponent,
		UniqueEmailValidatorDirective,
		UniqueUsernameValidatorDirective,
		UniqueUserLoginValidatorDirective,
		TopbarComponent,
		CourseTopbarComponent,
	],
})
export class SharedModule {}
