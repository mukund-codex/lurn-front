import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminRolesComponent } from './admin-roles.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
	{
		path: '',
		component: AdminRolesComponent,
		data: {
			title: 'Admin Roles',
			permission: 'list-admin-role'
		}
	},
	{
		path: 'add',
		component: FormComponent,
		data: {
			title: 'Add Roles',
			urlKey: 'add',
			permission: 'create-admin-role'
		}
	},
	{
		path: 'edit/:id',
		component: FormComponent,
		data: {
			title: 'Edit Roles',
			urlKey: 'edit',
			permission: 'modify-admin-role'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminRolesRoutingModule {}

export const routedComponents = [AdminRolesComponent];
