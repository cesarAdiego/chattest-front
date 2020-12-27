import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { BotTypesService } from 'src/app/common/services/bot-types.service';
import { BotType } from 'src/app/entities/botType';
import { BotTypeDropdownItem } from '../../entities/BotTypeDropdownItem';

@Component({
  selector: 'bot-type-dropdown',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class BotTypeDropdownComponent implements OnInit {
  botTypes: BotTypeDropdownItem[];
  selectedBotType: BotTypeDropdownItem;
  constructor(private botTypeService: BotTypesService) { 
    this.botTypeService.getAll().subscribe((res: BotType[]) => {
      this.botTypes = res.map((botType: BotType) => {
        let item = new BotTypeDropdownItem();

        item.name = botType.name;
        item.code = botType.id;
        item.image = botType.logoUrl;

        return item;
      });
    });

  }

  ngOnInit(): void {
  }

  dropdownChange(event) {
    console.log(event);
  }
  
}
