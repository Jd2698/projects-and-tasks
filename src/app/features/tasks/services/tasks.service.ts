import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

export interface Task {
  id: number;
  projectId: number;
  titulo: string;
  estado: 'completada' | 'no completada';
}

export type CreateTask = Omit<Task, 'id'>;

interface ApiResponse {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  urlPath: string = `https://jsonplaceholder.typicode.com/todos`;

  constructor(private readonly _httpClient: HttpClient) {}

  getAll(projectId: number): Observable<Task[]> {
    return this._httpClient.get<ApiResponse[]>(this.urlPath).pipe(
      catchError(this.handleError),
      map((data) => data.filter((item) => item.userId === projectId)),
      map((data) => {
        return data.map(({ id, userId, title, completed }) => ({
          id,
          projectId: userId,
          titulo: title,
          estado: completed ? 'completada' : 'no completada',
        }));
      })
    );
  }

  getTaskById(id: number): Observable<Task | undefined> {
    return this._httpClient.get<ApiResponse[]>(this.urlPath).pipe(
      catchError(this.handleError),
      map((data) => data.find((item) => item.id == id)),
      map((data) => {
        if (!data) {
          return;
        }

        return {
          id,
          projectId: data.userId,
          titulo: data.title,
          estado: data.completed ? 'completada' : 'no completada',
        };
      })
    );
  }

  create({ projectId, titulo, estado }: CreateTask) {
    const completed = estado == 'completada' ? true : false;

    return this._httpClient
      .post(this.urlPath, {
        title: titulo,
        userId: projectId,
        completed,
      })
      .pipe(catchError(this.handleError));
  }

  update({ id, projectId, titulo, estado }: Task) {
    const completed = estado == 'completada' ? true : false;

    return this._httpClient
      .put(`${this.urlPath}/${id}`, {
        title: titulo,
        userId: projectId,
        completed,
      })
      .pipe(catchError(this.handleError));
  }

  delete(id: number) {
    return this._httpClient
      .delete(`${this.urlPath}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error inesperado';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      errorMessage = `Error del servidor: ${error.status} - ${error.message}`;
    }

    return throwError(errorMessage);
  }
}
