import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BotTypesService } from 'src/app/common/services/bot-types.service';
import { BotType } from 'src/app/entities/botType';
import { BotTypeCard } from '../../models/botTypeCard';

@Component({
  selector: 'bot-type-selector',
  templateUrl: './bot-type-selector.component.html',
  styleUrls: ['./bot-type-selector.component.scss']
})
export class BotTypeSelectorComponent implements OnInit {
  botTypes: BotTypeCard[];
  @Output('selectedBotType') selectedBotTypeEmitter = new EventEmitter<BotType>();

  constructor(private botTypesService: BotTypesService) { }

  ngOnInit(): void {
    this.botTypesService.getAll()
        .subscribe(botTypes => this.botTypes = botTypes.map(botType => new BotTypeCard(botType)));
  }

  selectBotType(botTypeCard: BotTypeCard) {
    this.botTypes.map(botType => botType.selected = false);
    botTypeCard.selected = true;
    let botType = botTypeCard as BotType;
    this.selectedBotTypeEmitter.emit(botType);
  }

}
