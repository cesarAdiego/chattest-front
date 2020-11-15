import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/entities/project';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class ProjectsDashboardComponent implements OnInit {
  projects: Project[];
  constructor(private projectsService: ProjectsService) { }

  ngOnInit(): void {
    this.projectsService.getAllProjects().subscribe(projects => this.projects = projects);
  }

  openNewProjectPopup(event) {
    
  }
}
