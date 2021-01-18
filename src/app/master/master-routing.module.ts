import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterComponent } from './master.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
	{
		path: '',
		component: MasterComponent,
		data: {
			title: 'Master',
			permission: 'list-masterfile'
		}
	},
	{
		path: 'add',
		component: FormComponent,
		data: {
			title: 'Add Master File',
			permission: 'create-masterfile'
		}
	},
	{
		path: 'edit/:id',
		component: FormComponent,
		data: {
			title: 'Edit Master File',
			permission: 'modify-masterfile'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MasterRoutingModule {}

export const routedComponents = [MasterComponent];
