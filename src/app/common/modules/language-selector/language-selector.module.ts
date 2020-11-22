import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSelectorComponent } from './components/principal/language-selector.component';

import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { LanguageCardComponent } from './components/language-card/language-card.component';

@NgModule({
  declarations: [LanguageSelectorComponent, LanguageCardComponent],
  imports: [
    CommonModule,
    CarouselModule,
    CardModule
  ],
  exports: [LanguageSelectorComponent]
})
export class LanguageSelectorModule { }
