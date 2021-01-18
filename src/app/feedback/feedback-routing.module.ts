import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedbackComponent } from './feedback.component';
import { RoleGuard } from '../gaurds/role.guard';

const routes: Routes = [
	{
		path: '',
		component: FeedbackComponent,
		data: {
			title: 'Feedback Report',
			permission: 'feedback-list'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class FeedbackRoutingModule {}

export const routedComponents = [FeedbackComponent];
