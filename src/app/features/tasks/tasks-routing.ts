import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards';

export const tasksRoutes: Routes = [
  {
    path: 'projects/:projectId/tasks',
    canActivate: [authGuard],
    loadComponent: () => import('./tasks').then((m) => m.Tasks),
  },
  {
    path: 'projects/:projectId/tasks/form',
    canActivate: [authGuard],
    loadComponent: () => import('./form/form').then((m) => m.Form),
  },
  {
    path: 'projects/:projectId/tasks/:taskId/form',
    canActivate: [authGuard],
    loadComponent: () => import('./form/form').then((m) => m.Form),
  },
];
