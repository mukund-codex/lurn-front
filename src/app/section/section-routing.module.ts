import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SectionComponent } from './section.component';
import { FormComponent } from './form/form.component';


const routes: Routes = [
	{
		path: '',
		component: SectionComponent,
		data: {
			title: 'Section',
			permission: 'list-section'
		}
	},
	{
		path: 'add',
		component: FormComponent,
		data: {
			title: 'Add Section',
			urlKey: 'add',
			permission: 'create-section'
		}
	},
	{
		path: 'edit/:id',
		component: FormComponent,
		data: {
			title: 'Edit Section',
			urlKey: 'edit',
			permission: 'modify-section'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SectionRoutingModule {}

export const routedComponents = [SectionComponent];
