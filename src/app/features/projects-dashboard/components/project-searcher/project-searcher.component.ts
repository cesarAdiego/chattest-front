import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { Project } from 'src/app/entities/project';

@Component({
  selector: 'project-searcher',
  templateUrl: './project-searcher.component.html',
  styleUrls: ['./project-searcher.component.scss']
})
export class ProjectSearcherComponent implements OnInit {
  projectName: string;
  @Input() projectsToFilter: Project[];
  @Output() filterEvent = new EventEmitter<Project[]>();
  constructor() { }

  ngOnInit(): void {
  }

  filterByName() {
    let filteredProjects: Project[];
    if(this.projectName != '') {
      filteredProjects = this.projectsToFilter.filter(p => p.name.includes(this.projectName));
    }
    else {
      filteredProjects = this.projectsToFilter;
    }

    this.filterEvent.emit(filteredProjects);
  }

}
