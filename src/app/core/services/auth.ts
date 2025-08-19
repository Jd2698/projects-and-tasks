import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  isAuthenticatedSignal = signal(false);

  users = [
    {
      username: 'admin',
      password: 'admin123',
    },
  ];

  constructor(private readonly _router: Router) {
    this.initializeAuthStatus();
  }

  private initializeAuthStatus() {
    const isAuthenticated = this.checkAuth();
    this.isAuthenticatedSignal.set(isAuthenticated);
  }

  login(username: string, password: string): { error: string } | void {
    const foundUser = this.users.find(
      (user) => user.username === username && user.password == password
    );

    if (!foundUser) {
      return { error: 'Username or Password is not valid' };
    }

    localStorage.setItem('auth', 'true');
    this.isAuthenticatedSignal.set(true);

    this._router.navigate(['/projects']);
  }

  checkAuth(): boolean {
    const auth = localStorage.getItem('auth');
    if (auth && auth !== 'true') {
      return false;
    }

    return true;
  }

  logout() {
    if (this.checkAuth()) {
      localStorage.setItem('auth', 'false');
      this.isAuthenticatedSignal.set(false);
      this._router.navigate(['/login']);
    }
  }
}
