import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NavBar } from './features/nav-bar/nav-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSlideToggleModule, NavBar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'projects-and-tasks';
}
