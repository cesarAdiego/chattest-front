import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserConfigurationService } from './common/services/user-configuration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chattest-front';

  constructor(userConfiguration: UserConfigurationService,
              translateService: TranslateService) {
    userConfiguration.Get().subscribe(res => {
      translateService.use(res.language.translationCode);
    });
  }
}
