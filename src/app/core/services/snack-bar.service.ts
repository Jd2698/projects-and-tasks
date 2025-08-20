import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

type horizontalPositionType = 'start' | 'center' | 'end';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private _snackBar: MatSnackBar) {}

  showSnackBar(
    message: string,
    horizontalPosition: horizontalPositionType = 'end',
    duration: number = 2000,
    close: boolean = false
  ) {
    this._snackBar.open(message, close ? 'cerrrar' : '', {
      duration,
      horizontalPosition,
      verticalPosition: 'bottom',
    });
  }
}
