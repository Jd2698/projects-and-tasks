import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TasksService } from '../services/tasks.service';
import { Router, RouterLink } from '@angular/router';
import { SnackBarService } from '../../../core/services/snack-bar.service';
import { StatusValidator } from '../validators/status.validator';
import { noWhitespaceValidator } from '../../../shared/validators/no-whitespace.validator';

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
  styleUrls: ['../../../app.css'],
})
export class Form implements OnInit {
  @Input() projectId: string = '';
  @Input() taskId: string = '';

  formGroup!: FormGroup;

  constructor(
    private readonly _taskService: TasksService,
    private readonly _formBuilder: FormBuilder,
    private readonly _snackBarService: SnackBarService,
    private readonly _router: Router
  ) {
    this.formGroup = _formBuilder.group({
      titulo: ['', [Validators.required, noWhitespaceValidator()]],
      estado: ['completada', [Validators.required, StatusValidator()]],
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

  // para obtener el objeto control pasandole el nombre
  get(name: string) {
    return this.formGroup.get(name);
  }

  onCheckboxChange(estado: string) {
    const currentValue = this.formGroup.get('estado')?.value;

    this.formGroup
      .get('estado')
      ?.setValue(currentValue === estado ? null : estado);
  }

  onSubmit() {
    const data = { ...this.formGroup.value, projectId: this.projectId };

    if (!this.taskId) {
      this._taskService.create(data).subscribe({
        next: () => {
          this._snackBarService.showSnackBar('successfully created!!');
          this._router.navigate(['./projects', this.projectId, 'tasks']);
        },
      });
    } else {
      data.id = this.taskId;
      this._taskService.update(data).subscribe({
        next: () => {
          this._snackBarService.showSnackBar('successfully updated!!');
          this._router.navigate(['./projects', this.projectId, 'tasks']);
        },
      });
    }
  }
}
