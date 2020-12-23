import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { SelectTestImport } from '../../entities/SelectTestImport';
import { ImportStoreService } from '../../services/import-store.service';

@Component({
  selector: 'app-select-tests',
  templateUrl: './select-tests.component.html',
  styleUrls: ['./select-tests.component.scss']
})
export class SelectTestsComponent implements OnInit {
  testsToImport: SelectTestImport[];
  constructor(private testStore: ImportStoreService,
              private messageService: MessageService,
              private translate: TranslateService,
              private router: Router) { }

  ngOnInit(): void {
    let storedTests = this.testStore.getTests();

    if(storedTests) {
      this.testsToImport = storedTests.map(t => new SelectTestImport(t));
    }
    else {
      this.router.navigate(['/projects/import/uploadFile']);
    }
  }

  selectAllTests() {
    this.testsToImport.forEach(test => test.selected = true);
  }

  unselectAllTests() {
    this.testsToImport.forEach(test => test.selected = false);
  }

  goToPreviousStep() {
    this.router.navigate(['/projects/import/uploadFile']);
  }

  goToNextStep() {
    if(this.testsToImport.every(test => !test.selected)) {
      this.translate.get('IMPORT_PROJECT.SELECT_TESTS_ERROR').subscribe(res => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: res});
      });
    }
    else {
      let selectedTests = this.testsToImport.filter(test => test.selected);
      this.testStore.saveSelectedTests(selectedTests);
      this.router.navigate(['/projects/import/lastDetails']);
    }
  }
}
