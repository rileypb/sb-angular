import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { Issue } from '../issue';

@Component({
  selector: 'sb-sprint-issue-state-list',
  templateUrl: './sprint-issue-state-list.component.html',
  styleUrls: ['./sprint-issue-state-list.component.css']
})
export class SprintIssueStateListComponent implements OnInit {
  @Input() issues;
  @Input() state;

  @Output() transfer:EventEmitter<Issue> = new EventEmitter<Issue>();
  @Output() viewIssue:EventEmitter<Issue> = new EventEmitter<Issue>();

  constructor() { }

  ngOnInit(): void {
  }

  filterFunction() {
  	let state = this.state;
  	return (value:any) => (value.filter(x => x.state == state));
  }

  onTransfer(event) {
    transferArrayItem(event.from.data.issues, event.to.data.issues, event.fromIndex, event.toIndex);
 		this.transfer.emit(event.issue);
  }

  onViewIssue(issue) {
    this.viewIssue.emit(issue);
  }

}
