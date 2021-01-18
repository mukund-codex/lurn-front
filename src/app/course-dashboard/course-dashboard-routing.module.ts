import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseDashboardComponent } from './course-dashboard.component';

const routes: Routes = [
	{
		path: '',
		component: CourseDashboardComponent,
		data: {
			title: 'Course Dashboard',
			permission: 'list-course-dashboard'
		}
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CourseDashboardRoutingModule {}

export const routedComponents = [];
