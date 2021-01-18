import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './change-password.component';

const routes: Routes = [
	{
		path: '',
		component: ChangePasswordComponent,
		data: {
			title: 'Change Password',
			permission: 'change-admin-password'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ChangePasswordRoutingModule {}

export const routedComponents = [ChangePasswordComponent];
