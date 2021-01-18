import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorComponent } from './doctor.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
	{
		path: '',
		component: DoctorComponent,
		data: {
			title: 'Doctor',
			permission: 'list-doctor'
		}
	},
	{
		path: 'add',
		component: FormComponent,
		data: {
			title: 'Add Doctor',
			urlKey: 'add',
			permission: 'create-doctor'
		}
	},
	{
		path: 'edit/:id',
		component: FormComponent,
		data: {
			title: 'Edit Doctor',
			urlKey: 'edit',
			permission: 'modify-doctor'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DoctorRoutingModule {}

export const routedComponents = [DoctorComponent];
