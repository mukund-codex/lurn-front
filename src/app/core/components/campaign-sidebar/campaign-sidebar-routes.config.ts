import { RouteInfo } from './campaign-sidebar.metadata';

export const ROUTES: RouteInfo[] = [
	{
		path: '/home',
		title: 'Main Dashboard',
		icon: 'ft-chevrons-left',
		class: '',
		badge: '',
		badgeClass: '',
		isExternalLink: false,
		permission: 'list-company',
		submenu: []
	},
	{
		path: '/campaign-dashboard',
		title: 'Dashboard',
		icon: 'ft-server',
		class: '',
		badge: '',
		badgeClass: '',
		isExternalLink: false,
		permission: 'list-campaign-dashboard',
		submenu: []
	},
	{
		path: '/ho-communication',
		title: 'HO Communication',
		icon: 'ft-bell',
		class: '',
		badge: '',
		badgeClass: '',
		isExternalLink: false,
		permission: 'list-group',
		submenu: [],
	},
	{
		path: '/geography',
		title: 'Geography',
		icon: 'ft-map-pin',
		class: '',
		badge: '',
		badgeClass: '',
		isExternalLink: false,
		permission: 'list-geography',
		submenu: []
	},
	{
		path: '/manpower/users',
		title: 'Manpower',
		icon: 'ft-users',
		class: '',
		badge: '',
		badgeClass: '',
		isExternalLink: false,
		permission: 'list-user',
		submenu: []
	}, 
	{
		path: '/group',
		title: 'Group',
		icon: 'ft-layers',
		class: '',
		badge: '',
		badgeClass: '',
		isExternalLink: false,
		permission: 'list-group',
		submenu: []
	},
	{
		path: '/course',
		title: 'Courses',
		icon: 'ft-server',
		class: '',
		badge: '',
		badgeClass: '',
		isExternalLink: false,
		permission: 'list-course',
		submenu: []
	},
	{
		path: '',
		title: 'Form Builders',
		icon: 'ft-user-plus',
		class: 'has-sub',
		badge: '',
		badgeClass: '',
		isExternalLink: false,
		submenu: [
			{
				path: '/formbuilders',
				title: 'Form',
				icon: '',
				class: '',
				badge: '',
				badgeClass: '',
				isExternalLink: false,
				permission: 'list-form-master',
				submenu: []
			},
			{
				path: '/doctor',
				title: 'Data',
				icon: '',
				class: '',
				badge: '',
				badgeClass: '',
				isExternalLink: false,
				permission: 'list-doctor',
				submenu: []
			},
		]
	},
	{
		path: '/cblocks',
		title: 'Module',
		icon: 'ft-layers',
		class: '',
		badge: '',
		badgeClass: '',
		isExternalLink: false,
		permission: 'list-module',
		submenu: []
	},
	{
		path: '/settings/edit',
		title: 'Settings',
		icon: 'ft-settings',
		class: '',
		badge: '',
		badgeClass: '',
		isExternalLink: false,
		permission: 'modify-campaign',
		submenu: []
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
				path: '/course-report',
				title: 'Course Report',
				icon: '',
				class: '',
				badge: '',
				badgeClass: '',
				isExternalLink: false,
				permission: 'course-report',
				submenu: []
			},
			{
				path: '/quiz-report',
				title: 'Quiz Report',
				icon: '',
				class: '',
				badge: '',
				badgeClass: '',
				isExternalLink: false,
				permission: 'quiz-report',
				submenu: []
			},
			{
				path: '/last-login',
				title: 'Last Login',
				icon: '',
				class: '',
				badge: '',
				badgeClass: '',
				isExternalLink: false,
				permission: 'last-login-report',
				submenu: []
			},
			{
			  path: '/feedback',
			  title: 'Feedback Report',
			  icon: '',
			  class: '',
			  badge: '',
			  badgeClass: '',
			  isExternalLink: false,
			  permission: 'feedback-list',
			  submenu: [],
			},
			/*{
				path: '/share-download',
				title: 'Share and Download',
				icon: '',
				class: '',
				badge: '',
				badgeClass: '',
				isExternalLink: false,
				permission: 'share-download-report',
				submenu: []
			},
			{
				path: '/total-unique-form-data-report',
				title: 'Total Unique Form Data',
				icon: '',
				class: '',
				badge: '',
				badgeClass: '',
				isExternalLink: false,
				permission: 'total-unique-form-data-report',
				submenu: []
			},
			{
				path: '/notification-log',
				title: 'Notification Log',
				icon: '',
				class: '',
				badge: '',
				badgeClass: '',
				isExternalLink: false,
				permission: 'list-notification-log',
				submenu: []
			},*/
		]
	}
];
