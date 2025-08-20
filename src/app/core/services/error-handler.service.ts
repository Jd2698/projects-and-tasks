import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private readonly _snackBar: MatSnackBar) {}

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Algo salió mal. Intenta de nuevo más tarde.';

    if (error.error instanceof ErrorEvent) {
      // Error de red o de cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      if (error.status === 404) {
        errorMessage = 'Recurso no encontrado';
      } else if (error.status === 500) {
        errorMessage = 'Error en el servidor, por favor intenta más tarde';
      } else {
        errorMessage = `Error ${error.status}: ${error.message}`;
      }
    }

    this._snackBar.open(errorMessage, 'Cerrar', { duration: 3000 });
  }
}
