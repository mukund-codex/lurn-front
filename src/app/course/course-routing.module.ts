import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseComponent } from './course.component';
import { FormComponent } from './form/form.component';
import { CourseDashboardComponent } from '../course-dashboard/course-dashboard.component';

const routes: Routes = [
	{
		path: '',
		component: CourseComponent,
		data: {
			title: 'Course',
			permission: 'list-campaign'
		}
	},
	{
		path: 'add',
		component: FormComponent,
		data: {
			title: 'Add Course',
			permission: 'create-campaign',
			urlKey: 'add'
		}
	},
	{
		path: 'edit/:id',
		component: FormComponent,
		data: {
			title: 'Edit Course',
			permission: 'modify-campaign',
			urlKey: 'edit'
		}
	},
	{
		path: 'dashboard',
		component: CourseDashboardComponent,
		data: {
			title: 'Course Dashboard',
			permission: 'list-course-dashboard'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CourseRoutingModule {}

export const routedComponents = [CourseComponent];
