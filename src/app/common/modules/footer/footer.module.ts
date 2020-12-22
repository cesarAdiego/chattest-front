import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [FooterComponent]
})
export class FooterModule { }
