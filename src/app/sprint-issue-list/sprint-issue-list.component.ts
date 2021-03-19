import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Sprint } from '../sprint';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SprintsService} from '../sprints.service';
import { callWithSnackBar } from '../util';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Subscription, BehaviorSubject } from 'rxjs';
import { moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { Issue } from '../issue';
import { Base } from '../base';

@Component({
  selector: 'sb-sprint-issue-list',
  templateUrl: './sprint-issue-list.component.html',
  styleUrls: ['./sprint-issue-list.component.css']
})
export class SprintIssueListComponent extends Base implements OnInit {

  @Input() sprint:Sprint;
  @Input() editable:boolean;
  @Output() transfer:EventEmitter<any> = new EventEmitter<any>();
  @Output() issueSelected:EventEmitter<Issue> = new EventEmitter<Issue>();

  issues:BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private lastValue:any = null;
  private dataSubscription:Subscription;

  constructor(private dataService:DataService, private snackBar:MatSnackBar, private sprintsService:SprintsService) { super(); }

  ngOnInit(): void {
  	this.dataService.load(`sprints/${this.sprint.id}/issues`, [`sprints/${this.sprint.id}`, `sprints/${this.sprint.id}/issues`, `sprints/${this.sprint.id}/issues/*`]);
    this.dataSubscription = this.dataService.values[`sprints/${this.sprint.id}/issues`].pipe(
      map((value, index) => {
        return value ? value.issues.list : null;
      })
    ).subscribe(
      x => {
        this.lastValue = x;
        this.issues.next(x);
      }
    );
  }
  
  ngOnDestroy() {
  	this.dataService.unload(`sprints/${this.sprint.id}/issues`, [`sprints/${this.sprint.id}`, `sprints/${this.sprint.id}/issues`, `sprints/${this.sprint.id}/issues/*`]);
  	this.dataSubscription.unsubscribe();
  }

  onReorder(reorderData) {
  	console.log("onReorder Sprint Issues");
    let currentIssues = [...this.issues.value];
    moveItemInArray(currentIssues, reorderData.fromIndex, reorderData.toIndex);
    this.dataService.update(`sprints/${this.sprint.id}/issues`, { issues: { list: currentIssues }});
	  callWithSnackBar(this.snackBar, this.sprintsService.reorderIssues(reorderData.container, reorderData.fromIndex, reorderData.toIndex), 
                     ['Updating Order...', 'Updated Order', 'Error Updating order']);
  }

  removeIssue(issue) {
    let newValue = this.lastValue.filter(x => x.id != issue.id);
    this.dataService.update(`sprints/${this.sprint.id}/issues`, { issues: { list: newValue }});
    callWithSnackBar(this.snackBar, this.sprintsService.removeIssue(this.sprint, issue), ["Removing From Epic", "Removed", "Error While Removing"]);
  }

  onTransfer(transferData) {
  	this.transfer.emit(transferData);
  }

  onIssueSelected(issue:Issue) {
    this.issueSelected.emit(issue);
  }

}
