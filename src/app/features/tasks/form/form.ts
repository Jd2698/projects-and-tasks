import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TasksService } from '../services/tasks.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    RouterLink,
  ],
  templateUrl: './form.html',
  styleUrls: ['./form.css', '../../../app.css'],
})
export class Form implements OnInit {
  @Input() projectId: string = '';
  @Input() taskId: string = '';

  formGroup!: FormGroup;

  constructor(
    private readonly _taskService: TasksService,
    private readonly _formBuilder: FormBuilder,
    private readonly _snackBar: MatSnackBar,
    private readonly _router: Router
  ) {
    this.formGroup = _formBuilder.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      estado: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.taskId) {
      this._taskService.getTaskById(Number(this.taskId)).subscribe({
        next: (res) => {
          if (res) {
            this.formGroup.setValue({
              titulo: res.titulo,
              estado: res.estado,
            });
          }
        },
      });
    }
  }

  get selected() {
    return this.formGroup.get('estado')?.value;
  }

  onCheckboxChange(estado: string) {
    const currentValue = this.formGroup.get('estado')?.value;

    this.formGroup
      .get('estado')
      ?.setValue(currentValue === estado ? null : estado);
  }

  showSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
  }

  onSubmit() {
    const data = { ...this.formGroup.value, projectId: this.projectId };

    if (!this.taskId) {
      this._taskService.create(data).subscribe({
        next: () => {
          this.showSnackBar('successfully created!!');
          this._router.navigate(['./tasks', 'project', this.projectId]);
        },
      });
    } else {
      data.id = this.taskId;
      this._taskService.update(data).subscribe({
        next: () => {
          this.showSnackBar('successfully updated!!');
          this._router.navigate(['./tasks', 'project', this.projectId]);
        },
      });
    }
  }
}
