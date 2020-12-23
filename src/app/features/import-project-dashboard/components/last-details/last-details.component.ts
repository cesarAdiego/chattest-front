import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ProjectsService } from 'src/app/common/services/projects.service';
import { SelectTestImport } from '../../entities/SelectTestImport';
import { ImportStoreService } from '../../services/import-store.service';

import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-last-details',
  templateUrl: './last-details.component.html',
  styleUrls: ['./last-details.component.scss']
})
export class LastDetailsComponent implements OnInit {
  private selectedTestsToImport: SelectTestImport[];
  newProjectName: string;
  constructor(private message: MessageService,
              private importStore: ImportStoreService,
              private projectsService: ProjectsService,
              private translate: TranslateService,
              private router: Router) { }

  ngOnInit(): void {
    let selectedTests = this.importStore.getSelectedTests();

    if(selectedTests) {
      this.selectedTestsToImport = selectedTests;
    }
    else {
      this.router.navigate(['/projects/import/uploadFile']);
    }
  }

  goToPreviousStep() {
    this.router.navigate(['/projects/import/select']);
  }

  importProject() {
    if(this.newProjectName) {
      let projectToImport = this.importStore.get();
      projectToImport.project.name = this.newProjectName;
      projectToImport.testsWithContents = this.selectedTestsToImport.map(testToImport => testToImport.toTestImport());

      forkJoin([this.projectsService.import(projectToImport), this.translate.get('IMPORT_PROJECT.SUCCESS_IMPORT')])
      .subscribe(([importResponse, successLabel]) => {
        if(importResponse.length > 0) {
          importResponse.forEach(errorMessage => this.message.add({ severity: 'error', summary: 'error', detail: errorMessage}));
        }
        else {
          this.message.add({severity: 'success', summary: 'Success', detail: successLabel});
          setTimeout(() => this.router.navigate(['/projects']), 1000);
        }
      });
    }
    else {
      this.translate.get('IMPORT_PROJECT.PROJECT_NAME_EMPTY').subscribe(message => {
        this.message.add({severity: 'error', summary:'Error', detail: message });
      });
    }
  }
}
