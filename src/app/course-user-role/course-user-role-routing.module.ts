import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseUserRoleComponent } from './course-user-role.component';
import { FormComponent } from './form/form.component';


const routes: Routes = [
	{
		path: '',
		component: CourseUserRoleComponent,
		data: {
			title: 'Course User Role',
			permission: 'list-course-user-role'
		}
	},
	{
		path: 'add',
		component: FormComponent,
		data: {
			title: 'Add User Role',
			urlKey: 'add',
			permission: 'create-course-user-role'
		}
	},
	{
		path: 'edit/:id',
		component: FormComponent,
		data: {
			title: 'Edit User Role',
			urlKey: 'edit',
			permission: 'modify-course-user-role'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CourseUserRoleRoutingModule {}

export const routedComponents = [CourseUserRoleComponent];
