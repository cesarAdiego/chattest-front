import { Language } from 'src/app/entities/language';

export class LanguageCard extends Language{
    selected: boolean;

    constructor(language: Language) {
        super();
        this.id = language.id;
        this.image = language.image;
        this.isoCode = language.isoCode;
        this.name = language.name;
        this.hasTranslation = language.hasTranslation;
        this.translationCode = language.translationCode;
        this.selected = false;
    }
}