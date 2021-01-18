import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LanguageComponent } from './language.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
	{
		path: '',
		component: LanguageComponent,
		data: {
			title: 'Language',
			permission: 'list-language'
		}
	},
	{
		path: 'add',
		component: FormComponent,
		data: {
			title: 'Add Language',
			permission: 'create-language'
		}
	},
	{
		path: 'edit/:id',
		component: FormComponent,
		data: {
			title: 'Edit Language',
			permission: 'modify-language'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class LanguageRoutingModule {}

export const routedComponents = [LanguageComponent];
