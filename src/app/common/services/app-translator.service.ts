import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Language } from 'src/app/entities/language';

@Injectable({
  providedIn: 'root'
})
export class AppTranslatorService {
  currentLanguage = 'es';
  constructor(private translate: TranslateService) { }

  startTranslation() {
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }

  setLanguage(language: Language) {
    this.currentLanguage = language.translationCode;
    this.translate.use(this.currentLanguage);
  }

  async getTranslationFrom(key: string) {
    this.translate.get(key).subscribe((res: string) => {
      return res;
    });
  }
}
