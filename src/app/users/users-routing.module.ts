import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
	{
		path: '',
		component: UsersComponent,
		data: {
			title: 'Manpower',
			permission: 'list-user'
		}
	},
	{
		path: 'add',
		component: FormComponent,
		data: {
			title: 'Add User',
			urlKey: 'add',
			permission: 'create-user'
		}
	},
	{
		path: 'edit/:id',
		component: FormComponent,
		data: {
			title: 'Edit User',
			urlKey: 'edit',
			permission: 'modify-user'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class UsersRoutingModule {}

export const routedComponents = [UsersComponent];
