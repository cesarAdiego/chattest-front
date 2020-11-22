import { Component, OnInit } from '@angular/core';
import { LanguagesService } from 'src/app/common/services/languages.service';
import { LanguageCard } from '../../../language-selector/models/languageCard';

@Component({
  selector: 'app-options-popup',
  templateUrl: './options-popup.component.html',
  styleUrls: ['./options-popup.component.scss']
})
export class OptionsPopupComponent implements OnInit {
  languagesToSelect: LanguageCard[];
  constructor(private languagesService: LanguagesService) { }

  ngOnInit(): void {
    this.languagesService.getLanguagesWithTranslation().subscribe(languages => {
      this.languagesToSelect = languages.map(language => new LanguageCard(language));
      console.log(this.languagesToSelect);
    });
  }

}
