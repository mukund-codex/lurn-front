import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizComponent } from './quiz.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
	{
		path: '',
		component: QuizComponent,
		data: {
			title: 'Quiz',
			permission: 'list-quiz'
		}
	},
	{
		path: 'add',
		component: FormComponent,
		data: {
			title: 'Add Quiz',
			urlKey: 'add',
			permission: 'create-quiz'
		}
	},
	{
		path: 'edit/:id',
		component: FormComponent,
		data: {
			title: 'Edit Quiz',
			urlKey: 'edit',
			permission: 'modify-quiz'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class QuizRoutingModule {}

export const routedComponents = [QuizComponent];
