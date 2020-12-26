import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

import { Project } from 'src/app/entities/project';

import { MessageService } from 'primeng/api';
import { ProjectsService } from 'src/app/common/services/projects.service';
import { LanguageCard } from 'src/app/common/modules/language-selector/models/languageCard';
import { LanguagesService } from 'src/app/common/services/languages.service';
import { ProjectValidatorService } from '../../services/project-validator.service';
import { TranslateService } from '@ngx-translate/core';
import { CognigyConfiguration } from 'src/app/entities/cognigyConfiguration';
import { DialogFlowConfiguration } from 'src/app/entities/dialogFlowConfiguration';
import { ProjectConfiguration } from 'src/app/entities/projectConfiguration';

@Component({
  selector: 'app-project-popup',
  templateUrl: './project-popup.component.html',
  styleUrls: ['./project-popup.component.scss']
})
export class ProjectPopupComponent implements OnInit {
  project: Project;
  cognigyConfiguration: CognigyConfiguration = new CognigyConfiguration();
  dialogFlowConfiguration: DialogFlowConfiguration = new DialogFlowConfiguration();
  languages: LanguageCard[];
  constructor(private projectService: ProjectsService,
              private validatorService: ProjectValidatorService,
              private languageService: LanguagesService,
              private messageService: MessageService,
              private translate: TranslateService,
              public ref: DynamicDialogRef) { }

  ngOnInit(): void {
      this.project = new Project();
      this.languageService.getAll().subscribe(languages => {
        this.languages = languages.map(language => new LanguageCard(language));
      });
  }

  closePopup(event) {
    this.ref.close();
  }

  createNewProject() {
    this.setConfiguration();
    this.setLanguages();
    let validationMessages = this.validatorService.validateNewProject(this.project);

    if(validationMessages.length != 0) {
      validationMessages.forEach(message => this.messageService.add({severity: 'error', summary: 'Error', 'detail': message}));
    }
    else {
      this.projectService.createProject(this.project).subscribe(errorMessages => {
        if(errorMessages.length > 0) {
        errorMessages.forEach(errorMessage => {
          this.messageService.add({severity: 'error', summary:'Error', 'detail': errorMessage});
        });
      }
      else {
        this.translate.get(['PROJECTS_DASHBOARD.NEW_PROJECT_CREATED_SUMMARY', 'PROJECTS_DASHBOARD.NEW_PROJECT_CREATED_DETAIL']).subscribe(messages => {
          this.messageService.add({severity: 'success',
                                   'summary': messages['PROJECTS_DASHBOARD.NEW_PROJECT_CREATED_SUMMARY'],
                                   'detail': messages['PROJECTS_DASHBOARD.NEW_PROJECT_CREATED_DETAIL']});
          this.ref.close(errorMessages);  
        });
      }
      });
    }
  }

  setSelectedBotType(event) {
    this.project.botTypeId = event.id;
    this.project.botType = event;
  }

  setConfiguration() {
    this.project.configuration = new ProjectConfiguration();
    
    if(this.project.botType) {
      if(this.project.botType.isCognigy()) {
        this.project.configuration.cognigyConfiguration = this.cognigyConfiguration;
      }
      else if(this.project.botType.isDialogFlow()) {
        this.project.configuration.dialogFlowConfiguration = this.dialogFlowConfiguration;
      }
    }
  }

  setLanguages() {
    let selectedLanguages = this.languages.filter(language => language.selected);
    this.project.languages = selectedLanguages;
  }
}
