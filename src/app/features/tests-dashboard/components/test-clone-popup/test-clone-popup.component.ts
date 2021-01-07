import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TestsService } from 'src/app/common/services/tests.service';

import { forkJoin } from 'rxjs';
import { MessageService } from 'primeng/api';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-test-clone-popup',
  templateUrl: './test-clone-popup.component.html',
  styleUrls: ['./test-clone-popup.component.scss']
})
export class TestClonePopupComponent implements OnInit {
  newName: string;
  testId: number;
  constructor(private testService: TestsService,
              private translate: TranslateService,
              private ref: DynamicDialogRef,
              private config: DynamicDialogConfig,
              private message: MessageService) { }

  ngOnInit(): void {
    this.testId = this.config.data.id;
  }

  cloneTest() {
    if(this.newName) {
      console.log(this.newName);
    forkJoin([this.testService.cloneTest(this.testId, this.newName),
              this.translate.get(['CLONE_TEST_POPUP.SUCCESS_SUMMARY',
                                  'CLONE_TEST_POPUP.SUCCESS_MESSAGE'])])
      .subscribe(([res, labels]) => {
        if(res.length > 0) {
          res.forEach(errorMessage => this.message.add({severity: 'error', summary: 'Error', detail: errorMessage}));
        }
        else {
          this.message.add({severity: 'success', 
                            summary: labels['CLONE_TEST_POPUP.SUCCESS_SUMMARY'],
                            detail: labels['CLONE_TEST_POPUP.SUCCESS_MESSAGE']});
          this.ref.close(true);                            
        }
      });
    }
    else {
      this.translate.get('CLONE_TEST_POPUP.EMPTY_NAME_MESSAGE').subscribe(label => {
        this.message.add({severity: 'error', summary: 'Error', detail: label});
      });
    }
  }

  closePopup() {
    this.ref.close(false);
  }
}
