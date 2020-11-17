import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Test } from 'src/app/entities/test';
import { TestsService } from 'src/app/services/tests.service';

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
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.test = new Test();
    this.route.paramMap.subscribe(params => this.projectId = parseInt(params.get('id')));
  }

  createNewTest() {
    this.test.projectId = this.projectId;
    if(this.test.name == '') {
      this.messageService.add({severity: 'error', 'summary': 'Error', 'detail': 'El nombre del proyecto no puede estar vacío'});
    }
    else {
      this.testService.createTest(this.test).subscribe(errorMessages => {
        console.log(errorMessages);
        if(errorMessages.length > 0) {
          errorMessages.forEach(message => {
            this.messageService.add({severity: 'error', 'summary': 'Error', 'detail': message});
          });
        }
        else {
          this.messageService.add({severity: 'success', 'summary': 'Test creado', 'detail': 'Test creado correctamente'});
          this.ref.close(errorMessages);
        }
      });
    }
  }

  closePopup() {
    this.ref.close();
  }
}
