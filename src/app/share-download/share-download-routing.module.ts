import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShareDownloadComponent } from './share-download.component';
import { RoleGuard } from '../gaurds/role.guard';

const routes: Routes = [
	{
		path: '',
		component: ShareDownloadComponent,
		data: {
			title: 'Share and Download',
			permission: 'share-download-report'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ShareDownloadRoutingModule {}

export const routedComponents = [ShareDownloadComponent];
