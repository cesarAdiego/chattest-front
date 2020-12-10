import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';

import { TestsDashboardComponent } from './components/principal/principal.component';
import { TestPopupComponent } from './components/test-popup/test-popup.component';

import { ConfirmationService, MessageService } from 'primeng/api';
import { TestListComponent } from './components/test-list/test-list.component';
import { TestBoardComponent } from './components/test-board/test-board.component';

@NgModule({
  declarations: [TestsDashboardComponent, TestPopupComponent, TestListComponent, TestBoardComponent],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CardModule,
    RippleModule,
    ToastModule,
    ConfirmDialogModule,
    DynamicDialogModule,
  ],
  exports: [TestsDashboardComponent],
  providers: [ConfirmationService, MessageService],
  entryComponents: [TestPopupComponent]
})
export class TestsDashboardModule { }
