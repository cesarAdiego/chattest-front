import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTestsComponent } from './select-tests.component';

describe('SelectTestsComponent', () => {
  let component: SelectTestsComponent;
  let fixture: ComponentFixture<SelectTestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectTestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
