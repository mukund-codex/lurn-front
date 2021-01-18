import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ToastrModule } from "ngx-toastr";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";

import { AppRoutingModule } from "./app-routing.module";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppComponent } from "./app.component";
import { ContentLayoutComponent } from "./core/components/layouts/content/content-layout.component";
import { FullLayoutComponent } from "./core/components/layouts/full/full-layout.component";
import { CampaignLayoutComponent } from "./core/components/layouts/campaign/campaign-layout.component";
import { CourseLayoutComponent } from "./core/components/layouts/course/course-layout.component";

import { ColorPickerModule } from "ngx-color-picker";

import { AccessComponent } from "./access/access.component";
import { FormsModule } from "@angular/forms";
import { LoginComponent } from "./access/login/login.component";
import { LoaderComponent } from "./shared/components/loader/loader.component";

import { AuthGuard } from "./gaurds/auth.guard";
import { RoleGuard } from "./gaurds/role.guard";

import { AccessService } from "./access/access.service";
import { ExcelService } from "./services/excel.service";

import { ReactiveFormsModule } from "@angular/forms";
import { MessageService } from "./services/message.service";

import { InterceptorProviders } from "./interceptors/index";
import { LoaderInterceptor } from "./interceptors/loader.interceptor";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import * as $ from "jquery";
import { CoreModule } from "./core/core.module";
import { LoaderService } from "./services/loader.service";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";

@NgModule({
	declarations: [
		AppComponent,
		LoaderComponent,
		FullLayoutComponent,
		ContentLayoutComponent,
		CampaignLayoutComponent,
		CourseLayoutComponent,
		AccessComponent,
		LoginComponent,
	],
	imports: [
		BrowserAnimationsModule,
		MatProgressSpinnerModule,
		AppRoutingModule,
		HttpClientModule,
		ColorPickerModule,
		FormsModule,
		ReactiveFormsModule,
		CoreModule,
		NgbModule,
		ToastrModule.forRoot(),
		NgMultiSelectDropDownModule.forRoot(),
		ServiceWorkerModule.register("ngsw-worker.js", { enabled: environment.production }),
	],
	providers: [
		AccessService,
		MessageService,
		ExcelService,
		AuthGuard,
		RoleGuard,
		InterceptorProviders,
		LoaderService,
		{ provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
