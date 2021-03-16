import { Component, OnInit, Input } from '@angular/core';
import { Epic } from '../epic';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EpicsService } from '../epics.service';
import { callWithSnackBar } from '../util';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IssuesService } from '../issues.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import { moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";

@Component({
  selector: 'sb-epic-issue-list',
  templateUrl: './epic-issue-list.component.html',
  styleUrls: ['./epic-issue-list.component.css']
})
export class EpicIssueListComponent implements OnInit {

  @Input() epic:Epic;
  @Input() fixed:boolean;
  @Input() allowRemove:boolean;

  issues:BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private dataSubscription:Subscription;

  constructor(public dataService:DataService, private epicsService:EpicsService, private snackBar:MatSnackBar, private issuesService:IssuesService) { }

  ngOnInit(): void {
  	this.dataService.load(`epics/${this.epic.id}/issues`, [`epics/${this.epic.id}`, `epics/${this.epic.id}/issues`, `epics/${this.epic.id}/issues/*`]);
    this.dataSubscription = this.dataService.values[`epics/${this.epic.id}/issues`].pipe(
      map((value, index) => {
        return value ? value.issues.list : null;
      })
    ).subscribe(
      x => {
        this.issues.next(x);
      }
    );
  }

  ngOnDestroy() {
    this.dataService.unload(`epics/${this.epic.id}/issues`, [`epics/${this.epic.id}`, `epics/${this.epic.id}/issues`, `epics/${this.epic.id}/issues/*`]);
    this.dataSubscription.unsubscribe();
  }

  onReorder(reorderData) {
  	console.log("onReorder");
    let currentIssues = [...this.issues.value];
    moveItemInArray(currentIssues, reorderData.fromIndex, reorderData.toIndex);
    this.dataService.update(`epics/${this.epic.id}/issues`, { issues: { list: currentIssues }});
	  callWithSnackBar(this.snackBar, this.epicsService.reorderIssues(reorderData.container, reorderData.fromIndex, reorderData.toIndex), 
                     ['Updating Order...', 'Updated Order', 'Error Updating order']);
  }

  onTransfer(transferData) {
    let epic1 = transferData.from.data.container;
    let epic2 = transferData.to.data.container;

    if (epic1) {
      transferData.issue.epic = epic2;
     
      callWithSnackBar(this.snackBar, this.issuesService.transfer({epicId1: epic1.id, epicId2: epic2.id, fromIndex: transferData.fromIndex, toIndex: transferData.toIndex}), 
        ["Reordering...", "Reordering Complete", "Error While Reordering"]);
    } 
  
  }

  removeIssue(issue) {
    callWithSnackBar(this.snackBar, this.epicsService.removeIssue(this.epic, issue), ["Removing From Epic", "Removed", "Error While Removing"]);
  }

}
