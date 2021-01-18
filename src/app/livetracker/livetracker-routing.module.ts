import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LivetrackerComponent } from './livetracker.component';
import { RoleGuard } from '../gaurds/role.guard';

const routes: Routes = [
	{
		path: '',
		component: LivetrackerComponent,
		data: {
			title: 'Live Tracker',
			permission: 'livetracker-report'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class LivetrackerRoutingModule {}

export const routedComponents = [LivetrackerComponent];
