import { CognigyConfiguration } from "./cognigyConfiguration";
import { DialogFlowConfiguration } from "./dialogFlowConfiguration";

export class ProjectConfiguration {
    public projectId: number;
    public cognigyConfiguration: CognigyConfiguration;
    public dialogFlowConfiguration: DialogFlowConfiguration;
}