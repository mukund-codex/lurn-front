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
			permission: 'list-doctor-master'
		}
	},
	{
		path: 'add',
		component: FormComponent,
		data: {
			title: 'Add Doctor Master',
			permission: 'list-doctor-master'
		}
	},
	{
		path: 'edit/:id',
		component: FormComponent,
		data: {
			title: 'Edit Doctor Master',
			permission: 'list-doctor-master'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DoctorRoutingModule {}

export const routedComponents = [DoctorComponent];
