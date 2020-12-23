import { Injectable } from '@angular/core';
import { TestImport } from 'src/app/features/import-project-dashboard/entities/testImport';
import { ProjectImport } from '../entities/projectImport';
import { SelectTestImport } from '../entities/SelectTestImport';

@Injectable({
  providedIn: 'root'
})
export class ImportStoreService {
  projectToImport: ProjectImport;
  selectedTestsToImport: SelectTestImport[];
  constructor() { }

  save(projectToImport: ProjectImport) {
    this.projectToImport = projectToImport;
  }

  get() {
    return this.projectToImport;
  }

  getTests(): TestImport[] {
    return this.projectToImport.testsWithContents;
  }

  saveSelectedTests(selectedTests: SelectTestImport[]) {
    this.selectedTestsToImport = selectedTests;
  }

  getSelectedTests(): SelectTestImport[] {
    return this.selectedTestsToImport;
  } 
}
