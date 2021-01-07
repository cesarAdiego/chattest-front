import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { TestsService } from 'src/app/common/services/tests.service';
import { Test } from 'src/app/entities/test';

import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-test-popup',
  templateUrl: './test-popup.component.html',
  styleUrls: ['./test-popup.component.scss']
})
export class TestPopupComponent implements OnInit {
  test: Test;
  projectId: number;
  constructor(private testService: TestsService,
              private ref: DynamicDialogRef,
              private route: ActivatedRoute,
              private messageService: MessageService,
              private translate: TranslateService) { }

  ngOnInit(): void {
    this.test = new Test();
    this.route.paramMap.subscribe(params => this.projectId = parseInt(params.get('id')));
  }

  createNewTest() {
    this.test.projectId = this.projectId;
    if(!this.test.name || this.test.name == '') {
      this.translate.get('CREATE_TEST_POPUP.ERROR.EMPTY_NAME').subscribe(label => {
        this.messageService.add({severity: 'error', 'summary': 'Error', 'detail': label});
      });
    }
    else {
      forkJoin([this.testService.createTest(this.test),
                this.translate.get(['CREATE_TEST_POPUP.SUCCESSFUL_SUMMARY',
                                    'CREATE_TEST_POPUP.SUCCESSFUL_DETAIL'])])
      .subscribe(([errorMessages, labels]) => {
        if(errorMessages.length > 0) {
          errorMessages.forEach(message => {
            this.messageService.add({severity: 'error', 'summary': 'Error', 'detail': message});
          });
        }
        else {
          this.messageService.add({severity: 'success',
                                   summary: labels['CREATE_TEST_POPUP.SUCCESSFUL_SUMMARY'],
                                   detail: labels['CREATE_TEST_POPUP.SUCCESSFUL_DETAIL']});
          this.ref.close(errorMessages);
        }
      });
    }
  }

  closePopup() {
    this.ref.close();
  }
}
