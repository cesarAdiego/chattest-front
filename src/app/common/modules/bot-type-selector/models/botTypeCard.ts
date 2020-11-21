import { BotType } from 'src/app/entities/botType';

export class BotTypeCard extends BotType {
    constructor(botType: BotType) {
        super();
        this.id = botType.id;
        this.name = botType.name;
        this.logoUrl = botType.logoUrl;
        this.selected = false;
    }
    selected: boolean;
}