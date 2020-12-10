import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotTypeSelectorComponent } from './components/principal/bot-type-selector.component';

import { TranslateModule } from '@ngx-translate/core';

import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';

import { BotTypeCardComponent } from './components/bot-type-card/bot-type-card.component';

@NgModule({
  declarations: [BotTypeSelectorComponent, BotTypeCardComponent],
  imports: [
    CommonModule,
    TranslateModule,
    CarouselModule,
    RippleModule,
    CardModule
  ],
  exports: [BotTypeSelectorComponent]
})
export class BotTypeSelectorModule { }
