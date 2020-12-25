import { Component, Input, OnInit } from '@angular/core';
import { TestContent } from 'src/app/entities/testContent';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss']
})
export class MessagesListComponent implements OnInit {
  @Input() testContent: TestContent;
  constructor() { }

  ngOnInit(): void {
  }

}
