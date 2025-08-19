import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { Project, ProjectsService } from './services/projects.service';
import { RouterLink } from "../../../../node_modules/@angular/router/router_module.d";

@Component({
  selector: 'app-projects',
  imports: [NgFor, RouterLink],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects implements OnInit {
  projects: Project[] = [];
  constructor(private projectService: ProjectsService) {}

  ngOnInit(): void {
    this.projectService.getAll().subscribe({
      next: (data) => {
        this.projects = data;
      },
    });
  }
}
