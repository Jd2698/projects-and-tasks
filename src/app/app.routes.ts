import { Routes } from '@angular/router';
import { authGuard, authRedirectGuard } from './core/guards/';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [authRedirectGuard],
    loadComponent: () => import('./features/auth/login').then((m) => m.Login),
  },
  {
    path: 'projects',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/projects/projects').then((m) => m.Projects),
  },
  {
    path: 'projects/form',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/projects/form/form').then((m) => m.Form),
  },
  {
    path: 'projects/:projectId/form',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/projects/form/form').then((m) => m.Form),
  },
  {
    path: 'projects/:projectId/tasks',
    canActivate: [authGuard],
    loadComponent: () => import('./features/tasks/tasks').then((m) => m.Tasks),
  },
  {
    path: 'projects/:projectId/tasks/form',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/tasks/form/form').then((m) => m.Form),
  },
  {
    path: 'projects/:projectId/tasks/:taskId/form',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/tasks/form/form').then((m) => m.Form),
  },
  {
    path: '**',
    redirectTo: 'projects',
    pathMatch: 'full',
  },
];
