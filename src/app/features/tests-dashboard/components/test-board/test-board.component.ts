import { Component, Input, OnInit } from '@angular/core';
import { TestContentService } from 'src/app/common/services/test-content.service';
import { Test } from 'src/app/entities/test';
import { TestContent } from 'src/app/entities/testContent';
import { SelectTestEventService } from '../../services/select-test-event.service';

@Component({
  selector: 'test-board',
  templateUrl: './test-board.component.html',
  styleUrls: ['./test-board.component.scss']
})
export class TestBoardComponent implements OnInit {
  @Input() test: Test;
  testContent: TestContent;
  constructor(private selectTestEvent: SelectTestEventService,
              private testContentService: TestContentService) { }

  ngOnInit(): void {
    this.selectTestEvent.eventListener().subscribe(res => {
      this.testContentService.get(res.id).subscribe(content => this.testContent = content);
    })
  }

  executeTest() {
    this.testContentService.execute(this.test.id).subscribe(res => {

    });
  }
}
