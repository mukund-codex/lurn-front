import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizQuestionsComponent } from './quiz-questions.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
	{
		path: '',
		component: QuizQuestionsComponent,
		data: {
			title: 'Quiz Questions',
			permission: 'list-quiz'
		}
	},
	{
		path: 'add',
		component: FormComponent,
		data: {
			title: 'Add Quiz Questions',
			urlKey: 'add',
			permission: 'create-quiz'
		}
	},
	{
		path: 'edit/:id',
		component: FormComponent,
		data: {
			title: 'Edit Quiz Questions',
			urlKey: 'edit',
			permission: 'modify-quiz'
		}
	},
	{	
		path: '/:id',
		component: QuizQuestionsComponent,
		data: {
			title: 'Quiz Questions',
			permission: 'list-quiz'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class QuizQuestionsRoutingModule {}

export const routedComponents = [QuizQuestionsComponent];
