import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizReportComponent } from './quiz-report.component';
import { RoleGuard } from '../gaurds/role.guard';

const routes: Routes = [
	{
		path: '',
		component: QuizReportComponent,
		data: {
			title: 'Quiz Report',
			permission: 'quiz-report'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class QuizReportRoutingModule {}

export const routedComponents = [QuizReportComponent];
