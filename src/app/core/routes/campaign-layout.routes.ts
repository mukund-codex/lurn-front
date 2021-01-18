import { Routes } from '@angular/router';
import { RoleGuard } from '../../../app/gaurds/role.guard';

// Route for content layout with sidebar, navbar and footer.

export const CAMPAIGN_ROUTES: Routes = [
	{
		path: 'forms',
		loadChildren: () => import('../../forms/forms.module').then(m => m.FormModule)
	},
	{
		path: 'doctor-master',
		canActivateChild: [RoleGuard],
		loadChildren: () => import('../../doctor-master/doctor.module').then(m => m.DoctorModule)
	},
	{
		path: 'cblocks',
		canActivateChild: [RoleGuard],
		loadChildren: () => import('../../cblocks/cblocks.module').then(m => m.CblocksModule)
	},
	{
		path: 'doctor',
		canActivateChild: [RoleGuard],
		loadChildren: () => import('../../doctor/doctor.module').then(m => m.DoctorModule)
	},
	{
		path: 'geography',
		canActivateChild: [RoleGuard],
		loadChildren: () => import('../../geography/geography.module').then(m => m.GeographyModule)
	},
	{
		path: 'ho-communication',
		canActivateChild: [RoleGuard],
		loadChildren: () => import('../../ho-communication/ho-communiation.module').then(m => m.HoCommunicationModule)
	},
/*	{
		path: 'section',
		canActivateChild: [RoleGuard],
		loadChildren: () => import('../../section/section.module').then(m => m.SectionModule)
	},
	{
		path: 'lesson',
		canActivateChild: [RoleGuard],
		loadChildren: () => import('../../lesson/lesson.module').then(m => m.LessonModule)
	},
	{
		path: 'quiz',
		canActivateChild: [RoleGuard],
		loadChildren: () => import('../../quiz/quiz.module').then(m => m.QuizModule)
	},
	{
		path: 'quiz-questions',
		canActivateChild: [RoleGuard],
		loadChildren: () => import('../../quiz-questions/quiz-questions.module').then(m => m.QuizQuestionsModule)
	},*/
	
	{
		path: 'manpower/users',
		canActivateChild: [RoleGuard],
		loadChildren: () => import('../../users/users.module').then(m => m.UsersModule)
	},
	{
		path: 'group',
		canActivateChild: [RoleGuard],
		loadChildren: () => import('../../group/group.module').then(m => m.GroupModule)
	},
	{
		path: 'course',
		canActivateChild: [RoleGuard],
		loadChildren: () => import('../../course/course.module').then(m => m.CourseModule)
	},
	{
		path: 'settings',
		canActivateChild: [RoleGuard],
		loadChildren: () => import('../../campaign/campaign.module').then(m => m.CampaignModule)
	},
	{
		path: 'formbuilders',
		canActivateChild: [RoleGuard],
		loadChildren: () => import('../../formbuilders-master/formbuilders.module').then(m => m.FormbuildersModule)
	},
	{
		path: 'campaign-dashboard',
		canActivateChild: [RoleGuard],
		loadChildren: () => import('src/app/campaign-dashboard/campaign-dashboard.module').then(m => m.CampaignDashboardModule)
	},
	{
		path: 'template',
		canActivateChild: [RoleGuard],
		loadChildren: () => import('src/app/template/template.module').then(m => m.TemplateModule)
	},
	{
		path: 'module-formbuilder',
		canActivateChild: [RoleGuard],
		loadChildren: () => import('src/app/module-formbuilders-master/module-formbuilders.module').then(m => m.ModuleFormbuildersModule)
	},
	{
		path: 'master',
		canActivateChild: [RoleGuard],
		loadChildren: () => import('src/app/master/master.module').then(m => m.MasterModule)
	},
	{
		path: 'live-tracker',
		canActivateChild: [RoleGuard],
		loadChildren: () => import('../../livetracker/livetracker.module').then(m => m.LivetrackerModule)
	},
	{
		path: 'course-report',
		canActivateChild: [RoleGuard],
		loadChildren: () => import('../../course-report/course-report.module').then(m => m.CourseReportModule)
	},
	{
		path: 'course-details-report',
		canActivateChild: [RoleGuard],
		loadChildren: () => import('../../course-details-report/course-details-report.module').then(m => m.CourseDetailsReportModule)
	},
	{
		path: 'quiz-report',
		canActivateChild: [RoleGuard],
		loadChildren: () => import('../../quiz-report/quiz-report.module').then(m => m.QuizReportModule)
	},
	{
		path: 'quiz-answer-report',
		canActivateChild: [RoleGuard],
		loadChildren: () => import('../../quiz-answer-report/quiz-answer-report.module').then(m => m.QuizAnswerReportModule)
	},
	{
		path: 'quiz-answer-details-report',
		canActivateChild: [RoleGuard],
		loadChildren: () => import('../../quiz-answer-details-report/quiz-answer-details-report.module').then(m => m.QuizAnswerDetailsReportModule)
	},
	{
		path: 'last-login',
		canActivateChild: [RoleGuard],
		loadChildren: () => import('../../last-login/last-login.module').then(m => m.LastLoginModule)
	},
	{
		path: 'share-download',
		canActivateChild: [RoleGuard],
		loadChildren: () => import('../../share-download/share-download.module').then(m => m.ShareDownloadModule)
	},
	{
		path: 'total-unique-form-data-report',
		canActivateChild: [RoleGuard],
		loadChildren: () => import('../../total-unique-form-data-report/total-unique-form-data-report.module').then(m => m.TotalUniqueFormDataReportModule)
	},
	{
		path: 'notification-log',
		canActivateChild: [RoleGuard],
		loadChildren: () => import('../../notification-log/notification-log.module').then(m => m.NotificationLogModule)
	},
	{
		path: 'feedback',
		canActivateChild: [RoleGuard],
		loadChildren: () => import('../../feedback/feedback.module').then(m => m.FeedbackModule)
	}
];
