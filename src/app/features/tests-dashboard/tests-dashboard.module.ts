import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { MenuModule } from 'primeng/menu';
import { ConfirmationService, MessageService } from 'primeng/api';

import { TestsDashboardComponent } from './components/principal/principal.component';
import { TestPopupComponent } from './components/test-popup/test-popup.component';

import { TestListComponent } from './components/test-list/test-list.component';
import { TestBoardComponent } from './components/test-board/test-board.component';
import { TestItemComponent } from './components/test-item/test-item.component';

@NgModule({
  declarations: [TestsDashboardComponent, TestPopupComponent, TestListComponent, TestBoardComponent, TestItemComponent],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CardModule,
    RippleModule,
    ToastModule,
    MenuModule,
    ConfirmDialogModule,
    DynamicDialogModule,
  ],
  exports: [TestsDashboardComponent],
  providers: [ConfirmationService, MessageService],
  entryComponents: [TestPopupComponent]
})
export class TestsDashboardModule { }
