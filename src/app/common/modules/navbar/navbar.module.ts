import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/principal/navbar.component';
import { OptionsPopupComponent } from './components/options-popup/options-popup.component';

import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast'; 
import { TranslateModule } from '@ngx-translate/core';

import { LanguageSelectorModule } from '../language-selector/language-selector.module';

@NgModule({
  declarations: [NavbarComponent, OptionsPopupComponent],
  imports: [
    CommonModule,
    DynamicDialogModule,
    ToastModule,
    TranslateModule,
    LanguageSelectorModule
  ],
  exports: [NavbarComponent]
})
export class NavbarModule { }
