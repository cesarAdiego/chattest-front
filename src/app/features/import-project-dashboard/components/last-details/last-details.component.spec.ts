import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastDetailsComponent } from './last-details.component';

describe('LastDetailsComponent', () => {
  let component: LastDetailsComponent;
  let fixture: ComponentFixture<LastDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
