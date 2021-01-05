import { BotAnswerExecutionResult } from "./botAnswerExecutionResult";

export class TestExecutionResult {
    public botAnswerExecutions: BotAnswerExecutionResult[];
    public hasErrors: boolean;
    public hasTimeoutError: boolean;
}