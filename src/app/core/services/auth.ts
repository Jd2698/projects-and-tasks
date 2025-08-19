import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private readonly router: Router) {}

  users = [
    {
      username: 'admin',
      password: 'admin123',
    },
  ];

  login(username: string, password: string): { error: string } | void {
    const foundUser = this.users.find(
      (user) => user.username === username && user.password == password
    );

    if (!foundUser) {
      return { error: 'Username or Password is not valid' };
    }

    localStorage.setItem('auth', 'true');
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
    }
  }
}
