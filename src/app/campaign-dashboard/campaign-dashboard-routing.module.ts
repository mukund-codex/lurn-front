import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CampaignDashboardComponent } from './campaign-dashboard.component';

const routes: Routes = [
	{
		path: '',
		component: CampaignDashboardComponent,
		data: {
			title: 'Campaign Dashboard',
			permission: 'list-campaign-dashboard'
		}
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CampaignDashboardRoutingModule {}

export const routedComponents = [];
