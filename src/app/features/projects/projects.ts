import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { Project, ProjectsService } from './services/projects.service';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog } from '../../shared/confirmation-dialog/confirmation-dialog';
import { SnackBarService } from '../../core/services/snack-bar.service';

@Component({
  selector: 'app-projects',
  imports: [NgFor, RouterLink, MatButtonModule],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css', '../../app.css'],
})
export class Projects implements OnInit {
  projects: Project[] = [];

  constructor(
    private _projectService: ProjectsService,
    private readonly _dialog: MatDialog,
    private readonly _snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this._projectService.getAll().subscribe({
      next: (data) => {
        this.projects = data;
      },
    });
  }

  trackById(index: number, item: Project): number {
    return item.id;
  }

  openConfirmDialog(projectId: number): void {
    const dialogRef = this._dialog.open(ConfirmationDialog);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._projectService.delete(projectId).subscribe({
          next: () => {
            this._snackBarService.showSnackBar('successfully deleted!!');
          },
        });
      }
    });
  }
}
