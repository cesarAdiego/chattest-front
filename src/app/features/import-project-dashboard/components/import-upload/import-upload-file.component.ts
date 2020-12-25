import { Component, OnInit } from '@angular/core';
import { OperationResult } from 'src/app/entities/operationResult';
import { TestImport } from 'src/app/features/import-project-dashboard/entities/testImport';
import { environment } from 'src/environments/environment';

import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ImportStoreService } from '../../services/import-store.service';
import { ProjectImport } from '../../entities/projectImport';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'import-choose',
  templateUrl: './import-upload-file.component.html',
  styleUrls: ['./import-upload-file.component.scss']
})
export class ImportUploadFileComponent implements OnInit {
  apiUrl = `${environment.apiUrl}/projects/import/getTests`;
  constructor(private message: MessageService,
              private importStore: ImportStoreService,
              private translate: TranslateService,
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
        if(operationResult.result.testsWithContents.length > 0) {
        this.importStore.save(operationResult.result);
        this.router.navigate(['projects/import/select']);
      }
      else {
        this.translate.get('IMPORT_PROJECT.NO_TESTS_FOUND_ERROR').subscribe(errorMessage => {
          this.message.add({severity: 'error', summary: 'Error', detail: errorMessage});
        });
      }
    }
    }
    catch(ex) {

    }
  }
}
