import { Component, Input, OnInit } from '@angular/core';
import { SelectTestImport } from '../../entities/SelectTestImport';

@Component({
  selector: 'select-test-card',
  templateUrl: './select-test-card.component.html',
  styleUrls: ['./select-test-card.component.scss']
})
export class SelectTestCardComponent implements OnInit {
  @Input() selectTest: SelectTestImport;
  constructor() { }

  ngOnInit(): void {
  }

}
