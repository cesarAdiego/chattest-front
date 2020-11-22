import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/principal/navbar.component';
import { OptionsPopupComponent } from './components/options-popup/options-popup.component';

import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { LanguageSelectorModule } from '../language-selector/language-selector.module';

@NgModule({
  declarations: [NavbarComponent, OptionsPopupComponent],
  imports: [
    CommonModule,
    DynamicDialogModule,
    LanguageSelectorModule
  ],
  exports: [NavbarComponent]
})
export class NavbarModule { }
