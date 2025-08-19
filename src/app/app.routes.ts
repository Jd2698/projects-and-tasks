import { Routes } from '@angular/router';
import { authGuard, authRedirectGuard } from './core/guards/';
import { authRoutes } from './features/auth/auth-routing';
import { projectsRoutes } from './features/projects/projects-routing';
import { tasksRoutes } from './features/tasks/tasks-routing';

export const routes: Routes = [
  ...authRoutes,
  ...projectsRoutes,
  ...tasksRoutes,
  {
    path: '**',
    redirectTo: 'projects',
    pathMatch: 'full',
  },
];
