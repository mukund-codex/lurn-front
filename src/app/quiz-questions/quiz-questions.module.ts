import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { QuizQuestionsRoutingModule } from './quiz-questions-routing.module';
import { QuizQuestionsComponent } from './quiz-questions.component';
import { QuizQuestionsService } from '../services/quiz-questions.service';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
	imports: [
		CommonModule,
		QuizQuestionsRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		NgMultiSelectDropDownModule.forRoot(),
		SharedModule,
		SweetAlert2Module.forRoot()
	],
	declarations: [QuizQuestionsComponent, FormComponent],
	providers: [QuizQuestionsService]
})
export class QuizQuestionsModule {}
