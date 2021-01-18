import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomRequestComponent } from './custom-request.component';

const routes: Routes = [
	{
		path: '',
		component: CustomRequestComponent,
		data: {
			title: 'Custom Request List',
			permission: 'list-custom-request'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CustomRequestRoutingModule {}

export const routedComponents = [CustomRequestComponent];
