import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Auth } from '../services/auth';

export const authRedirectGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(Auth);
  const router = inject(Router);

  if (authService.isAuthenticatedSignal()) {
    router.navigate(['projects']);
    return false;
  }

  return true;
};
