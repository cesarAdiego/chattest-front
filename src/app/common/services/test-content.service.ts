import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OperationResult } from 'src/app/entities/operationResult';
import { Test } from 'src/app/entities/test';
import { TestContent } from 'src/app/entities/testContent';
import { TestExecutionResult } from 'src/app/features/tests-dashboard/entities/testExecutionResult';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestContentService {

  constructor(private http: HttpClient) { }

  get(testId: number) {
    return this.http.get<TestContent>(`${environment.apiUrl}/tests/${testId}/content`);
  }

  put(testId: number, testContent: TestContent) {
    return this.http.put<OperationResult<TestContent>>(`${environment.apiUrl}/tests/${testId}/content`, testContent);
  }

  execute(test: Test) {
    return this.http.post<TestExecutionResult>(`${environment.nodeUrl}/test-content/execute`, test);
  }
}
