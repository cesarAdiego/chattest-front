import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotTypeSelectorComponent } from './bot-type-selector.component';

describe('BotTypeSelectorComponent', () => {
  let component: BotTypeSelectorComponent;
  let fixture: ComponentFixture<BotTypeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotTypeSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotTypeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
