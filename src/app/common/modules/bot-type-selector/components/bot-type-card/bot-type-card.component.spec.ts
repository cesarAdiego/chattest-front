import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotTypeCardComponent } from './bot-type-card.component';

describe('BotTypeCardComponent', () => {
  let component: BotTypeCardComponent;
  let fixture: ComponentFixture<BotTypeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotTypeCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotTypeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
