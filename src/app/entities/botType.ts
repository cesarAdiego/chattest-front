import { BotTypeDropdownItem } from '../common/modules/bot-type-dropdown/entities/BotTypeDropdownItem';

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