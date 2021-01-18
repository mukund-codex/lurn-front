import { Routes } from "@angular/router";
import { RoleGuard } from "../../../app/gaurds/role.guard";

// Route for content layout with sidebar, navbar and footer.

export const COURSE_ROUTES: Routes = [
	{
		path: "course-dashboard",
		canActivateChild: [RoleGuard],
		loadChildren: () => import("src/app/course-dashboard/course-dashboard.module").then((m) => m.CourseDashboardModule),
	},
	{
		path: "course-user-role",
		canActivateChild: [RoleGuard],
		loadChildren: () => import("src/app/course-user-role/course-user-role.module").then((m) => m.CourseUserRoleModule),
	},
	{
		path: "section",
		canActivateChild: [RoleGuard],
		loadChildren: () => import("src/app/section/section.module").then((m) => m.SectionModule),
	},
	{
		path: 'lesson',
		canActivateChild: [RoleGuard],
		loadChildren: () => import('src/app/lesson/lesson.module').then(m => m.LessonModule)
	},
	{
		path: 'quiz',
		canActivateChild: [RoleGuard],
		loadChildren: () => import('src/app/quiz/quiz.module').then(m => m.QuizModule)
	},
	{
		path: 'quiz-questions',
		canActivateChild: [RoleGuard],
		loadChildren: () => import('src/app/quiz-questions/quiz-questions.module').then(m => m.QuizQuestionsModule)
    }
];
