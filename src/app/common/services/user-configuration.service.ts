import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserConfiguration } from 'src/app/entities/userConfiguration';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserConfigurationService {

  constructor(private http: HttpClient) { }

  async Get() {
    return this.http.get<UserConfiguration>(`${environment.apiUrl}/configuration`).toPromise();
  }

  Put(userConfiguration: UserConfiguration) {
    return this.http.put<string[]>(`${environment.apiUrl}/configuration`, userConfiguration);
  }
}
