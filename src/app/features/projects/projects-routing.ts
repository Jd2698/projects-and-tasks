import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards';

export const projectsRoutes: Routes = [
  {
    path: 'projects',
    canActivate: [authGuard],
    loadComponent: () => import('./projects').then((m) => m.Projects),
  },
  {
    path: 'projects/form',
    canActivate: [authGuard],
    loadComponent: () => import('./form/form').then((m) => m.Form),
  },
  {
    path: 'projects/:projectId/form',
    canActivate: [authGuard],
    loadComponent: () => import('./form/form').then((m) => m.Form),
  },
];
