import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Project } from 'src/app/entities/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectValidatorService {

  constructor(private translate: TranslateService) { }

  validateNewProject(project: Project): string[] {
    let validationErrors: string[] = [];

    if(!project.name || project.name == '') {
      this.translate.get('PROJECT_VALIDATOR.EMPTY_NAME').subscribe((res: string) => validationErrors.push(res));
    }
    else if(!project.botTypeId || project.botTypeId == 0){
      this.translate.get('PROJECT_VALIDATOR.EMPTY_BOT').subscribe((res: string) => validationErrors.push(res));
    }
    
    return validationErrors;
  }
}
