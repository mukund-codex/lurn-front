import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CampComponent } from './camp.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
	{
		path: '',
		component: CampComponent,
		data: {
			title: 'Camp',
			permission: 'list-camp'
		}
	},
	{
		path: 'add',
		component: FormComponent,
		data: {
			title: 'Add Camp',
			permission: 'create-camp'
		}
	},
	{
		path: 'edit/:id',
		component: FormComponent,
		data: {
			title: 'Edit Camp',
			permission: 'modify-camp'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CampRoutingModule {}

export const routedComponents = [CampComponent];
