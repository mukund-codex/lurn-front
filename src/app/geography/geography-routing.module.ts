import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeographyComponent } from './geography.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
	{
		path: '',
		component: GeographyComponent,
		data: {
			title: 'Geography',
			permission: 'list-geography'
		}
	},
	{
		path: 'add',
		component: FormComponent,
		data: {
			title: 'Add Geography',
			urlKey: 'add',
			permission: 'create-geography'
		}
	},
	{
		path: 'edit/:id',
		component: FormComponent,
		data: {
			title: 'Edit Geography',
			urlKey: 'edit',
			permission: 'modify-geography'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class GeographyRoutingModule {}

export const routedComponents = [GeographyComponent];
