import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorScreenComponent } from './components/error-screen/error-screen.component';



@NgModule({
  declarations: [ErrorScreenComponent],
  imports: [
    CommonModule
  ],
  exports: [ErrorScreenComponent]
})
export class ErrorScreenModule { }
