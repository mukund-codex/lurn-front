import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationLogComponent } from './notification-log.component';
import { RoleGuard } from '../gaurds/role.guard';

const routes: Routes = [
	{
		path: '',
		component: NotificationLogComponent,
		data: {
			title: 'Notification Log',
			permission: 'list-notification-log'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class NotificationLogRoutingModule {}

export const routedComponents = [NotificationLogComponent];
