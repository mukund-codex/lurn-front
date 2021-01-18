import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateMappingComponent } from './template-mapping.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
	{
		path: '',
		component: TemplateMappingComponent,
		data: {
			title: 'Template Mapping',
			permission: 'list-template-input'
		}
	},
	{
		path: 'add',
		component: FormComponent,
		data: {
			title: 'Add Template Mapping',
			permission: 'create-dimension'
		}
	},
	{
		path: 'edit/:id',
		component: FormComponent,
		data: {
			title: 'Edit Template Mapping',
			permission: 'modify-dimension'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TemplateMappingRoutingModule {}

export const routedComponents = [TemplateMappingComponent];
