import { Component, OnInit } from '@angular/core';
import { OperationResult } from 'src/app/entities/operationResult';
import { TestImport } from 'src/app/features/import-project-dashboard/entities/testImport';
import { environment } from 'src/environments/environment';

import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ImportStoreService } from '../../services/import-store.service';
import { ProjectImport } from '../../entities/projectImport';

@Component({
  selector: 'import-choose',
  templateUrl: './import-upload-file.component.html',
  styleUrls: ['./import-upload-file.component.scss']
})
export class ImportUploadFileComponent implements OnInit {
  apiUrl = `${environment.apiUrl}/projects/import/getTests`;
  constructor(private message: MessageService,
              private importStore: ImportStoreService,
              private router: Router) { }

  ngOnInit(): void {
  }

  uploadFile(event) {
    try {
      let operationResult = event.originalEvent.body as OperationResult<ProjectImport>;

      if(operationResult.hasErrors) {
        operationResult.operationErrors.forEach(errorMessage => {
          this.message.add({severity: 'error', summary: 'Error', detail: errorMessage});
        });
      }
      else {
        this.importStore.save(operationResult.result);
        this.router.navigate(['projects/import/select']);
      }
    }
    catch(ex) {

    }
  }
}
