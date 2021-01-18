import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DimensionComponent } from './dimension.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
	{
		path: '',
		component: DimensionComponent,
		data: {
			title: 'Dimension',
			permission: 'list-dimension'
		}
	},
	{
		path: 'add',
		component: FormComponent,
		data: {
			title: 'Add Dimension',
			permission: 'create-dimension'
		}
	},
	{
		path: 'edit/:id',
		component: FormComponent,
		data: {
			title: 'Edit Dimension',
			permission: 'modify-dimension'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DimensionRoutingModule {}

export const routedComponents = [DimensionComponent];
