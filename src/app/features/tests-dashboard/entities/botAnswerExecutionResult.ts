import { Message } from "src/app/entities/message";

export class BotAnswerExecutionResult {
    public expectedBotAnswer: Message;
    public botAnswer: string;
    public areEqual: boolean;
}