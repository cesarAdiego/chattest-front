import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Test } from 'src/app/entities/test';
import { SelectTestEventService } from '../../services/select-test-event.service';

@Component({
  selector: 'test-item',
  templateUrl: './test-item.component.html',
  styleUrls: ['./test-item.component.scss']
})
export class TestItemComponent implements OnInit {
  @Input() test: Test;
  menuItems: MenuItem[];
  constructor(private selectTestEvent: SelectTestEventService)
  { }

  ngOnInit(): void {
    this.menuItems = [
      {label: 'Delete', icon: 'pi pi-fw pi-trash', command: (click) => {
        
      }},
      {label: 'Clone', icon: 'pi pi-fw pi-clone', command: (click) => {
        
      }}
    ];
  }

  selectTest() {
    this.selectTestEvent.emitEvent(this.test);
  }
}
