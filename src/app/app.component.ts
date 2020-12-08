import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { UserConfigurationService } from './common/services/user-configuration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chattest-front';

  constructor(userConfiguration: UserConfigurationService,
              translateService: TranslateService,
              cookieService: CookieService) {
    userConfiguration.Get().subscribe(res => {
      cookieService.set('lang', res.language.isoCode);
      translateService.use(res.language.translationCode);
    });
  }
}
