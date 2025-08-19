import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { Project, ProjectsService } from './services/projects.service';
import { RouterLink } from '@angular/router';

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
