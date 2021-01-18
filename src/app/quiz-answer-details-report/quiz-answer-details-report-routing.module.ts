import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizAnswerDetailsReportComponent } from './quiz-answer-details-report.component';
import { RoleGuard } from '../gaurds/role.guard';

const routes: Routes = [
	{
		path: '',
		component: QuizAnswerDetailsReportComponent,
		data: {
			title: 'Quiz Answer Details Report',
			permission: 'quiz-answer-report'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class QuizAnswerDetailsReportRoutingModule {}

export const routedComponents = [QuizAnswerDetailsReportComponent];
