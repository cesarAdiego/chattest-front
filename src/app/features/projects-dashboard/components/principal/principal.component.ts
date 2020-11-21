import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ProjectsService } from 'src/app/common/services/projects.service';
import { Project } from 'src/app/entities/project';
import { ProjectPopupComponent } from '../project-popup/project-popup.component';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
  providers: [DialogService]
})
export class ProjectsDashboardComponent implements OnInit {
  projects: Project[];
  displayNewProjectDialog: boolean = false;
  constructor(private projectsService: ProjectsService,
              private confirmationService: ConfirmationService,
              private dialogService: DialogService,
              private messageService: MessageService,
              private router: Router) { }

  ngOnInit(): void {
    this.refreshProjects();
  }

  openNewProjectPopup(event) {
    const ref = this.dialogService.open(ProjectPopupComponent, {
      header: 'Nuevo Proyecto',
      'width': '50%',
      'height': '75%'
    });

    ref.onClose.subscribe((errorMessages: string[]) => {
      if(errorMessages.length == 0) {
        this.refreshProjects();
      }
    });
  }

  goToTestsDashboard(projectId: number) {
    this.router.navigate([`/projects/${projectId}/tests`]);
  }

  deleteProject(project: Project) {
    console.log(project);
    this.confirmationService.confirm({
      message: `¿Estas seguro que quieres eliminar el proyecto ${project.name}?`,
      accept: () => {
        this.projectsService.deleteProject(project.id).subscribe(operationResult => {
          if(operationResult.length > 0) {
            operationResult.forEach(errorMessage => {
              this.messageService.add({severity: 'error', summary: 'Error', 'detail': errorMessage});
            });
          }
          else {
            this.messageService.add({severity: 'success', summary:'Proyecto eliminado', 'detail': 'El proyecto se ha eliminado correctamente'});
            this.refreshProjects();
          }
        });
      }
    })
  }

  refreshProjects() {
    this.projectsService.getAllProjects().subscribe(projects => this.projects = projects);
  }
}
