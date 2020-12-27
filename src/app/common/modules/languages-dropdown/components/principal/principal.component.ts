import { Component, OnInit } from '@angular/core';
import { LanguagesService } from 'src/app/common/services/languages.service';
import { Language } from 'src/app/entities/language';
import { LanguageDropdownItem } from '../../entities/LanguageDropdownItem';

@Component({
  selector: 'languages-dropdown',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class LanguagesDropdownComponent implements OnInit {
  languages: LanguageDropdownItem[];
  selectedLanguage: LanguageDropdownItem;

  constructor(private languagesService: LanguagesService) { }

  ngOnInit(): void {
    this.languagesService.getAll().subscribe((res: Language[]) => {
      this.languages = res.map((language: Language) => {
        let item = new LanguageDropdownItem();
        
        item.name = language.name;
        item.id = language.id;
        item.image = language.image;

        return item;
      });
    });
  }

  onChangeSelectedLanguage(event) {
    console.log(event);
  }
}
