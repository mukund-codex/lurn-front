import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizAnswerReportComponent } from './quiz-answer-report.component';
import { RoleGuard } from '../gaurds/role.guard';

const routes: Routes = [
	{
		path: '',
		component: QuizAnswerReportComponent,
		data: {
			title: 'Quiz Answer Report',
			permission: 'quiz-answer-report'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class QuizAnswerReportRoutingModule {}

export const routedComponents = [QuizAnswerReportComponent];
