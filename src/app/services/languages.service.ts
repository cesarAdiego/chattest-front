import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Language } from '../entities/language';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Language[]>(`${environment.apiUrl}/languages`);
  }
}
