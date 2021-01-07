import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { Project } from 'src/app/entities/project';

@Component({
  selector: 'project-searcher',
  templateUrl: './project-searcher.component.html',
  styleUrls: ['./project-searcher.component.scss']
})
export class ProjectSearcherComponent implements OnInit {
  projectName: string;
  botTypeId: number = 0;
  languageId: number = 0;
  @Input() projectsToFilter: Project[];
  @Output() filterEvent = new EventEmitter<Project[]>();
  constructor() { }

  ngOnInit(): void {
  }

  filterByName() {
    let filteredProjects: Project[];
    if(this.projectName && this.projectName != '') {
      filteredProjects = this.projectsToFilter.filter(p => p.name.includes(this.projectName));
    }
    else {
      filteredProjects = this.projectsToFilter;
    }

    if(this.botTypeId != 0) {
      filteredProjects = filteredProjects.filter(p => p.botTypeId == this.botTypeId);
    }

    if(this.languageId != 0) {
      filteredProjects = filteredProjects.filter(p => p.languages.map(l => l.id).includes(this.languageId));
    }

    this.filterEvent.emit(filteredProjects);
  }

  filterByBotType(botTypeId) {
    this.botTypeId = botTypeId;
    let filteredProjects: Project[];
    if(this.projectName && this.projectName != '') {
      filteredProjects = this.projectsToFilter.filter(p => p.name.includes(this.projectName));
    }
    else {
      filteredProjects = this.projectsToFilter;
    }

    if(botTypeId != 0) {
      filteredProjects = filteredProjects.filter(p => p.botTypeId == this.botTypeId);
    }

    if(this.languageId != 0) {
      filteredProjects = filteredProjects.filter(p => p.languages.map(l => l.id).includes(this.languageId));
    }

    this.filterEvent.emit(filteredProjects);
  }

  filterByLanguage(languageId) {
    this.languageId = languageId;
    let filteredProjects: Project[];
    if(this.projectName && this.projectName != '') {
      filteredProjects = this.projectsToFilter.filter(p => p.name.includes(this.projectName));
    }
    else {
      filteredProjects = this.projectsToFilter;
    }

    if(this.botTypeId != 0) {
      filteredProjects = filteredProjects.filter(p => p.botTypeId == this.botTypeId);
    }

    if(this.languageId != 0) {
      filteredProjects = filteredProjects.filter(p => p.languages.map(l => l.id).includes(languageId));
    }

    this.filterEvent.emit(filteredProjects);
  }

}
