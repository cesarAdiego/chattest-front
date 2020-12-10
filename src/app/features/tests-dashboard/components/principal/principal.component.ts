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
  selectedTest: Test;
  constructor(private route: ActivatedRoute,
              private dialogService: DialogService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private testsService: TestsService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => this.projectId = parseInt(params.get('id')));
    this.refreshTests();
  }

  refreshTests() {
    this.testsService.getAllTestsFromProject(this.projectId).subscribe(tests => this.tests = tests);
  }

  setSelectedTest(event: Test) {
    this.selectedTest = event;
  }
}
