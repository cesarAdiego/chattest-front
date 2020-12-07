import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguagesService } from 'src/app/common/services/languages.service';
import { Language } from 'src/app/entities/language';
import { LanguageCard } from '../../../language-selector/models/languageCard';

@Component({
  selector: 'app-options-popup',
  templateUrl: './options-popup.component.html',
  styleUrls: ['./options-popup.component.scss']
})
export class OptionsPopupComponent implements OnInit {
  languagesToSelect: LanguageCard[];
  constructor(private languagesService: LanguagesService,
              private translateService: TranslateService) { }

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
      this.translateService.use(selectedLanguage.translationCode);
    }
  }
}
