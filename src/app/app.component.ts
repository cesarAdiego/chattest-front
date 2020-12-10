import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { PrimeNGConfig } from 'primeng/api';
import { UserConfigurationService } from './common/services/user-configuration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Chattest';
  initialLoadingSuccesful: boolean;
  firstLoading: boolean = true;

  constructor(private userConfiguration: UserConfigurationService,
              private translateService: TranslateService,
              private cookieService: CookieService,
              private titleService: Title,
              private primeNgConfig: PrimeNGConfig) 
              {
                titleService.setTitle(this.title);
                this.primeNgConfig.ripple = true;
              }

  async ngOnInit(): Promise<void> {
    try {
    let config = await this.userConfiguration.Get();
    this.cookieService.set('lang', config.language.isoCode);
    this.translateService.use(config.language.translationCode);
    this.initialLoadingSuccesful = true;
    } catch(ex) {
      console.log(ex);
      this.initialLoadingSuccesful = false;
    }
    finally {
      this.firstLoading = false;
    }
  }
}
