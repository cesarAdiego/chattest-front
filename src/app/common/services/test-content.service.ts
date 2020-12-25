import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TestContent } from 'src/app/entities/testContent';
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
    return this.http.put<string[]>(`${environment.apiUrl}/tests/${testId}/content`, testContent);
  }

  execute(testId: number) {
    return this.http.get(`${environment.nodeUrl}/test-content/execute/${testId}`);
  }
}
