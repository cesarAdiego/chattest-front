import { CognigyConfigurationModel } from "./cognigyConfiguration";
import { DialogFlowConfiguration } from "./dialogFlowConfiguration";

export class ProjectConfiguration {
    public projectId: number;
    public cognigyConfiguration: CognigyConfigurationModel;
    public dialogFlowConfiguration: DialogFlowConfiguration;
}