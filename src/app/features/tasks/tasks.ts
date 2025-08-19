import { Component, Input, OnInit } from '@angular/core';
import { Task, TasksService } from './services/tasks.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog } from '../../shared/confirmation-dialog/confirmation-dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tasks',
  imports: [MatTableModule, MatButtonModule, RouterLink],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks implements OnInit {
  @Input() projectId: string = '';
  tasks!: Task[];

  displayedColumns: string[] = ['titulo', 'estado', 'acciones'];

  constructor(
    private readonly _taskService: TasksService,
    private readonly _dialog: MatDialog,
    private readonly _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._taskService.getAll(Number(this.projectId)).subscribe({
      next: (data) => {
        this.tasks = data;
      },
    });
  }

  showSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
  }

  openConfirmDialog(taskId: number): void {
    const dialogRef = this._dialog.open(ConfirmationDialog);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._taskService.delete(taskId).subscribe({
          next: () => {
            this.showSnackBar('successfully deleted!!');
          },
        });
      }
    });
  }
}
