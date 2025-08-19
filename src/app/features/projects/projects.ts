import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { Project, ProjectsService } from './services/projects.service';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog } from '../../shared/confirmation-dialog/confirmation-dialog';

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
    private readonly _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._projectService.getAll().subscribe({
      next: (data) => {
        this.projects = data;
      },
      error: (err) => {
        this.showSnackBar(err);
      },
    });
  }

  trackById(index: number, item: Project): number {
    return item.id;
  }

  showSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
  }

  openConfirmDialog(projectId: number): void {
    const dialogRef = this._dialog.open(ConfirmationDialog);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._projectService.delete(projectId).subscribe({
          next: () => {
            this.showSnackBar('successfully deleted!!');
          },
          error: (err) => {
            this.showSnackBar(err);
          },
        });
      }
    });
  }
}
