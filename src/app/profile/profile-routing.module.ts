import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
	{
		path: '',
		component: ProfileComponent,
		data: {
			title: 'Edit Profile',
			permission: 'update-admin-profile'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ProfileRoutingModule {}

export const routedComponents = [ProfileComponent];
