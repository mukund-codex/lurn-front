import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormbuildersComponent } from './formbuilders.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
	{
		path: '',
		component: FormbuildersComponent,
		data: {
			title: 'Formbuilders',
			permission: 'list-form-master'
		}
	},
	{
		path: 'add',
		component: FormComponent,
		data: {
			title: 'Formbuilders',
			permission: 'create-form-master'
		}
	},
	{
		path: 'edit/:id',
		component: FormComponent,
		data: {
			title: 'Formbuilders',
			permission: 'modify-form-master'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class FormbuildersRoutingModule {}

export const routedComponents = [FormComponent];
