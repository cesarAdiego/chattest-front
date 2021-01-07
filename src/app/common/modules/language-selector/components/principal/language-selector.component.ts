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
  @Output() selectedLanguage = new EventEmitter<Language>();
  constructor() { }

  ngOnInit(): void {
  }

  selectLanguage(languageCard: LanguageCard) {
    languageCard.selected = !languageCard.selected;

    this.selectedLanguage.emit(languageCard as Language);
  }
}
