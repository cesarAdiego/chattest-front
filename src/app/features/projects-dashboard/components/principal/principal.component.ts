import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ProjectsService } from 'src/app/common/services/projects.service';
import { Project } from 'src/app/entities/project';
import { ProjectListModifiedEventService } from '../../services/project-list-modified-event.service';
import { ProjectPopupComponent } from '../project-popup/project-popup.component';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
  providers: [DialogService]
})
export class ProjectsDashboardComponent implements OnInit {
  allProjects: Project[];
  projectsToShow: Project[];
  showSearcher: boolean = false;
  displayNewProjectDialog: boolean = false;
  constructor(private projectsService: ProjectsService,
              private dialogService: DialogService,
              private projectListModifiedEvent: ProjectListModifiedEventService,
              private router: Router,
              private translate: TranslateService) { }

  ngOnInit(): void {
    this.refreshProjects();
    this.projectListModifiedEvent.eventListener().subscribe(_ => this.refreshProjects());
  }

  openNewProjectPopup(event) {
    this.translate.get('PROJECT_POPUP.CREATE_PROJECT_TITLE').subscribe(res => {
      const ref = this.dialogService.open(ProjectPopupComponent, {
        header: res,
        'width': '50%',
        'height': '75%'
      });
  
      ref.onClose.subscribe((errorMessages: string[]) => {
        if(errorMessages && errorMessages.length == 0) {
          this.refreshProjects();
        }
      });
    });
  }

  refreshProjects() {
    this.projectsService.getAllProjects().subscribe(projects => {
      this.allProjects = projects;
      this.projectsToShow = projects;
    });
  }

  filterProjects(event: Project[]) {
    this.projectsToShow = event;
  }

  goToImportProjectPage() {
    this.router.navigate(['/projects/import/uploadFile']);
  }
}
