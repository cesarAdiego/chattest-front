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
  userMessage: string;
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

  showAddUserMessage() {
    this.clickedAddUserMessage = !this.clickedAddUserMessage;
  }

  deleteUserMessage(userMessage: UserMessage) {
    this.translate.get(['TESTS_DASHBOARD.SUCCESSFUL_DELETE_USER_MESSAGE_SUMMARY',
                        'TESTS_DASHBOARD.SUCCESSFUL_DELETE_USER_MESSAGE_DETAIL'])
        .subscribe(labels => {
          let index = this.testContent.userMessages.indexOf(userMessage, 0);

          if(index > -1) {
            this.testContent.userMessages.splice(index, 1);
            this.message.add({
              severity: 'success',
              summary: labels['TESTS_DASHBOARD.SUCCESSFUL_DELETE_USER_MESSAGE_SUMMARY'],
              detail: labels['TESTS_DASHBOARD.SUCCESSFUL_DELETE_USER_MESSAGE_DETAIL']
            });
          }
        });
  }
}
