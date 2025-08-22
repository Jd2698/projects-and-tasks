import { Component, Input } from '@angular/core';
import { ProjectsService } from '../services/projects.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SnackBarService } from '../../../core/services/snack-bar.service';
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
export class Form {
  @Input() projectId: string = '';

  formGroup!: FormGroup;

  constructor(
    private readonly _projectService: ProjectsService,
    private readonly _formBuilder: FormBuilder,
    private readonly _snackBarService: SnackBarService,
    private readonly _router: Router
  ) {
    this.formGroup = _formBuilder.group({
      titulo: ['', [Validators.required, noWhitespaceValidator()]],
      descripcion: ['', [Validators.required, noWhitespaceValidator()]],
    });
  }

  ngOnInit(): void {
    if (this.projectId) {
      this._projectService.getProjectById(Number(this.projectId)).subscribe({
        next: (res) => {
          if (res) {
            this.formGroup.setValue({
              titulo: res.titulo,
              descripcion: res.descripcion,
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

  onSubmit() {
    if (!this.formGroup.valid) return;

    const data = { ...this.formGroup.value, projectId: this.projectId };

    if (!this.projectId) {
      this._projectService.create(data).subscribe({
        next: () => {
          this._snackBarService.showSnackBar('successfully created!!');
          this._router.navigate(['./projects']);
        },
      });
    } else {
      data.id = this.projectId;
      this._projectService.update(data).subscribe({
        next: () => {
          this._snackBarService.showSnackBar('successfully updated!!');
          this._router.navigate(['./projects']);
        },
      });
    }
  }
}
