import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router) { }

  ngOnInit(): void {
  }

  createTestPopup() {
    const ref = this.dialogService.open(TestPopupComponent, {
      'header': 'Nuevo Test',
      'width': '50%'
    });

    ref.onClose.subscribe((errorMessages: string[]) => {
      if(errorMessages && errorMessages.length == 0) {
        this.testListModifiedEvent.emit();
      }
    });
  }

  removeTest(test: Test) {
    this.confirmationService.confirm({
      message: `¿Estas seguro de que quieres eliminar el proyecto ${test.name}?`,
      accept: () => {
          this.testsService.deleteTest(test).subscribe(errorMessages => {
            if(errorMessages.length > 0) {
              errorMessages.forEach(errorMessage => {
                this.messageService.add({severity: 'error', summary: 'Error', detail: errorMessage});
              });
            }
            else {
              this.messageService.add({severity: 'success', 'summary': 'Test eliminado', detail: 'Test eliminado correctamente'});
              this.testListModifiedEvent.emit();
            }
          });
      }
    });
  }

  goBackToProjectsDashboard() {
    this.router.navigate(['/projects']);
  }
}
