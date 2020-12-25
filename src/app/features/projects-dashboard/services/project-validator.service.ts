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
    this.translate.get(['PROJECT_VALIDATOR.EMPTY_NAME',
                        'PROJECT_VALIDATOR.EMPTY_BOT',
                        'PROJECT_VALIDATOR.COGNIGY_BOT.CONFIG_URL_EMPTY',
                        'PROJECT_VALIDATOR.DIALOGFLOW_BOT.PROJECT_ID_EMPTY'])
        .subscribe(labels => {
          if(!project.name || project.name == '') {
            validationErrors.push(labels['PROJECT_VALIDATOR.EMPTY_NAME']);
          }

          if(!project.botTypeId || project.botTypeId == 0){
            validationErrors.push(labels['PROJECT_VALIDATOR.EMPTY_BOT']);
          }
          else {
            if(project.botType.isCognigy() && !project.configuration.cognigyConfiguration.configUrl) {
              validationErrors.push(labels['PROJECT_VALIDATOR.COGNIGY_BOT.CONFIG_URL_EMPTY']);
            }
            else if(project.botType.isDialogFlow() && !project.configuration.dialogFlowConfiguration.projectId) {
              validationErrors.push(labels['PROJECT_VALIDATOR.DIALOGFLOW_BOT.PROJECT_ID_EMPTY']);
            }
          }
        });
    return validationErrors;
  }
}
