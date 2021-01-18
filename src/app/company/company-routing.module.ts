import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyComponent } from './company.component';
import { FormComponent } from './form/form.component';
import { RoleGuard } from '../gaurds/role.guard';

const routes: Routes = [
	{
		path: '',
		component: CompanyComponent,
		data: {
			title: 'Company',
			permission: 'list-company'
		}
	},
	{
		path: 'add',
		component: FormComponent,
		data: {
			title: 'Add Company',
			urlKey: 'add',
			permission: 'create-company'
		}
	},
	{
		path: 'edit/:id',
		component: FormComponent,
		data: {
			title: 'Edit Company',
			urlKey: 'edit',
			permission: 'modify-company'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CompanyRoutingModule {}

export const routedComponents = [CompanyComponent];
