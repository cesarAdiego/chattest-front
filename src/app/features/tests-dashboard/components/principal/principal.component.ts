import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { TestsService } from 'src/app/common/services/tests.service';
import { Test } from 'src/app/entities/test';
import { TestPopupComponent } from '../test-popup/test-popup.component';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
  providers: [DialogService]
})
export class TestsDashboardComponent implements OnInit {
  projectId: number;
  tests: Test[];
  constructor(private route: ActivatedRoute,
              private dialogService: DialogService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private testsService: TestsService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => this.projectId = parseInt(params.get('id')));
    this.refreshTests();
  }

  createTestPopup() {
    const ref = this.dialogService.open(TestPopupComponent, {
      'header': 'Nuevo Test',
      'width': '50%'
    });

    ref.onClose.subscribe((errorMessages: string[]) => {
      if(errorMessages && errorMessages.length == 0) {
        this.refreshTests();
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
              this.refreshTests();
            }
          });
      }
    });
  }

  refreshTests() {
    this.testsService.getAllTestsFromProject(this.projectId).subscribe(tests => this.tests = tests);
  }
}
