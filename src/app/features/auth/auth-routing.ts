import { Routes } from '@angular/router';
import { authRedirectGuard } from '../../core/guards';

export const authRoutes: Routes = [
  {
    path: 'login',
    canActivate: [authRedirectGuard],
    loadComponent: () => import('./login').then((m) => m.Login),
  },
];
