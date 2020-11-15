import { Project } from './project';

export class Language {
    id: number;
    name: string;
    isoCode: string;
    image: string;
    projects: Project[]
}