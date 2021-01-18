import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LessonComponent } from './lesson.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
	{
		path: '',
		component: LessonComponent,
		data: {
			title: 'Lesson',
			permission: 'list-section'
		}
	},
	{
		path: 'add',
		component: FormComponent,
		data: {
			title: 'Add Lesson',
			urlKey: 'add',
			permission: 'create-lesson'
		}
	},
	{
		path: 'edit/:id',
		component: FormComponent,
		data: {
			title: 'Edit Lesson',
			urlKey: 'edit',
			permission: 'modify-lesson'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class LessonRoutingModule {}

export const routedComponents = [LessonComponent];
