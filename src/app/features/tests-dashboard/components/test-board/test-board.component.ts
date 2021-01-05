import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TestContentService } from 'src/app/common/services/test-content.service';
import { Test } from 'src/app/entities/test';
import { TestContent } from 'src/app/entities/testContent';
import { SelectTestEventService } from '../../services/select-test-event.service';

import { forkJoin } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Message } from 'src/app/entities/message';
import { BotAnswerExecutionResult } from '../../entities/botAnswerExecutionResult';

@Component({
  selector: 'test-board',
  templateUrl: './test-board.component.html',
  styleUrls: ['./test-board.component.scss']
})
export class TestBoardComponent implements OnInit {
  @Input() test: Test;
  testContent: TestContent;
  showProgressBar: boolean = false;
  constructor(private selectTestEvent: SelectTestEventService,
              private testContentService: TestContentService,
              private message: MessageService,
              private translate: TranslateService) { }

  ngOnInit(): void {
    this.selectTestEvent.eventListener().subscribe(res => {
      this.testContentService.get(res.id).subscribe(content => this.testContent = content);
    })
  }

  executeTest() {
    this.clearExecuteResults();
    this.showProgressBar = true;
    this.testContentService.put(this.test.id, this.testContent).subscribe(saveResult => {
      if(saveResult.hasErrors) {
        saveResult.operationErrors.forEach(errorMessage => this.message.add({severity: 'error', summary: 'Error', detail: errorMessage}));
      }
      else {
        this.testContent = saveResult.result;
        forkJoin([this.testContentService.execute(this.test),
                  this.translate.get(['TESTS_DASHBOARD.EXECUTION.SUCCESFUL_EXECUTION_SUMMARY',
                                      'TESTS_DASHBOARD.EXECUTION.SUCCESFUL_EXECUTION_DETAIL',
                                      'TESTS_DASHBOARD.EXECUTION.ERROR_EXECUTION_SUMMARY',
                                      'TESTS_DASHBOARD.EXECUTION.ERROR_EXECUTION_DETAIL',
                                      'TESTS_DASHBOARD.EXECUTION.ERROR_TIMEOUT_SUMMARY',
                                      'TESTS_DASHBOARD.EXECUTION.ERROR_TIMEOUT_DETAIL'])])
          .subscribe(([res, labels]) => {
            if(res.hasErrors) {
              this.message.add({severity: 'error',
                                summary: labels['TESTS_DASHBOARD.EXECUTION.ERROR_EXECUTION_SUMMARY'],
                                detail: labels['TESTS_DASHBOARD.EXECUTION.ERROR_EXECUTION_DETAIL']
                              });
            }
            else if(res.hasTimeoutError) {
              this.message.add({severity: 'error',
                                summary: labels['TESTS_DASHBOARD.EXECUTION.ERROR_TIMEOUT_SUMMARY'],
                                detail: labels['TESTS_DASHBOARD.EXECUTION.ERROR_TIMEOUT_DETAIL']
                              });
            }
            else {
              this.message.add({severity: 'success',
                                summary: labels['TESTS_DASHBOARD.EXECUTION.SUCCESFUL_EXECUTION_SUMMARY'],
                                detail: labels['TESTS_DASHBOARD.EXECUTION.SUCCESFUL_EXECUTION_DETAIL']
                              });
            }

            let botAnswersArray = this.testContent.userMessages.map(message => message.botAnswers);
            let botAnswers = [].concat(...botAnswersArray);
            res.botAnswerExecutions.forEach(execution => {
              let botAnswer: Message = botAnswers.find((answer: Message) => answer.id == execution.expectedBotAnswer.id);
              botAnswer.hasExecuted = true;
              botAnswer.hasErrors = !execution.areEqual;
            });

            this.showProgressBar = false;
          });
      }
    });
  }

  saveTest() {
    this.clearExecuteResults();
    forkJoin([this.testContentService.put(this.test.id, this.testContent),
                                          this.translate.get(['TESTS_DASHBOARD.SUCCESSFUL_SAVE_SUMMARY',
                                                              'TESTS_DASHBOARD.SUCCESSFUL_SAVE_DETAIL'])])
      .subscribe(([saveResult, labels]) => {
        if(saveResult.hasErrors) {
          saveResult.operationErrors.forEach(errorMessage => this.message.add({severity: 'error', summary: 'Error', detail: errorMessage}))
        }
        else {
          this.message.add({severity: 'success', 
                            summary: labels['TESTS_DASHBOARD.SUCCESSFUL_SAVE_SUMMARY'],
                            detail: labels['TESTS_DASHBOARD.SUCCESSFUL_SAVE_DETAIL']});
          
          this.testContent = saveResult.result;
        }
      });
  }

  clearExecuteResults() {
    let botAnswersArray = this.testContent.userMessages.map(message => message.botAnswers);
    let botAnswers = [].concat(...botAnswersArray);

    botAnswers.forEach((answer: Message) => 
      { 
        answer.hasErrors = false;
        answer.hasExecuted = false;
      });
  }
}
