import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DropdownModule } from 'primeng/dropdown';

import { BotTypeDropdownComponent } from './components/principal/principal.component';

@NgModule({
  declarations: [BotTypeDropdownComponent],
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule
  ],
  exports: [
    BotTypeDropdownComponent
  ]
})
export class BotTypeDropdownModule { }
