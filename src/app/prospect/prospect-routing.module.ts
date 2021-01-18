import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProspectComponent } from './prospect.component';
import { FormComponent } from './form/form.component';
import { RoleGuard } from '../gaurds/role.guard';

const routes: Routes = [
	{
		path: '',
		component: ProspectComponent,
		data: {
			title: 'Prospect',
			permission: 'list-prospect'
		}
	},
	{
		path: 'add',
		component: FormComponent,
		data: {
			title: 'Add Prospect',
			urlKey: 'add',
			permission: 'create-admin'
		}
	},
	{
		path: 'edit/:id',
		component: FormComponent,
		data: {
			title: 'Edit Prospect',
			urlKey: 'edit',
			permission: 'modify-admin'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ProspectRoutingModule {}

export const routedComponents = [ProspectComponent];
