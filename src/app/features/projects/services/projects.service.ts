import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface Project {
  id: number;
  titulo: string;
  descripcion: string;
}

interface ApiResponse {
  id: number;
  name: string;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private readonly _httpClient: HttpClient) {}

  urlPath: string = `https://jsonplaceholder.typicode.com/users`;

  getAll(): Observable<Project[]> {
    return this._httpClient.get<ApiResponse[]>(this.urlPath).pipe(
      map((data) => {
        return data.map(({ id, name, username }) => ({
          id,
          titulo: username,
          descripcion: name,
        }));
      })
    );
  }
}
