import { Component, Input, OnInit } from '@angular/core';
import { Test } from 'src/app/entities/test';

@Component({
  selector: 'test-board',
  templateUrl: './test-board.component.html',
  styleUrls: ['./test-board.component.scss']
})
export class TestBoardComponent implements OnInit {
  @Input() test: Test;

  constructor() { }

  ngOnInit(): void {
  }

}
