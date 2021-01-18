import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolesComponent } from './roles.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
	{
		path: '',
		component: RolesComponent,
		data: {
			title: ' User Roles',
			permission: 'list-user-role'
		}
	},
	{
		path: 'add',
		component: FormComponent,
		data: {
			title: 'Add Roles',
			urlKey: 'add',
			permission: 'create-user-role'
		}
	},
	{
		path: 'edit/:id',
		component: FormComponent,
		data: {
			title: 'Edit Roles',
			urlKey: 'edit',
			permission: 'modify-user-role'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class RolesRoutingModule {}

export const routedComponents = [RolesComponent];
