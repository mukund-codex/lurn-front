import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateComponent } from './template.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
	{
		path: '',
		component: TemplateComponent,
		data: {
			title: 'Template',
			permission: 'list-template'
		}
	},
	{
		path: 'add',
		component: FormComponent,
		data: {
			title: 'Add Template',
			permission: 'create-template'
		}
	},
	{
		path: 'edit/:id',
		component: FormComponent,
		data: {
			title: 'Edit Template',
			permission: 'modify-template'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TemplateRoutingModule {}

export const routedComponents = [TemplateComponent];
