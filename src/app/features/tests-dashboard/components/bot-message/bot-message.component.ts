import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Message } from 'src/app/entities/message';
import { UserMessage } from 'src/app/entities/userMessage';

@Component({
  selector: 'bot-message',
  templateUrl: './bot-message.component.html',
  styleUrls: ['./bot-message.component.scss']
})
export class BotMessageComponent implements OnInit {
  @Input() message: Message;
  @Output() deleteBotMessageEvent = new EventEmitter<Message>();
  botMessage: string = undefined;
  clickedModifyBotMessage: boolean = false;
  clickedAddBotMessage: boolean = false;
  constructor(private confirmation: ConfirmationService,
              private messageService: MessageService,
              private translate: TranslateService) { }

  ngOnInit(): void {
  }

  editBotMessage() {
    if(this.message.content) {
      this.clickedModifyBotMessage = !this.clickedModifyBotMessage;
    }
    else {
      this.translate.get('TESTS_DASHBOARD.ERRORS.EMPTY_BOT_MESSAGE').subscribe(res => {
        this.messageService.add({severity: 'error',
                                 summary: 'Error',
                                 detail: res});
      });
    }
  }

  showConfirmationPopupDeleteBotMessage(event: Event) {
    this.translate.get(['TESTS_DASHBOARD.DELETE_BOT_MESSAGE_SUMMARY',
                        'TESTS_DASHBOARD.DELETE_BOT_MESSAGE_LABEL',
                        'TESTS_DASHBOARD.SUCCESSFUL_DELETE_BOT_MESSAGE_SUMMARY',
                        'TESTS_DASHBOARD.SUCCESSFUL_DELETE_BOT_MESSAGE_DETAIL',
                        'CONFIRMATION_POPUP.YES_LABEL',
                        'CONFIRMATION_POPUP.NO_LABEL'])
        .subscribe(labels => {
          this.confirmation.confirm({
            header: labels['TESTS_DASHBOARD.DELETE_BOT_MESSAGE_SUMMARY'],
            message: labels['TESTS_DASHBOARD.DELETE_BOT_MESSAGE_LABEL'],
            acceptLabel: labels['CONFIRMATION_POPUP.YES_LABEL'],
            rejectLabel: labels['CONFIRMATION_POPUP.NO_LABEL'],
            accept: () => {
              this.deleteBotMessageEvent.emit(this.message);
            }
          });
        });
  }

  showModifyBotMessage() {
    this.clickedModifyBotMessage = !this.clickedModifyBotMessage;
  }
}
