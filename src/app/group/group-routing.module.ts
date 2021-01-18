import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupComponent } from './group.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
	{
		path: '',
		component: GroupComponent,
		data: {
			title: 'Group',
			permission: 'list-group'
		}
	},
	{
		path: 'add',
		component: FormComponent,
		data: {
			title: 'Add Group',
			permission: 'create-group'
		}
	},
	{
		path: 'edit/:id',
		component: FormComponent,
		data: {
			title: 'Edit Group',
			permission: 'modify-group'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class GroupRoutingModule {}

export const routedComponents = [GroupComponent];
