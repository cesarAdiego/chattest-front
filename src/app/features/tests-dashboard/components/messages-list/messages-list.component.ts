import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Message } from 'src/app/entities/message';
import { TestContent } from 'src/app/entities/testContent';
import { UserMessage } from 'src/app/entities/userMessage';

@Component({
  selector: 'messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss']
})
export class MessagesListComponent implements OnInit {
  @Input() testContent: TestContent;
  clickedAddUserMessage: boolean = false;
  clickedModifyUserMessage: boolean = false;
  clickedAddBotMessage: boolean = false;
  clickedModifyBotMessage: boolean = false;
  selectedUserMessage: UserMessage;
  userMessage: string;
  botMessage: string;
  constructor(private message: MessageService,
              private confirmation: ConfirmationService,
              private translate: TranslateService) { }

  ngOnInit(): void {
  }

  addUserMessage() {
    if(this.userMessage) {
      let userMessage = new UserMessage();
      userMessage.content = this.userMessage;
      userMessage.botAnswers = [];

      this.testContent.userMessages.push(userMessage);
      this.clickedAddUserMessage = !this.clickedAddUserMessage;
      this.userMessage = undefined;
    }
    else {
      this.translate.get('TESTS_DASHBOARD.ERRORS.EMPTY_USER_MESSAGE').subscribe(res => {
        this.message.add({severity: 'error',
                          summary: 'Error',
                          detail: res});
      });
    }
  }

  addBotMessage(userMessage: UserMessage) {
    if(this.botMessage) {
      let message = new Message();
      message.content = this.botMessage;

      userMessage.botAnswers.push(message);
      this.clickedAddBotMessage = !this.clickedAddBotMessage;
      this.botMessage = undefined;
    }
    else {
      this.translate.get('TESTS_DASHBOARD.ERRORS.EMPTY_BOT_MESSAGE').subscribe(res => {
        this.message.add({severity: 'error',
                          summary: 'Error',
                          detail: res });
      });
    }
  }

  editUserMessage(userMessage: UserMessage) {
    if(userMessage.content) {
      this.clickedModifyUserMessage = !this.clickedModifyUserMessage;
    }
    else {
      this.translate.get('TESTS_DASHBOARD.ERRORS.EMPTY_USER_MESSAGE').subscribe(res => {
        this.message.add({severity: 'error',
                          summary: 'Error',
                          detail: res});
      });
    }
  }

  editBotMessage(botMessage: Message) {
    if(botMessage.content) {
      this.clickedModifyBotMessage = !this.clickedModifyBotMessage;
    }
    else {
      this.translate.get('TESTS_DASHBOARD.ERRORS.EMPTY_BOT_MESSAGE').subscribe(res => {
        this.message.add({severity: 'error',
                          summary: 'Error',
                          detail: res});
      });
    }
  }

  showConfirmationPopupDeleteUserMessage(userMessage: UserMessage, event: Event) {
    this.translate.get(['TESTS_DASHBOARD.DELETE_USER_MESSAGE_LABEL',
                        'TESTS_DASHBOARD.SUCCESSFUL_DELETE_USER_MESSAGE_SUMMARY',
                        'TESTS_DASHBOARD.SUCCESSFUL_DELETE_USER_MESSAGE_DETAIL',
                        'CONFIRMATION_POPUP.YES_LABEL',
                        'CONFIRMATION_POPUP.NO_LABEL'])
        .subscribe(labels => {
          this.confirmation.confirm({
            target: event.target,
            message: labels['TESTS_DASHBOARD.DELETE_USER_MESSAGE_LABEL'],
            acceptLabel: labels['CONFIRMATION_POPUP.YES_LABEL'],
            rejectLabel: labels['CONFIRMATION_POPUP.NO_LABEL'],
            accept: () => {
              let index = this.testContent.userMessages.indexOf(userMessage, 0);
              console.log(index);

              if(index > -1) {
                this.testContent.userMessages.splice(index, 1);
                this.message.add({
                  severity: 'success',
                  summary: labels['TESTS_DASHBOARD.SUCCESSFUL_DELETE_USER_MESSAGE_SUMMARY'],
                  detail: labels['TESTS_DASHBOARD.SUCCESSFUL_DELETE_USER_MESSAGE_DETAIL']
                });
              }
            }
          })
        });

  }

  showConfirmationPopupDeleteBotMessage(userMessage: UserMessage, botMessage: Message, event: Event) {
    this.translate.get(['TESTS_DASHBOARD.DELETE_BOT_MESSAGE_LABEL',
                        'TESTS_DASHBOARD.SUCCESSFUL_DELETE_BOT_MESSAGE_SUMMARY',
                        'TESTS_DASHBOARD.SUCCESSFUL_DELETE_BOT_MESSAGE_DETAIL',
                        'CONFIRMATION_POPUP.YES_LABEL',
                        'CONFIRMATION_POPUP.NO_LABEL'])
        .subscribe(labels => {
          this.confirmation.confirm({
            target: event.target,
            message: labels['TESTS_DASHBOARD.DELETE_BOT_MESSAGE_LABEL'],
            acceptLabel: labels['CONFIRMATION_POPUP.YES_LABEL'],
            rejectLabel: labels['CONFIRMATION_POPUP.NO_LABEL'],
            accept: () => {
              let index = userMessage.botAnswers.indexOf(botMessage, 0);

              if(index > -1) {
                userMessage.botAnswers.splice(index, 1);
                this.message.add({severity: 'success',
                                  summary: labels['TESTS_DASHBOARD.DELETE_BOT_MESSAGE_SUMMARY'],
                                  detail: labels['TESTS_DASHBOARD.DELETE_BOT_MESSAGE_SUMMARY']
                                });
              }
            }
          });
        });
  }

  showAddUserMessage() {
    this.clickedAddUserMessage = !this.clickedAddUserMessage;
  }

  showAddBotMessage(userMessage: UserMessage) {
    this.clickedAddBotMessage = !this.clickedAddBotMessage;
    this.selectedUserMessage = userMessage;
  }

  showModifyUserMessage() {
    this.clickedModifyUserMessage = !this.clickedModifyUserMessage;
  }

  showModifyBotMessage() {
    this.clickedModifyBotMessage = !this.clickedModifyBotMessage;
  }
}
