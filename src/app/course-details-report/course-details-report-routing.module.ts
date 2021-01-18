import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseDetailsReportComponent } from './course-details-report.component';
import { RoleGuard } from '../gaurds/role.guard';

const routes: Routes = [
	{
		path: '',
		component: CourseDetailsReportComponent,
		data: {
			title: 'Course Details Report',
			permission: 'course-details-report'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CourseDetailsReportRoutingModule {}

export const routedComponents = [CourseDetailsReportComponent];
