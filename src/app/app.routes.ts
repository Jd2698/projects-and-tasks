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
    path: '**',
    redirectTo: 'projects',
    pathMatch: 'full',
  },
];
