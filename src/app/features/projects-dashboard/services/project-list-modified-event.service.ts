import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectListModifiedEventService {
  private projectListModified = new BehaviorSubject<boolean>(undefined);
  constructor() { }

  emit() {
    this.projectListModified.next(true);
  }

  eventListener() {
    return this.projectListModified.asObservable();
  }
}
