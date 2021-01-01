import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Message } from 'src/app/entities/message';
import { UserMessage } from 'src/app/entities/userMessage';

@Component({
  selector: 'user-message',
  templateUrl: './user-message.component.html',
  styleUrls: ['./user-message.component.scss']
})
export class UserMessageComponent implements OnInit {
  @Input() message: UserMessage;
  @Output() deleteMessageEvent = new EventEmitter<UserMessage>();
  clickedModifyUserMessage: boolean = false;
  clickedAddBotMessage: boolean = false;
  botMessage: string = undefined;
  constructor(private translate: TranslateService,
              private confirmation: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit(): void {
  }

  showConfirmationPopupDeleteUserMessage(event: Event) {
    this.translate.get(['TESTS_DASHBOARD.DELETE_USER_MESSAGE_SUMMARY',
                        'TESTS_DASHBOARD.DELETE_USER_MESSAGE_LABEL',
                        'TESTS_DASHBOARD.SUCCESSFUL_DELETE_USER_MESSAGE_SUMMARY',
                        'TESTS_DASHBOARD.SUCCESSFUL_DELETE_USER_MESSAGE_DETAIL',
                        'CONFIRMATION_POPUP.YES_LABEL',
                        'CONFIRMATION_POPUP.NO_LABEL'])
        .subscribe(labels => {
          this.confirmation.confirm({
            header: labels['TESTS_DASHBOARD.DELETE_USER_MESSAGE_SUMMARY'],
            message: labels['TESTS_DASHBOARD.DELETE_USER_MESSAGE_LABEL'],
            acceptLabel: labels['CONFIRMATION_POPUP.YES_LABEL'],
            rejectLabel: labels['CONFIRMATION_POPUP.NO_LABEL'],
            accept: () => {
              this.deleteMessageEvent.emit(this.message);
              }
            })
          });
  }

  addBotMessage() {
    if(this.message) {
      let botMessage = new Message();
      botMessage.content = this.botMessage;

      this.message.botAnswers.push(botMessage);
      console.log('Message:', this.message);
      console.log("Bot answers", this.message.botAnswers);
      this.clickedAddBotMessage = !this.clickedAddBotMessage;
      this.botMessage = undefined;
    }
    else {
      this.translate.get('TESTS_DASHBOARD.ERRORS.EMPTY_BOT_MESSAGE').subscribe(res => {
        this.messageService.add({severity: 'error',
                                 summary: 'Error',
                                 detail: res });
      });
    }
  }

  deleteBotMessage(botMessage: Message) {
    this.translate.get(['TESTS_DASHBOARD.DELETE_BOT_MESSAGE_SUMMARY',
                    'TESTS_DASHBOARD.DELETE_BOT_MESSAGE_SUMMARY'])
        .subscribe(labels => {
          let index = this.message.botAnswers.indexOf(botMessage, 0);

          if(index > -1) {
            this.message.botAnswers.splice(index, 1);
            this.messageService.add({severity: 'success',
                                     summary: labels['TESTS_DASHBOARD.DELETE_BOT_MESSAGE_SUMMARY'],
                                     detail: labels['TESTS_DASHBOARD.DELETE_BOT_MESSAGE_SUMMARY']
                                    });
          }
        });
  }


  showModifyUserMessage() {
    this.clickedModifyUserMessage = !this.clickedModifyUserMessage;
  }

  showAddBotMessage() {
    this.clickedAddBotMessage = !this.clickedAddBotMessage;
  }

  editUserMessage() {
    this.clickedModifyUserMessage = !this.clickedModifyUserMessage;
  }
}
