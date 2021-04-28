import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../project';
import { Issue } from '../issue';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from '../data.service';
import { ProjectService } from '../project.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { callWithSnackBar } from '../util';
import { Subscription, BehaviorSubject } from 'rxjs';
import { moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";


@Component({
  selector: 'sb-project-issue-list',
  templateUrl: './project-issue-list.component.html',
  styleUrls: ['./project-issue-list.component.css']
})
export class ProjectIssueListComponent implements OnInit {

  @Input() allIssuesAllowed:boolean = false;
  @Input() fixed:boolean = false;

  @Input() project:Project;

  @Output() selectIssue:EventEmitter<Issue> = new EventEmitter<Issue>();

  @Output() transfer:EventEmitter<any> = new EventEmitter<any>();

  mode:string = "backlog";

  issues:BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private dataSubscription:Subscription;
  private lastIssuesValue:any = null;

  constructor(public dataService:DataService, private snackBar:MatSnackBar, private projectService:ProjectService) { }

  ngOnInit(): void {
  	this.dataService.load(`projects/${this.project.id}/issues`, [`projects/${this.project.id}`, `projects/${this.project.id}/issues`, `projects/${this.project.id}/issues/*`, 
                          `projects/${this.project.id}/epics/*`, 'issues/*']);
  	this.dataSubscription = this.dataService.values[`projects/${this.project.id}/issues`].pipe(
  		map((value, index) => {
        console.log("MAP");
  			return value ? value.issues.list : null;
  		})
  	).subscribe(
      x => {
        this.lastIssuesValue = x;
        this.issues.next(x);
        this.updateWithRequestedIssue();
      }
    );
  }

  updateWithRequestedIssue() {
    if (this.requestedIssueId && this.lastIssuesValue) {
      let requestedIssue:Issue = null;
      for (let issue of this.lastIssuesValue) {
        if (issue.id == this.requestedIssueId) {
          requestedIssue = issue;
          this.selectIssue.emit(requestedIssue);
          break;
        }
      }
      this.requestedIssueId = null;
    }
  }

  @Input() set requestedIssueId(value:number) {
    this._requestedIssueId = value;
    if (value) {
      this.updateWithRequestedIssue();
    }
  }
  get requestedIssueId():number {
    return this._requestedIssueId;
  }
  private _requestedIssueId:number = null;

  ngOnDestroy() {
    this.dataService.unload(`projects/${this.project.id}/issues`, [`projects/${this.project.id}`, `projects/${this.project.id}/issues`, `projects/${this.project.id}/issues/*`, 
                          `projects/${this.project.id}/epics/*`, 'issues/*']);
    this.dataSubscription.unsubscribe();
  }

  filterBacklogIssues(value:any, index:number):any {
    console.log("filter");
    let result = [];
    for (let issue of value) {
      if (!issue.sprint) {
        result.push(issue);
      }
    }
    return result;
  }

  onReorder(reorderData) {
    console.log("HERE");
    let currentIssues = [...this.issues.value];
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

  onIssueSelected(issue) {
    this.selectIssue.emit(issue);
  }

}
