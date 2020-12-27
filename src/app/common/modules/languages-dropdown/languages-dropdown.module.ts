import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DropdownModule } from 'primeng/dropdown';

import { LanguagesDropdownComponent } from './components/principal/principal.component';

@NgModule({
  declarations: [LanguagesDropdownComponent],
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule
  ],
  exports: [LanguagesDropdownComponent]
})
export class LanguagesDropdownModule { }
