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
import { LanguagesService } from 'src/app/common/services/languages.service';
import { LanguageCard } from 'src/app/common/modules/language-selector/models/languageCard';
import { Language } from 'src/app/entities/language';

@Component({
  selector: 'app-last-details',
  templateUrl: './last-details.component.html',
  styleUrls: ['./last-details.component.scss']
})
export class LastDetailsComponent implements OnInit {
  private selectedTestsToImport: SelectTestImport[];
  botTypes: BotTypeCard[];
  languages: LanguageCard[];
  cognigyConfiguration: CognigyConfiguration = new CognigyConfiguration();
  dialogFlowConfiguration: DialogFlowConfiguration = new DialogFlowConfiguration();
  newProjectName: string;
  selectedBotType: BotType;

  constructor(private message: MessageService,
              private importStore: ImportStoreService,
              private botTypesService: BotTypesService,
              private projectsService: ProjectsService,
              private translate: TranslateService,
              private languageService: LanguagesService,
              private router: Router) { }

  ngOnInit(): void {
    let selectedTests = this.importStore.getSelectedTests();
    let projectToImport = this.importStore.get();

    if(selectedTests) {
      this.selectedTestsToImport = selectedTests;

      forkJoin([this.botTypesService.getAll(), this.languageService.getAll()])
        .subscribe(([botTypesRes, languagesRes]) => {
          this.botTypes = botTypesRes.map(type => new BotTypeCard(type));
          let selectedBotType = this.botTypes.find(botType => botType.id == projectToImport.project.botTypeId);
          this.selectedBotType = selectedBotType;
          selectedBotType.selected = true;
  
          if(selectedBotType.isCognigy()) {
            this.cognigyConfiguration.configUrl = projectToImport.configuration.cognigyConfiguration.configUrl;
          }
          else if(selectedBotType.isDialogFlow()) {
            this.dialogFlowConfiguration.projectId = projectToImport.configuration.dialogFlowConfiguration.projectId;
          }

          this.languages = languagesRes.map(language => new LanguageCard(language))
          this.languages.filter(lc => projectToImport.project.languages
                        .map(l => l.id)
                        .includes(lc.id))
                        .map(lc => lc.selected = true);
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
      projectToImport.project.languages = this.languages.filter(l => l.selected).map(l => l as Language);

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

    if(!this.languages.some(l => l.selected)) {
      this.translate.get("IMPORT_PROJECT.ERRORS.NO_LANGUAGES_FOUND")
        .subscribe(res => validationErrors.push(res));
    }

    return validationErrors;
  }
}
