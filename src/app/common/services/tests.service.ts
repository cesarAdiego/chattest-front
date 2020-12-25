import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Test } from 'src/app/entities/test';
import { environment } from 'src/environments/environment';

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

  deleteTest(test: Test) {
    return this.http.delete<string[]>(`${environment.apiUrl}/tests/${test.id}`);
  }

  cloneTest(testId: number, clonedTestName: string) {
    return this.http.get<string[]>(`${environment.apiUrl}/tests/${testId}/clone/${clonedTestName}`);
  }
}
