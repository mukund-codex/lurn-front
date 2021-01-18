import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { FullLayoutComponent } from './core/components/layouts/full/full-layout.component';
import { CampaignLayoutComponent } from './core/components/layouts/campaign/campaign-layout.component';
import { CourseLayoutComponent } from './core/components/layouts/course/course-layout.component';
import { Full_ROUTES } from './core/routes/full-layout.routes';
import { CAMPAIGN_ROUTES } from './core/routes/campaign-layout.routes';
import { COURSE_ROUTES } from './core/routes/course-layout.routes';

import { AccessComponent } from './access/access.component';
import { LoginComponent } from './access/login/login.component';

import { AuthGuard } from './gaurds/auth.guard';

const appRoutes: Routes = [
	{
		path: 'login',
		component: AccessComponent,
		children: [{ path: '', component: LoginComponent }]
	},
	{
		path: '',
		redirectTo: '/login',
		pathMatch: 'full'
	},
	{
		path: '',
		component: FullLayoutComponent,
		data: { title: 'full Views' },
		canActivate: [AuthGuard],
		children: Full_ROUTES
	},
	{
		path: '',
		component: CampaignLayoutComponent,
		data: { title: 'campaign Views' },
		canActivate: [AuthGuard],
		children: CAMPAIGN_ROUTES
	},
	{
		path: '',
		component: CourseLayoutComponent,
		data: { title: 'course Views' },
		canActivate: [AuthGuard],
		children: COURSE_ROUTES
	},
	{
		path: '**',
		redirectTo: '/login',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes, {
			preloadingStrategy: PreloadAllModules
		})
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
