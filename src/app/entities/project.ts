import { Language } from './language';
import { ProjectConfiguration } from './projectConfiguration';
import { Test } from './test';

export class Project {
    public id: number;
    public name: string;
    public botTypeId: number;
    public tests: Test[]; 
    public languages: Language[];
    public projectConfiguration: ProjectConfiguration;
}