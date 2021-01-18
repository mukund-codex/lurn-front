import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TotalUniqueFormDataReportComponent } from './total-unique-form-data-report.component';

const routes: Routes = [
	{
		path: '',
		component: TotalUniqueFormDataReportComponent,
		data: {
			title: 'Total Unique Form Data Report',
			permission: 'total-unique-form-data-report'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TotalUniqueFormDataRoutingModule {}

export const routedComponents = [TotalUniqueFormDataReportComponent];
