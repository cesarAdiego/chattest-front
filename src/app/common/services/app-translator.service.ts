import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Language } from 'src/app/entities/language';

@Injectable({
  providedIn: 'root'
})
export class AppTranslatorService {
  private currentLanguage = 'en';
  constructor(private translate: TranslateService) { }

  startTranslation() {
    this.translate.setDefaultLang('es');
    this.translate.use(this.currentLanguage);
  }

  setLanguage(language: Language) {
    this.currentLanguage = language.translationCode;
    console.log(this.currentLanguage);
    this.translate.use(this.currentLanguage);
  }

  getCurrentLanguage() {
    return this.currentLanguage
  }

  async getTranslationFrom(key: string) {
    this.translate.get(key).subscribe((res: string) => {
      return res;
    });
  }
}
