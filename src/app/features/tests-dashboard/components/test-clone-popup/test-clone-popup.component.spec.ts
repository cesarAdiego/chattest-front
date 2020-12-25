import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestClonePopupComponent } from './test-clone-popup.component';

describe('TestClonePopupComponent', () => {
  let component: TestClonePopupComponent;
  let fixture: ComponentFixture<TestClonePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestClonePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestClonePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
