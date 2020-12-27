import { LanguageDropdownItem } from '../common/modules/languages-dropdown/entities/LanguageDropdownItem';
import { Project } from './project';

export class Language {
    public id: number;
    public name: string;
    public isoCode: string;
    public image: string;
    public hasTranslation: boolean;
    public translationCode: string;
    public projects: Project[]
}