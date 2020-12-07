import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Language } from 'src/app/entities/language';
import { LanguageCard } from '../../models/languageCard';

@Component({
  selector: 'language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {
  @Input() languages: LanguageCard[];
  @Output('selectedLanguage') selectedLanguageEmmiter = new EventEmitter<Language>();
  
  constructor() { }

  ngOnInit(): void {
  }

  selectLanguage(languageCard: LanguageCard) {
    this.languages.map(language => language.selected = false);
    languageCard.selected = true;
    let language = languageCard as Language;

    this.selectedLanguageEmmiter.emit(language);
  }
}
