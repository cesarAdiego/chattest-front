import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { TestsService } from 'src/app/common/services/tests.service';
import { Test } from 'src/app/entities/test';
import { TestListModifiedEventService } from '../../services/test-list-modified-event.service';
import { TestPopupComponent } from '../test-popup/test-popup.component';

@Component({
  selector: 'test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss']
})
export class TestListComponent implements OnInit {
  @Input() tests: Test[];
  
  constructor(private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private testsService: TestsService,
    private testListModifiedEvent: TestListModifiedEventService,
    private router: Router,
    private translate: TranslateService) { }

  ngOnInit(): void {
  }

  createTestPopup() {
    this.translate.get('CREATE_TEST_POPUP.HEADER').subscribe(res => {
      const ref = this.dialogService.open(TestPopupComponent, {
        'header': res,
        'width': '50%'
      });
  
      ref.onClose.subscribe((errorMessages: string[]) => {
        if(errorMessages && errorMessages.length == 0) {
          this.testListModifiedEvent.emit();
        }
      });
    });
  }

  removeTest(test: Test) {
    this.translate.get(['DELETE_TEST_POPUP.HEADER',
                        'DELETE_TEST_POPUP_MESSAGE',
                        'DELETE_TEST_POPUP.SUCCESS_SUMMARY',
                        'DELETE_TEST_POPUP.SUCCESS_DETAIL'],
                        { value: test.name})
        .subscribe(labels => {
          this.confirmationService.confirm({
            header: labels['DELETE_TEST_POPUP.HEADER'],
            message: labels['DELETE_TEST_POPUP.MESSAGE'],
            accept: () => {
                this.testsService.deleteTest(test).subscribe(errorMessages => {
                  if(errorMessages.length > 0) {
                    errorMessages.forEach(errorMessage => {
                      this.messageService.add({severity: 'error', summary: 'Error', detail: errorMessage});
                    });
                  }
                  else {
                    this.messageService.add({severity: 'success', 
                                            summary: labels['DELETE_TEST_POPUP.SUCCESS_SUMMARY'],
                                            detail: labels['DELETE_TEST_POPUP.SUCCESS_DETAIL']});
                    this.testListModifiedEvent.emit();
                  }
                });
            }
          });
        });
  }

  goBackToProjectsDashboard() {
    this.router.navigate(['/projects']);
  }
}
