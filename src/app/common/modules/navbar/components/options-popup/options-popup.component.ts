import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { LanguagesService } from 'src/app/common/services/languages.service';
import { UserConfigurationService } from 'src/app/common/services/user-configuration.service';
import { Language } from 'src/app/entities/language';
import { UserConfiguration } from 'src/app/entities/userConfiguration';
import { LanguageCard } from '../../../language-selector/models/languageCard';

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
              private messageService: MessageService) { }

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
      this.userConfiguration.Put(config).subscribe(errorMessages => {
        if(errorMessages.length > 0) {
          errorMessages.forEach(message => this.messageService.add({severity: 'error', summary: 'Error', detail: message}));
        }
        else {
          this.translateService.use(selectedLanguage.translationCode);
          this.translateService.get(['LANGUAGE_SELECTOR.MODIFIED_LANGUAGE_SUCCESFUL_SUMMARY', 
                                     'LANGUAGE_SELECTOR.MODIFIED_LANGUAGE_SUCCESFUL_DETAIL'])
                               .subscribe((res: string[]) => {
            this.messageService.add({severity: 'success', 
                                     summary: res['LANGUAGE_SELECTOR.MODIFIED_LANGUAGE_SUCCESFUL_SUMMARY'],
                                     detail: res['LANGUAGE_SELECTOR.MODIFIED_LANGUAGE_SUCCESFUL_DETAIL']
                                    });
          });
        }
      })
    }
  }
}
