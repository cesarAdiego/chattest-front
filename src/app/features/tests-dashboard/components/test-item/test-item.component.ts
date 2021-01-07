import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { TestsService } from 'src/app/common/services/tests.service';
import { Test } from 'src/app/entities/test';
import { SelectTestEventService } from '../../services/select-test-event.service';

import { forkJoin } from 'rxjs';
import { TestListModifiedEventService } from '../../services/test-list-modified-event.service';
import { DialogService } from 'primeng/dynamicdialog';
import { TestClonePopupComponent } from '../test-clone-popup/test-clone-popup.component';
@Component({
  selector: 'test-item',
  templateUrl: './test-item.component.html',
  styleUrls: ['./test-item.component.scss']
})
export class TestItemComponent implements OnInit {
  @Input() test: Test;
  menuItems: MenuItem[];
  constructor(private selectTestEvent: SelectTestEventService,
              private testListModifiedEvent: TestListModifiedEventService,
              private dialog: DialogService,
              private confirmation: ConfirmationService,
              private message: MessageService,
              private testService: TestsService,
              private translate: TranslateService)
  { }

  ngOnInit(): void {
    this.translate.get(['TEST_ITEM.DELETE_LABEL',
                        'TEST_ITEM.CLONE_LABEL'])
        .subscribe(res => {
          this.menuItems = [
            {label: res['TEST_ITEM.DELETE_LABEL'], icon: 'pi pi-fw pi-trash', command: (click) => {
              this.openDeleteTestPopup();
            }},
            {label: res['TEST_ITEM.CLONE_LABEL'], icon: 'pi pi-fw pi-clone', command: (click) => {
              this.openCloneTestPopup();
            }}
          ];
        });
  }

  openDeleteTestPopup() {
    this.translate.get(['DELETE_TEST_POPUP.HEADER',
                        'DELETE_TEST_POPUP.MESSAGE',
                        'CONFIRMATION_POPUP.YES_LABEL',
                        'CONFIRMATION_POPUP.NO_LABEL'],
                        {value: this.test.name})
      .subscribe(res => {
        this.confirmation.confirm({
          header: res['DELETE_TEST_POPUP.HEADER'],
          icon: 'pi pi-exclamation-triangle',
          message: res['DELETE_TEST_POPUP.MESSAGE'],
          acceptLabel: res['CONFIRMATION_POPUP.YES_LABEL'],
          rejectLabel: res['CONFIRMATION_POPUP.NO_LABEL'],
          accept: () => {
            this.deleteTest();
          }
        });
      });
  }

  openCloneTestPopup() {
    this.translate.get('CLONE_TEST_POPUP.HEADER').subscribe(res => {
      const ref = this.dialog.open(TestClonePopupComponent, {
        header: res,
        height: '50%',
        width: '50%',
        data: {
          id: this.test.id
        }
      });

      ref.onClose.subscribe((res: boolean) => {
        if(res) {
          this.testListModifiedEvent.emit();
        }
      })
    });
  }

  deleteTest() {
    forkJoin([this.testService.deleteTest(this.test), 
              this.translate.get(['DELETE_TEST_POPUP.SUCCESS_SUMMARY',
                                  'DELETE_TEST_POPUP.SUCCESS_MESSAGE'])])
      .subscribe(([serviceResponse, translateResponse]) => {
        if(serviceResponse.length > 0) {
          serviceResponse.forEach(errorMessage => this.message.add({
            severity: 'error',
            summary: 'Error',
            detail: errorMessage
          }));
        }
        else {
          this.message.add({severity: 'success', 
                            summary: translateResponse['DELETE_TEST_POPUP.SUCCESS_SUMMARY'],
                            detail: translateResponse['DELETE_TEST_POPUP.SUCCESS_MESSAGE']});
          this.testListModifiedEvent.emit();
        }
      });
  }

  selectTest() {
    this.selectTestEvent.emitEvent(this.test);
  }
}
