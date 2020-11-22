import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LanguagesService } from 'src/app/common/services/languages.service';
import { Language } from 'src/app/entities/language';
import { LanguageCard } from '../../models/languageCard';

@Component({
  selector: 'language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {
  @Input() languages: LanguageCard[];
  @Output('selectedLanguague') selectedLanguageEmmiter = new EventEmitter<Language>();
  
  constructor(private languagesService: LanguagesService) { }

  ngOnInit(): void {
  }

  selectLanguage(languageCard: LanguageCard) {
    this.languages.map(language => language.selected = false);
    languageCard.selected = true;
    let language = languageCard as Language;

    this.selectedLanguageEmmiter.emit(language);
  }
}
