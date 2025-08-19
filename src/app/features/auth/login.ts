import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Auth } from '../../core/services/auth';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  formGroup!: FormGroup;

  constructor(
    private readonly authService: Auth,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.formGroup = formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required]],
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
  }

  onSubmit() {
    const { username, password } = this.formGroup.value;

    const res = this.authService.login(username, password);

    if (res?.error) {
      this.openSnackBar(res.error);
    }
  }
}
