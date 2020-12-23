import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OperationResult } from 'src/app/entities/operationResult';
import { Project } from 'src/app/entities/project';
import { ProjectImport } from 'src/app/features/import-project-dashboard/entities/projectImport';
import { environment } from 'src/environments/environment';

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

  public cloneProject(projectId: number, newProjectName: string) {
    return this.http.get<string[]>(`${environment.apiUrl}/projects/${projectId}/clone/${newProjectName}`);
  }

  public import(projectToImport: ProjectImport) {
    return this.http.post<string[]>(`${environment.apiUrl}/projects/import`, projectToImport);
  }

  public export(projectId: number) {
    return this.http.post(`${environment.apiUrl}/projects/${projectId}/export`, undefined, { responseType: 'blob'});
  }
}
