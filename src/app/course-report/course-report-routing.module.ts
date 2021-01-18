import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseReportComponent } from './course-report.component';
import { RoleGuard } from '../gaurds/role.guard';

const routes: Routes = [
	{
		path: '',
		component: CourseReportComponent,
		data: {
			title: 'Course Report',
			permission: 'course-report'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CourseReportRoutingModule {}

export const routedComponents = [CourseReportComponent];
