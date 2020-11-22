import { Component, Input, OnInit } from '@angular/core';
import { LanguageCard } from '../../models/languageCard';

@Component({
  selector: 'language-card',
  templateUrl: './language-card.component.html',
  styleUrls: ['./language-card.component.scss']
})
export class LanguageCardComponent implements OnInit {
  @Input() language: LanguageCard;
  constructor() { }

  ngOnInit(): void {
  }
}
