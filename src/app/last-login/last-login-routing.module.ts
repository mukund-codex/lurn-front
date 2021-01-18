import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LastLoginComponent } from './last-login.component';
import { RoleGuard } from '../gaurds/role.guard';

const routes: Routes = [
	{
		path: '',
		component: LastLoginComponent,
		data: {
			title: 'Last Login',
			permission: 'last-login-report'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class LastLoginRoutingModule {}

export const routedComponents = [LastLoginComponent];
