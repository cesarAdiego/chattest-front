import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ImportStoreService } from '../../services/import-store.service';

import { forkJoin } from 'rxjs';

@Component({
  selector: 'import-project-dashboard',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class ImportProjectDashboardComponent implements OnInit {
  menuItems: MenuItem[];
  newProjectName: string;
  constructor(private testStore: ImportStoreService,
              private translate: TranslateService,
              private router: Router,
              private confirmation: ConfirmationService) {
    this.translate.get(['IMPORT_PROJECT.UPLOAD_STEP',
                        'IMPORT_PROJECT.SELECT_TESTS_STEP',
                        'IMPORT_PROJECT.LAST_DETAILS_STEP'])
        .subscribe(res => {
          this.menuItems = [{
            label: res['IMPORT_PROJECT.UPLOAD_STEP'],
            routerLink: 'uploadFile'
          },
          {
            label: res['IMPORT_PROJECT.SELECT_TESTS_STEP'],
            routerLink: 'select'
          },
          {
            label: res['IMPORT_PROJECT.LAST_DETAILS_STEP'],
            routerLink: 'lastDetails'
          }];
        });
  }

  ngOnInit(): void {
  }

  cancelImport() {
    let testsToImport = this.testStore.get();
    
    if(testsToImport) {
      this.translate.get(['CONFIRMATION_POPUP.YES_LABEL',
                          'CONFIRMATION_POPUP.NO_LABEL',
                          'IMPORT_PROJECT.CANCEL_MESSAGE'])
        .subscribe(res => {
          this.confirmation.confirm({
            message: res['IMPORT_PROJECT.CANCEL_MESSAGE'],
            acceptLabel: res['CONFIRMATION_POPUP.YES_LABEL'],
            rejectLabel: res['CONFIRMATION_POPUP.NO_LABEL'],
            accept: () => {
              this.router.navigate(['/projects']);
            }
          });
        });
    }
    else {
      this.router.navigate(['/projects']);
    }
  }
}
