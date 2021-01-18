import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HoCommunicationComponent } from './ho-communication.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
	{
		path: '',
		component: HoCommunicationComponent,
		data: {
			title: 'HO Communication',
			permission: 'list-group'
		}
	},
	{
		path: 'add',
		component: FormComponent,
		data: {
			title: 'Add HO Communication',
			urlKey: 'add',
			permission: 'create-group'
		}
	},
	{
		path: 'edit/:id',
		component: FormComponent,
		data: {
			title: 'Edit HO Communication',
			urlKey: 'edit',
			permission: 'modify-group'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class HoCommunicationRoutingModule {}

export const routedComponents = [HoCommunicationComponent];
