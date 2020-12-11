import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestListModifiedEventService {
  private testListModified = new BehaviorSubject<boolean>(undefined);
  constructor() { }

  emit() {
    this.testListModified.next(true);
  }

  eventListener() {
    return this.testListModified.asObservable();
  }
}
