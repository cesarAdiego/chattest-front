import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

import { Project } from 'src/app/entities/project';

import { MessageService } from 'primeng/api';
import { ProjectsService } from 'src/app/common/services/projects.service';
import { LanguageCard } from 'src/app/common/modules/language-selector/models/languageCard';
import { LanguagesService } from 'src/app/common/services/languages.service';

@Component({
  selector: 'app-project-popup',
  templateUrl: './project-popup.component.html',
  styleUrls: ['./project-popup.component.scss']
})
export class ProjectPopupComponent implements OnInit {
  project: Project;
  languages: LanguageCard[];
  constructor(private projectService: ProjectsService,
              private languageService: LanguagesService,
              private messageService: MessageService,
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
    console.log(this.project);
    if(!this.project.name || this.project.name == '') {
      this.messageService.add({severity: 'error', summary:'Error', 'detail': 'El nombre del proyecto no puede estar vacío'});
    }
    else if(this.project.botTypeId == 0) {
      this.messageService.add({severity: 'error', summary:'Error', 'detail': 'Debes seleccionar el tipo de bot que deseas probar'});
    }
    else {
      this.projectService.createProject(this.project).subscribe(errorMessages => {
        if(errorMessages.length > 0) {
        errorMessages.forEach(errorMessage => {
          this.messageService.add({severity: 'error', summary:'Error', 'detail': errorMessage});
        });
      }
      else {
        this.messageService.add({severity: 'success', 'summary': 'Nuevo proyecto creado', 'detail': 'Se ha creado correctamente el nuevo proyecto'});
        this.ref.close(errorMessages);
      }
      });
    }
  }

  setSelectedBotType(event) {
    this.project.botTypeId = event.id;
  }
}
