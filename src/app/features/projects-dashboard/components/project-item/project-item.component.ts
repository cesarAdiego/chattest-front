import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileSaverService } from 'ngx-filesaver';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ProjectsService } from 'src/app/common/services/projects.service';
import { Project } from 'src/app/entities/project';
import { ProjectListModifiedEventService } from '../../services/project-list-modified-event.service';

@Component({
  selector: 'project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {
  @Input() project: Project;
  menuItems: MenuItem[];
  constructor(private projectsService: ProjectsService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private projectListModifiedEvent: ProjectListModifiedEventService,
              private router: Router,
              private fileSaver: FileSaverService) { }

  ngOnInit(): void {
    this.menuItems = [{
      label: 'Delete', icon: 'pi pi-fw pi-minus', command: (click) => {
        this.deleteProject();
        }
      },
      {label: 'Clone', icon: 'pi pi-fw pi-clone', command: (click) => {
        this.cloneProject();
        }
      },
      {label: 'Export', icon: 'pi pi-fw pi-download', command: (click) => {
        this.exportProject();
      }}
    ];
  }

  deleteProject() {
      this.confirmationService.confirm({
        header: "Eliminar proyecto",
        icon: "pi pi-exclamation-triangle",
        message: `¿Estas seguro que quieres eliminar el proyecto ${this.project.name}?`,
        accept: () => {
          this.projectsService.deleteProject(this.project.id).subscribe(operationResult => {
            if(operationResult.length > 0) {
              operationResult.forEach(errorMessage => {
                this.messageService.add({severity: 'error', summary: 'Error', 'detail': errorMessage});
              });
            }
            else {
              this.messageService.add({severity: 'success', summary:'Proyecto eliminado', 'detail': 'El proyecto se ha eliminado correctamente'});
              this.projectListModifiedEvent.emit();
            }
          });
        }
      });
  }

  cloneProject() {

  }

  exportProject() {
    this.projectsService.export(this.project.id).subscribe(res => {
      console.log(res);
      let blob = new Blob([res], {type: 'application/json'});
      this.fileSaver.save(blob, this.project.name);
    });
  }

  goToTestsDashboard() {
    this.router.navigate([`/projects/${this.project.id}/tests`]);
  }
}
