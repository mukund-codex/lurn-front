import { Routes } from '@angular/router';
import { RoleGuard } from '../../../app/gaurds/role.guard';

// Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
	{
		path: 'forms',
		loadChildren: () => import('../../forms/forms.module').then(m => m.FormModule)
	},
	{
		path: 'company',
		canActivateChild: [RoleGuard],
		loadChildren: () => import('../../company/company.module').then(m => m.CompanyModule)
	},
	{
		path: 'prospect',
		canActivateChild: [RoleGuard],
		loadChildren: () => import('../../prospect/prospect.module').then(m => m.ProspectModule)
	},
	{
		path: 'home',
		canActivateChild: [RoleGuard],
		loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule)
	},
	{
		path: 'manpower/roles',
		canActivateChild: [RoleGuard],
		loadChildren: () => import('../../roles/roles.module').then(m => m.RolesModule)
	},
	{
		path: 'admin/roles',
		canActivateChild: [RoleGuard],
		loadChildren: () => import('../../admin-roles/admin-roles.module').then(m => m.AdminRolesModule)
	},
	{
		path: 'language',
		canActivateChild: [RoleGuard],
		loadChildren: () => import('../../language/language.module').then(m => m.LanguageModule)
	},
	{
		path: 'dimension',
		canActivateChild: [RoleGuard],
		loadChildren: () => import('../../dimension/dimension.module').then(m => m.DimensionModule)
	},
	{
		path: 'designation',
		canActivateChild: [RoleGuard],
		loadChildren: () => import('../../designation/designation.module').then(m => m.DesignationModule)
	},
	{
		path: 'admin/users',
		canActivateChild: [RoleGuard],
		loadChildren: () => import('../../admin/admin.module').then(m => m.AdminModule)
	},
	{
		path: 'campaign',
		canActivateChild: [RoleGuard],
		loadChildren: () => import('../../campaign/campaign.module').then(m => m.CampaignModule)
	},
	{
		path: 'activity-log',
		canActivateChild: [RoleGuard],
		loadChildren: () => import('../../activity-log/activity-log.module').then(m => m.ActivityLogModule)
	},
	{
		path: 'changePassword',
		canActivateChild: [RoleGuard],
		loadChildren: () => import('../../change-password/change-password.module').then(m => m.ChangePasswordModule)
	},
	{
		path: 'profile',
		canActivateChild: [RoleGuard],
		loadChildren: () => import('../../profile/profile.module').then(m => m.ProfileModule)
	}
];
