import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

import { TestsDashboardComponent } from './components/principal/principal.component';
import { TestPopupComponent } from './components/test-popup/test-popup.component';

import { ConfirmationService, MessageService } from 'primeng/api';

@NgModule({
  declarations: [TestsDashboardComponent, TestPopupComponent],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CardModule,
    ConfirmDialogModule,
    DynamicDialogModule,
    ToastModule
  ],
  exports: [TestsDashboardComponent],
  providers: [ConfirmationService, MessageService],
  entryComponents: [TestPopupComponent]
})
export class TestsDashboardModule { }
