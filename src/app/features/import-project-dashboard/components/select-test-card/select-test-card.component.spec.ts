import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTestCardComponent } from './select-test-card.component';

describe('SelectTestCardComponent', () => {
  let component: SelectTestCardComponent;
  let fixture: ComponentFixture<SelectTestCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectTestCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
