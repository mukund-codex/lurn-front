import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CblocksComponent } from './cblocks.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
	{
		path: '',
		component: CblocksComponent,
		data: {
			title: 'Module',
			permission: 'list-module'
		}
	},
	{
		path: 'add',
		component: FormComponent,
		data: {
			title: 'Add Module',
			permission: 'create-module'
		}
	},
	{
		path: 'edit/:id',
		component: FormComponent,
		data: {
			title: 'Edit Module',
			permission: 'modify-module'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CblocksRoutingModule {}

export const routedComponents = [CblocksComponent];
