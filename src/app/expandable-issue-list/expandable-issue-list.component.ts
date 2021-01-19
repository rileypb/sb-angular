import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Issue } from '../issue';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { Color } from '../color';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'sb-expandable-issue-list',
  templateUrl: './expandable-issue-list.component.html',
  styleUrls: ['./expandable-issue-list.component.css']
})
export class ExpandableIssueListComponent implements OnInit {
  
  @Input() filter:(value:any, index:number)=>any = null;
  private subj:Subject<any> = new ReplaySubject<any>(1);
  filteredIssues:Observable<any> = this.subj.pipe(
    map((value, index) => {
      if (this.filter) {
        return this.filter(value, index);
      } else {
        return value;
      }
    }
  ));
  @Input() fixed:boolean;
  @Input() container:any;
  @Input() allowRemove:boolean;
  @Input() showViewIcon:boolean;

  @Output() issueSelected:EventEmitter<Issue> = new EventEmitter<Issue>();
  @Output() transfer:EventEmitter<any> = new EventEmitter<any>();
  @Output() reorder:EventEmitter<any> = new EventEmitter<any>();
  @Output() issueRemoved:EventEmitter<Issue> = new EventEmitter<Issue>();
  @Output() viewIssue:EventEmitter<Issue> = new EventEmitter<Issue>();

  constructor() { }

  ngOnInit(): void {
  }

  @Input() 
  set issues(value:Issue[]) {
    this._issues = value;
    this.subj.next(value);
  }
  get issues():Issue[] {
    return this._issues;
  }
  private _issues:Issue[];

  onDrop(event: CdkDragDrop<any>) {
    if (event.previousContainer == event.container) {
      console.log("onDrop");
      // moveItemInArray(event.container.data.issues, event.previousIndex, event.currentIndex);
      this.reorder.emit({ container: this.container, fromIndex: event.previousIndex, toIndex: event.currentIndex });
    } else {
      let issue = event.previousContainer.data.issues[event.previousIndex];
      this.transfer.emit({ from: event.previousContainer, to: event.container, issue: issue, fromIndex: event.previousIndex, toIndex: event.currentIndex });
    }
    // if (event.previousContainer == event.container) {
    //   // just move stuff around
    //   moveItemInArray(event.container.data.issues, event.previousIndex, event.currentIndex);
    //   let order = "";    
    //   for (let i of event.container.data.issues) {
    //     if (order.length > 0) {
    //       order += ",";
    //     }
    //     order += i.id;
    //   }
    //   this.epic.issue_order = order;
    //   console.log("HERE");
    //   this.updateEpic.emit(this.epic);
    // } else {
    // 	console.log("HERE")
    //   // need to move between containers
    //   let issue = event.previousContainer.data.issues[event.previousIndex];
    //   transferArrayItem(event.previousContainer.data.issues, event.container.data.issues, event.previousIndex, event.currentIndex);
    //   let order1 = "";    
    //   for (let i of event.previousContainer.data.issues) {
    //     if (order1.length > 0) {
    //       order1 += ",";
    //     }
    //     order1 += i.id;
    //   }
    //   let order2 = "";    
    //   for (let i of event.container.data.issues) {
    //     if (order2.length > 0) {
    //       order2 += ",";
    //     }
    //     order2 += i.id;
    //   }

    //   let project1 = event.previousContainer.data.project;
    //   let sprint1 = event.previousContainer.data.sprint;
    //   let epic1 = event.previousContainer.data.epic;
    //   let project2 = event.container.data.project;
    //   let sprint2 = event.container.data.sprint;
    //   let epic2 = event.container.data.epic;

    //   if (epic1) {
    //   	issue.epic = epic2;
    //   	this.onTransfer.emit({epicId1: epic1.id, order1: order1, epicId2: epic2.id, order2: order2});
    //   } else {
    //   	this.onTransfer.emit({projectId1: project1.id, sprintId1: sprint1.id, order1: order1, 
	   //      projectId2: project2.id, sprintId2: sprint2.id, order2: order2});
    //   }
    // }
  }

  fontColor(bgColor:string):string {
  	return Color.fontColor(bgColor);
  }

  clickIssue(issue:Issue) {
  	this.issueSelected.emit(issue);
  }

  removeIssue(issue:Issue) {
    this.issueRemoved.emit(issue);
  }

  onViewIssue(event, issue:Issue) {
  	event.stopPropagation();
    this.viewIssue.emit(issue);
  }

  ngOnDestroy() {
    
  }

}
