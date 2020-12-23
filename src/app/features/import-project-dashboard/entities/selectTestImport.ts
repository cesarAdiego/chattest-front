import { TestImport } from "src/app/features/import-project-dashboard/entities/testImport";

export class SelectTestImport {
    testToImport: TestImport;
    selected: boolean;

    constructor(testToImport: TestImport) {
        this.testToImport = testToImport;
        this.selected = true;
    }

    toTestImport() {
        return this.testToImport;
    }
}