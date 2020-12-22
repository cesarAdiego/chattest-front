import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'import-project-dashboard',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class ImportProjectDashboardComponent implements OnInit {
  menuItems: MenuItem[];
  newProjectName: string;
  constructor() { 
    this.menuItems = [{
      label: 'Choose your way',
      routerLink: 'uploadFile'
    },
    {
      label: 'Select the tests to upload',
      routerLink: 'tests'
    }];
  }

  ngOnInit(): void {
  }

  cancelImport() {

  }
}
