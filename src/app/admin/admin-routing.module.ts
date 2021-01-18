import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
	{
		path: '',
		component: AdminComponent,
		data: {
			title: 'Admin',
			permission: 'list-admin'
		}
	},
	{
		path: 'add',
		component: FormComponent,
		data: {
			title: 'Add Admin',
			urlKey: 'add',
			permission: 'create-admin'
		}
	},
	{
		path: 'edit/:id',
		component: FormComponent,
		data: {
			title: 'Edit Admin',
			urlKey: 'edit',
			permission: 'modify-admin'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule {}

export const routedComponents = [AdminComponent];
