import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DesignationComponent } from './designation.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
	{
		path: '',
		component: DesignationComponent,
		data: {
			title: 'Designation',
			permission: 'list-designation'
		}
	},
	{
		path: 'add',
		component: FormComponent,
		data: {
			title: 'Add Designation',
			permission: 'create-designation'
		}
	},
	{
		path: 'edit/:id',
		component: FormComponent,
		data: {
			title: 'Edit Designation',
			permission: 'modify-designation'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DesignationRoutingModule {}

export const routedComponents = [DesignationComponent];
