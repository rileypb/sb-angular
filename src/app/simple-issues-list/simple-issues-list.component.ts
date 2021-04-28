import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Issue } from '../issue';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { Color } from '../color';
import { IssuesService } from '../issues.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { callWithSnackBar } from '../util';
import { ProjectService } from '../project.service';

@Component({
  selector: 'sb-simple-issues-list',
  templateUrl: './simple-issues-list.component.html',
  styleUrls: ['./simple-issues-list.component.css']
})
export class SimpleIssuesListComponent implements OnInit {
  @Input() container:any;
  @Input() issues:any;

  @Output() issueSelected:EventEmitter<Issue> = new EventEmitter<Issue>();
  @Output() transfer:EventEmitter<any> = new EventEmitter<any>();
  @Output() reorder:EventEmitter<any> = new EventEmitter<any>();

  constructor(private issuesService:IssuesService, private snackBar:MatSnackBar, private projectService:ProjectService) { }

  ngOnInit(): void {
  }

  onDrop(event: CdkDragDrop<any>) {
    console.log("Foooo");
    if (event.previousContainer == event.container) {
      console.log("onDrop");
      moveItemInArray(event.container.data.issues, event.previousIndex, event.currentIndex);
      this.onReorder({ container: this.container, fromIndex: event.previousIndex, toIndex: event.currentIndex });
    } else {
      let issue = event.previousContainer.data.issues[event.previousIndex];
      this.transfer.emit({ from: event.previousContainer, to: event.container, issue: issue, fromIndex: event.previousIndex, toIndex: event.currentIndex });
    }
  }

  fontColor(bgColor:string):string {
  	return Color.fontColor(bgColor);
  }

  clickIssue(issue:Issue) {
  	this.issueSelected.emit(issue);
  }

  onReorder(reorderData) {
    console.log("HERE");
    let currentIssues = [...this.issues];
    moveItemInArray(currentIssues, reorderData.fromIndex, reorderData.toIndex);
    // this.dataService.update(`projects/${this.project.id}/issues`, { issues: { list: currentIssues }});
    callWithSnackBar(this.snackBar, this.projectService.reorderIssues(reorderData.container, reorderData.fromIndex, reorderData.toIndex), 
                     ['Updating Order...', 'Updated Order', 'Error Updating order']);
  }

  onTransfer(transferData) {
    console.log("HERE");
    let tmpArray = [...transferData.to.data.issues];
    transferArrayItem([...transferData.from.data.issues], tmpArray, transferData.fromIndex, transferData.toIndex);
    delete transferData.issue.sprint;
    // this.dataService.update(`projects/${this.project.id}/issues`, { issues: { list: tmpArray }});
    this.transfer.emit(transferData);
  }
}
