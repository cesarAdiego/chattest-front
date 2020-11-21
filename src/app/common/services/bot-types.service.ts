import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BotType } from 'src/app/entities/botType';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BotTypesService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<BotType[]>(`${environment.apiUrl}/botTypes`);
  }
}
