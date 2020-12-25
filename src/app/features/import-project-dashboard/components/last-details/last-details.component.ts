import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ProjectsService } from 'src/app/common/services/projects.service';
import { SelectTestImport } from '../../entities/SelectTestImport';
import { ImportStoreService } from '../../services/import-store.service';

import { forkJoin } from 'rxjs';
import { BotTypeCard } from 'src/app/common/modules/bot-type-selector/models/botTypeCard';
import { BotTypesService } from 'src/app/common/services/bot-types.service';
import { CognigyConfiguration } from 'src/app/entities/cognigyConfiguration';
import { DialogFlowConfiguration } from 'src/app/entities/dialogFlowConfiguration';
import { BotType } from 'src/app/entities/botType';

@Component({
  selector: 'app-last-details',
  templateUrl: './last-details.component.html',
  styleUrls: ['./last-details.component.scss']
})
export class LastDetailsComponent implements OnInit {
  private selectedTestsToImport: SelectTestImport[];
  botTypes: BotTypeCard[];
  cognigyConfiguration: CognigyConfiguration = new CognigyConfiguration();
  dialogFlowConfiguration: DialogFlowConfiguration = new DialogFlowConfiguration();
  newProjectName: string;
  selectedBotType: BotType;

  constructor(private message: MessageService,
              private importStore: ImportStoreService,
              private botTypesService: BotTypesService,
              private projectsService: ProjectsService,
              private translate: TranslateService,
              private router: Router) { }

  ngOnInit(): void {
    let selectedTests = this.importStore.getSelectedTests();
    let projectToImport = this.importStore.get();

    if(selectedTests) {
      this.selectedTestsToImport = selectedTests;
      this.botTypesService.getAll().subscribe(res =>{ 
        this.botTypes = res.map(type => new BotTypeCard(type));
        let selectedBotType = this.botTypes.find(botType => botType.id == projectToImport.project.botTypeId);
        this.selectedBotType = selectedBotType;
        selectedBotType.selected = true;

        if(selectedBotType.isCognigy()) {
          this.cognigyConfiguration.configUrl = projectToImport.configuration.cognigyConfiguration.configUrl;
        }
        else if(selectedBotType.isDialogFlow()) {
          this.dialogFlowConfiguration.projectId = projectToImport.configuration.dialogFlowConfiguration.projectId;
        }
      });
    }
    else {
      this.router.navigate(['/projects/import/uploadFile']);
    }
  }

  importProject() {
    let validationErrors = this.validateProjectImport();
    
    if(validationErrors.length == 0) {
      let projectToImport = this.importStore.get();

      if(this.selectedBotType.isCognigy()) {
        projectToImport.configuration.dialogFlowConfiguration = undefined;
        projectToImport.configuration.cognigyConfiguration = this.cognigyConfiguration;
      }
      else if(this.selectedBotType.isDialogFlow()) {
        projectToImport.configuration.cognigyConfiguration = undefined;
        projectToImport.configuration.dialogFlowConfiguration = this.dialogFlowConfiguration;
      }

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
      validationErrors.forEach(errorMessage => this.message.add({severity: 'error', summary: 'Error', detail: errorMessage}));
    }
  }

  
  goToPreviousStep() {
    this.router.navigate(['/projects/import/select']);
  }

  selectBotType(botTypeCard: BotTypeCard) {
    this.selectedBotType = botTypeCard as BotType;
    this.botTypes.map(botType => botType.selected = false);
    botTypeCard.selected = true;
  }

  validateProjectImport() {
    let validationErrors: string[] = [];

    if(!this.newProjectName) {
      this.translate.get('IMPORT_PROJECT.ERRORS.PROJECT_NAME_EMPTY').subscribe(res => validationErrors.push(res));
    }

    if(this.selectedBotType.isCognigy() && !this.cognigyConfiguration.configUrl) {
      this.translate.get("IMPORT_PROJECT.ERRORS.COGNIGY_CONFIGURATION_URL_EMPTY")
          .subscribe(res => validationErrors.push(res));
    }

    if(this.selectedBotType.isDialogFlow() && !this.dialogFlowConfiguration.projectId) {
      this.translate.get("IMPORT_PROJECT.ERRORS.DIALOGFLOW_PROJECT_ID_EMPTY")
          .subscribe(res => validationErrors.push(res));
    }

    return validationErrors;
  }
}
