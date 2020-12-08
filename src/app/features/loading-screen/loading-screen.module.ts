import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';

import { ProgressBarModule } from 'primeng/progressbar';

@NgModule({
  declarations: [LoadingScreenComponent],
  imports: [
    CommonModule,
    ProgressBarModule
  ],
  exports: [LoadingScreenComponent]
})
export class LoadingScreenModule { }
