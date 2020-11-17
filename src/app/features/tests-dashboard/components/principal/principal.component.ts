import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { Test } from 'src/app/entities/test';
import { TestsService } from 'src/app/services/tests.service';
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

  refreshTests() {
    this.testsService.getAllTestsFromProject(this.projectId).subscribe(tests => this.tests = tests);
  }
}
