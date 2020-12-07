import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSelectorComponent } from './components/principal/language-selector.component';

import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { LanguageCardComponent } from './components/language-card/language-card.component';

@NgModule({
  declarations: [LanguageSelectorComponent, LanguageCardComponent],
  imports: [
    CommonModule,
    TranslateModule,
    CarouselModule,
    CardModule
  ],
  exports: [LanguageSelectorComponent]
})
export class LanguageSelectorModule { }
