import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { MenuModule } from 'primeng/menu';
import { TabMenuModule } from 'primeng/tabmenu';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ScrollTopModule } from 'primeng/scrolltop';
import { ProgressBarModule } from 'primeng/progressbar';

import { TranslateModule } from '@ngx-translate/core';

import { TestsDashboardComponent } from './components/principal/principal.component';
import { TestPopupComponent } from './components/test-popup/test-popup.component';

import { TestListComponent } from './components/test-list/test-list.component';
import { TestBoardComponent } from './components/test-board/test-board.component';
import { TestItemComponent } from './components/test-item/test-item.component';
import { TestClonePopupComponent } from './components/test-clone-popup/test-clone-popup.component';
import { MessagesListComponent } from './components/messages-list/messages-list.component';
import { UserMessageComponent } from './components/user-message/user-message.component';
import { BotMessageComponent } from './components/bot-message/bot-message.component';

@NgModule({
  declarations: [TestsDashboardComponent, TestPopupComponent, TestListComponent, TestBoardComponent, TestItemComponent, TestClonePopupComponent, MessagesListComponent, UserMessageComponent, BotMessageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    RippleModule,
    ToastModule,
    MenuModule,
    TabMenuModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    DynamicDialogModule,
    ScrollTopModule,
    ProgressBarModule,
    TranslateModule
  ],
  exports: [TestsDashboardComponent],
  providers: [ConfirmationService, MessageService],
  entryComponents: [TestPopupComponent]
})
export class TestsDashboardModule { }
