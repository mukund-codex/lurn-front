import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
	{
		path: '/home',
		title: 'Dashboard',
		icon: 'ft-home',
		class: '',
		badge: '',
		badgeClass: '',
		isExternalLink: false,
		permission: 'list-company',
		submenu: []
	},
	{
		path: '/admin/users',
		title: 'Admin',
		icon: 'ft-users',
		class: '',
		badge: '',
		badgeClass: '',
		isExternalLink: false,
		permission: 'list-admin',
		submenu: []
	},
	{
		path: '/company',
		title: 'Company',
		icon: 'ft-octagon',
		class: '',
		badge: '',
		badgeClass: '',
		isExternalLink: false,
		permission: 'list-company',
		submenu: []
	},
	{
		path: '/prospect',
		title: 'Prospect',
		icon: 'ft-package',
		class: '',
		badge: '',
		badgeClass: '',
		isExternalLink: false,
		permission: 'list-prospect',
		submenu: []
	},
	{
		path: '/campaign',
		title: 'Campaign',
		icon: 'ft-layers',
		class: '',
		badge: '',
		badgeClass: '',
		isExternalLink: false,
		permission: 'list-campaign',
		submenu: []
	},
	{
		path: '',
		title: 'Roles',
		icon: 'ft-user-plus',
		class: 'has-sub',
		badge: '',
		badgeClass: '',
		isExternalLink: false,
		submenu: [
			{
				path: '/admin/roles',
				title: 'Admin',
				icon: '',
				class: '',
				badge: '',
				badgeClass: '',
				isExternalLink: false,
				permission: 'list-admin-role',
				submenu: []
			},
			{
				path: '/manpower/roles',
				title: 'User',
				icon: '',
				class: '',
				badge: '',
				badgeClass: '',
				isExternalLink: false,
				permission: 'list-user-role',
				submenu: []
			},
		]
	},
	{
		path: '',
		title: 'Masters',
		icon: 'ft-user-plus',
		class: 'has-sub',
		badge: '',
		badgeClass: '',
		isExternalLink: false,
		submenu: [
			{
				path: '/language',
				title: 'Language',
				icon: '',
				class: '',
				badge: '',
				badgeClass: '',
				isExternalLink: false,
				permission: 'list-language',
				submenu: []
			},
			{
				path: '/dimension',
				title: 'Dimension',
				icon: '',
				class: '',
				badge: '',
				badgeClass: '',
				isExternalLink: false,
				permission: 'list-dimension',
				submenu: []
			},
			{
				path: '/designation',
				title: 'Designation',
				icon: '',
				class: '',
				badge: '',
				badgeClass: '',
				isExternalLink: false,
				permission: 'list-designation',
				submenu: []
			}
		]
	},
	{
		path: '',
		title: 'Reports',
		icon: 'ft-user-plus',
		class: 'has-sub',
		badge: '',
		badgeClass: '',
		isExternalLink: false,
		submenu: [
			{
				path: '/activity-log',
				title: 'Activity Log',
				icon: '',
				class: '',
				badge: '',
				badgeClass: '',
				isExternalLink: false,
				permission: 'activity-log',
				submenu: []
			}
		]
	}
];
