import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Test } from '../entities/test';

@Injectable({
  providedIn: 'root'
})
export class TestsService {

  constructor(private http: HttpClient) { }

  getAllTestsFromProject(projectId: number) {
    return this.http.get<Test[]>(`${environment.apiUrl}/projects/${projectId}/tests`);
  }

  createTest(test: Test) {
    return this.http.post<string[]>(`${environment.apiUrl}/projects/${test.projectId}/tests`, test);
  }
}
