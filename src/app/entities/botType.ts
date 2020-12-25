import { BotTypeCard } from '../common/modules/bot-type-selector/models/botTypeCard';

export class BotType {
    public id: number;
    public name: string;
    public logoUrl: string;

    isCognigy() {
        return this.id == 1;
    }

    isDialogFlow() {
        return this.id == 3;
    }
}