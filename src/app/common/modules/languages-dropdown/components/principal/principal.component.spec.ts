import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagesDropdownComponent } from './principal.component';

describe('PrincipalComponent', () => {
  let component: LanguagesDropdownComponent;
  let fixture: ComponentFixture<LanguagesDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguagesDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguagesDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
