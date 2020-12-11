import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Test } from 'src/app/entities/test';

@Injectable({
  providedIn: 'root'
})
export class SelectTestEventService {
  private selectTestEvent = new BehaviorSubject<Test>(undefined);
  constructor() { }

  emitEvent(test: Test) {
    this.selectTestEvent.next(test);
  }

  eventListener() {
    return this.selectTestEvent.asObservable();
  }
}
