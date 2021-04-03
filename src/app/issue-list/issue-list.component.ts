import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Issue } from '../issue';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { Color } from '../color';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IssuesService } from '../issues.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { callWithSnackBar } from '../util';

@Component({
  selector: 'sb-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit {
  
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
  @Input() showEmptyListSpace:boolean;

  @Output() issueSelected:EventEmitter<Issue> = new EventEmitter<Issue>();
  @Output() transfer:EventEmitter<any> = new EventEmitter<any>();
  @Output() reorder:EventEmitter<any> = new EventEmitter<any>();
  @Output() issueRemoved:EventEmitter<Issue> = new EventEmitter<Issue>();
  @Output() viewIssue:EventEmitter<Issue> = new EventEmitter<Issue>();

  constructor(private issuesService:IssuesService, private snackBar:MatSnackBar) { }

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

  onViewIssue(issue:Issue) {
    this.viewIssue.emit(issue);
  }

  ngOnDestroy() {
    
  }

  markCompleted(issue:Issue) {
    callWithSnackBar(
      this.snackBar,
      this.issuesService.markCompleted(issue.id),
      ["Marking issue complete...", "Marked issue complete", "Error marking issue complete"]
    );
  }

  moveToBacklog(issue:Issue) {
    callWithSnackBar(
      this.snackBar,
      this.issuesService.moveToBacklog(issue.id),
      ["Moving to backlog...", "Moved to backlog", "Error moving to backlog"]
    );
  }
}
