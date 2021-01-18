import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterMappingComponent } from './master-mapping.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
	{
		path: '',
		component: MasterMappingComponent,
		data: {
			title: 'Master File Mapping',
			permission: 'list-template-input'
		}
	},
	{
		path: 'add',
		component: FormComponent,
		data: {
			title: 'Add Master File Mapping',
			permission: 'create-dimension'
		}
	},
	{
		path: 'edit/:id',
		component: FormComponent,
		data: {
			title: 'Edit Master File Mapping',
			permission: 'modify-dimension'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MasterMappingRoutingModule {}

export const routedComponents = [MasterMappingComponent];
