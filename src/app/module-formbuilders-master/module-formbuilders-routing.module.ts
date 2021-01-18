import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormbuildersComponent } from './module-formbuilders.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
	{
		path: '',
		component: FormbuildersComponent,
		data: {
			title: 'Formbuilders',
			permission: 'list-form-secondary'
		}
	},
	{
		path: 'add',
		component: FormComponent,
		data: {
			title: 'Formbuilders',
			permission: 'create-form-secondary'
		}
	},
	{
		path: 'edit/:id',
		component: FormComponent,
		data: {
			title: 'Formbuilders',
			permission: 'modify-form-secondary'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class FormbuildersRoutingModule {}

export const routedComponents = [FormComponent];
