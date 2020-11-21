import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Language } from 'src/app/entities/language';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Language[]>(`${environment.apiUrl}/languages`);
  }
}
