import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
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
              private fileSaver: FileSaverService,
              private translate: TranslateService) { }

  ngOnInit(): void {
    this.translate.get(['PROJECT_ITEM.DELETE_LABEL',
                        'PROJECT_ITEM.CLONE_LABEL',
                        'PROJECT_ITEM.EXPORT_LABEL'])
        .subscribe(res => {
          this.menuItems = [{
            label: res['PROJECT_ITEM.DELETE_LABEL'], icon: 'pi pi-fw pi-minus', command: (click) => {
              this.deleteProject();
              }
            },
            {label: res['PROJECT_ITEM.CLONE_LABEL'], icon: 'pi pi-fw pi-clone', command: (click) => {
              this.cloneProject();
              }
            },
            {label: res['PROJECT_ITEM.EXPORT_LABEL'], icon: 'pi pi-fw pi-download', command: (click) => {
              this.exportProject();
            }}
          ];
        });
  }

  deleteProject() {
    this.translate.get(['DELETE_PROJECT_POPUP.HEADER',
                        'DELETE_PROJECT_POPUP.MESSAGE',
                        'DELETE_PROJECT_POPUP.SUCCESS_SUMMARY',
                        'DELETE_PROJECT_POPUP.SUCCESS_MESSAGE',
                        'CONFIRMATION_POPUP.YES_LABEL',
                        'CONFIRMATION_POPUP.NO_LABEL'],
                        { value: this.project.name})
        .subscribe(res => {
          this.confirmationService.confirm({
            header: res['DELETE_PROJECT_POPUP.HEADER'],
            icon: "pi pi-exclamation-triangle",
            message: res['DELETE_PROJECT_POPUP.MESSAGE'],
            acceptLabel: res['CONFIRMATION_POPUP.YES_LABEL'],
            rejectLabel: res['CONFIRMATION_POPUP.NO_LABEL'],
            accept: () => {
              this.projectsService.deleteProject(this.project.id).subscribe(operationResult => {
                if(operationResult.length > 0) {
                  operationResult.forEach(errorMessage => {
                    this.messageService.add({severity: 'error', summary: 'Error', 'detail': errorMessage});
                  });
                }
                else {
                  this.messageService.add({severity: 'success', 
                                           summary:res['DELETE_PROJECT_POPUP.SUCCESS_SUMMARY'],
                                          'detail': res['DELETE_PROJECT_POPUP.SUCCESS_MESSAGE']});
                  this.projectListModifiedEvent.emit();
                }
              });
            }
          });
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
