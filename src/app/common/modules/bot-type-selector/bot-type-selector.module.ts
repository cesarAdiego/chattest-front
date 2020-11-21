import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotTypeSelectorComponent } from './components/principal/bot-type-selector.component';

import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { BotTypeCardComponent } from './components/bot-type-card/bot-type-card.component';


@NgModule({
  declarations: [BotTypeSelectorComponent, BotTypeCardComponent],
  imports: [
    CommonModule,
    CarouselModule,
    CardModule
  ],
  exports: [BotTypeSelectorComponent]
})
export class BotTypeSelectorModule { }
