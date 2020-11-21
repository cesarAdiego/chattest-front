import { Component, Input, OnInit } from '@angular/core';
import { BotTypeCard } from '../../models/botTypeCard';

@Component({
  selector: 'bot-type-card',
  templateUrl: './bot-type-card.component.html',
  styleUrls: ['./bot-type-card.component.scss']
})
export class BotTypeCardComponent implements OnInit {
  @Input() botType: BotTypeCard;
  constructor() { }

  ngOnInit(): void {
  }

}
