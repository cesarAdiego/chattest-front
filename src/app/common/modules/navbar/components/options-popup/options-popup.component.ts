import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { LanguagesService } from 'src/app/common/services/languages.service';
import { UserConfigurationService } from 'src/app/common/services/user-configuration.service';
import { Language } from 'src/app/entities/language';
import { UserConfiguration } from 'src/app/entities/userConfiguration';
import { LanguageCard } from '../../../language-selector/models/languageCard';

import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-options-popup',
  templateUrl: './options-popup.component.html',
  styleUrls: ['./options-popup.component.scss']
})
export class OptionsPopupComponent implements OnInit {
  languagesToSelect: LanguageCard[];
  constructor(private languagesService: LanguagesService,
              private userConfiguration: UserConfigurationService,
              private translateService: TranslateService,
              private messageService: MessageService,
              private cookieService: CookieService) { }

  ngOnInit(): void {
    this.languagesService.getLanguagesWithTranslation().subscribe(languages => {
      this.languagesToSelect = languages.map(language => new LanguageCard(language));
      let currentLanguage = this.translateService.currentLang;
      let selectedLanguage = this.languagesToSelect.find(l => l.translationCode == currentLanguage);

      if(selectedLanguage) {
        selectedLanguage.selected = true;
      }
    });
  }

  setSelectedLanguage(language: Language) {
    let selectedLanguage = this.languagesToSelect.find(l => l.id == language.id);
        
    if(selectedLanguage) {
      let config = new UserConfiguration();
      config.languageId = selectedLanguage.id;

      forkJoin([this.userConfiguration.Put(config), 
                this.translateService.get(['LANGUAGUE_SELECTOR.MODIFIED_LANGUAGE_SUCCESFUL_SUMMARY',
                                          'LANGUAGE_SELECTOR.MODIFIED_LANGUAGE_SUCCESFUL_DETAIL'])])
        .subscribe(([res, labels]) => {
          if(res.length > 0) {
            res.forEach(errorMessage => this.messageService.add({severity: 'error', summary: 'Error', detail: errorMessage}));
          }
          else {
            this.translateService.use(selectedLanguage.translationCode);
            this.cookieService.set('lang', selectedLanguage.isoCode);
            this.messageService.add({severity: 'success',
                                     summary: labels['LANGUAGE_SELECTOR.MODIFIED_LANGUAGE_SUCCESFUL_SUMMARY'],
                                    detail: res['LANGUAGE_SELECTOR.MODIFIED_LANGUAGE_SUCCESFUL_DETAIL']});
            window.location.reload();
          }
        });
    }
  }
}
