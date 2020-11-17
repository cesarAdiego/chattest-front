import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

import { Project } from 'src/app/entities/project';

import { MessageService } from 'primeng/api';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-project-popup',
  templateUrl: './project-popup.component.html',
  styleUrls: ['./project-popup.component.scss']
})
export class ProjectPopupComponent implements OnInit {
  project: Project;
  constructor(private projectService: ProjectsService,
              private messageService: MessageService,
              public ref: DynamicDialogRef) { }

  ngOnInit(): void {
      this.project = new Project();
  }

  closePopup(event) {
    this.ref.close();
  }

  createNewProject() {
    if(!this.project.name || this.project.name == '') {
      this.messageService.add({severity: 'error', summary:'Error', 'detail': 'El nombre del proyecto no puede estar vacío'});
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
}
