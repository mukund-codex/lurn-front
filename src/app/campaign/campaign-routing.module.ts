import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CampaignComponent } from './campaign.component';
import { FormComponent } from './form/form.component';
import { CampaignDashboardComponent } from '../campaign-dashboard/campaign-dashboard.component';

const routes: Routes = [
	{
		path: '',
		component: CampaignComponent,
		data: {
			title: 'Campaign',
			permission: 'list-campaign'
		}
	},
	{
		path: 'add',
		component: FormComponent,
		data: {
			title: 'Add Campaign',
			permission: 'create-campaign'
		}
	},
	{
		path: 'edit',
		component: FormComponent,
		data: {
			title: 'Edit Campaign',
			permission: 'modify-campaign'
		}
	},
	{
		path: 'dashboard',
		component: CampaignDashboardComponent,
		data: {
			title: 'Campaign Dashboard',
			permission: 'list-campaign-dashboard'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CampaignRoutingModule {}

export const routedComponents = [CampaignComponent];
