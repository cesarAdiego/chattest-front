import { Project } from "src/app/entities/project";
import { TestImport } from "./testImport";

export class ProjectImport {
    project: Project;
    testsWithContents: TestImport[];
}