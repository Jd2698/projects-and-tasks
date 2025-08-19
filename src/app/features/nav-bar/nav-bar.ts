import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-nav-bar',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './nav-bar.html',
  styleUrls: ['../../app.css'],
})
export class NavBar {
  constructor(readonly authService: Auth) {}

  onLogout() {
    this.authService.logout();
  }
}
