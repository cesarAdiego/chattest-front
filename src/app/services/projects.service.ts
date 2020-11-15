import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Project } from '../entities/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http: HttpClient) { }

  public getAllProjects() {
    return this.http.get<Project[]>(`${environment.apiUrl}/projects`);
  }

  public createProject(project: Project) {
    return this.http.post<string[]>(`${environment.apiUrl}/projects`, project);
  }

  public deleteProject(projectId: number) {
    return this.http.delete<string[]>(`${environment.apiUrl}/projects/${projectId}`);
  }
}
