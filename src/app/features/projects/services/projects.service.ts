import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';

export interface Project {
  id: number;
  titulo: string;
  descripcion: string;
}

type CreateProject = Omit<Project, 'id'>;

interface ApiResponse {
  id: number;
  name: string;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _errorHandler: ErrorHandlerService
  ) {}

  urlPath: string = `https://jsonplaceholder.typicode.com/users`;

  getAll(): Observable<Project[]> {
    return this._httpClient.get<ApiResponse[]>(this.urlPath).pipe(
      catchError((error: HttpErrorResponse) => {
        this._errorHandler.handleError(error);
        throw error;
      }),
      map((data) => {
        return data.map(({ id, name, username }) => ({
          id,
          titulo: username,
          descripcion: name,
        }));
      })
    );
  }

  getProjectById(id: number): Observable<Project | undefined> {
    return this._httpClient.get<ApiResponse[]>(this.urlPath).pipe(
      catchError((error: HttpErrorResponse) => {
        this._errorHandler.handleError(error);
        throw error;
      }),
      map((data) => data.find((item) => item.id == id)),
      map((data) => {
        if (!data) {
          return;
        }

        return {
          id,
          titulo: data.username,
          descripcion: data.name,
        };
      })
    );
  }

  create({ titulo, descripcion }: CreateProject) {
    return this._httpClient
      .post(this.urlPath, {
        name: titulo,
        username: descripcion,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this._errorHandler.handleError(error);
          throw error;
        })
      );
  }

  update({ id, titulo, descripcion }: Project) {
    return this._httpClient
      .put(`${this.urlPath}/${id}`, {
        name: titulo,
        username: descripcion,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this._errorHandler.handleError(error);
          throw error;
        })
      );
  }

  delete(id: number) {
    return this._httpClient.delete(`${this.urlPath}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        this._errorHandler.handleError(error);
        throw error;
      })
    );
  }
}
