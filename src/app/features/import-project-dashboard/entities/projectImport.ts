import { Project } from "src/app/entities/project";
import { ProjectConfiguration } from "src/app/entities/projectConfiguration";
import { TestImport } from "./testImport";

export class ProjectImport {
    project: Project;
    configuration: ProjectConfiguration;
    testsWithContents: TestImport[];
}