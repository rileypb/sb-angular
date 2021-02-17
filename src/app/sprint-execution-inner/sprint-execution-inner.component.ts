import { Component, OnInit, Input } from '@angular/core';
import { Sprint } from '../sprint';
import { Issue } from '../issue';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { IssuesService } from '../issues.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { callWithSnackBar } from '../util';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EditIssueDialogComponent } from '../edit-issue-dialog/edit-issue-dialog.component';
import { SprintsService } from '../sprints.service';

@Component({
  selector: 'sb-sprint-execution-inner',
  templateUrl: './sprint-execution-inner.component.html',
  styleUrls: ['./sprint-execution-inner.component.css']
})
export class SprintExecutionInnerComponent implements OnInit {
  issues:Observable<any>;

  constructor(private dataService:DataService, private issuesService:IssuesService, private snackBar:MatSnackBar, private dialog: MatDialog,
              private sprintsService:SprintsService) { }

  ngOnInit(): void {
  }

  @Input() set sprint(value:Sprint) {
  	this.unloadOldIssues();
  	this._sprint = value;
  	this.loadNewIssues();
  }
  get sprint():Sprint {
  	return this._sprint;
  }
  private _sprint:Sprint;

  private loadNewIssues() {
  	if (this._sprint) {
	  	this.dataService.load(`sprints/${this._sprint.id}/issues`, [`sprints/${this._sprint.id}/issues`, `sprints/${this._sprint.id}/issues/*`]);
	  	this.issues = this.dataService.values[`sprints/${this._sprint.id}/issues`];
	}
  }

  private unloadOldIssues() {
  	if (this._sprint) {
	  	this.dataService.unload(`sprints/${this._sprint.id}/issues`, [`sprints/${this._sprint.id}/issues`, `sprints/${this._sprint.id}/issues/*`]);
	  	this.issues = null;
	}
  }

  ngOnDestroy() {
  	this.unloadOldIssues();
  }

  setState(issue, state) {
  	console.log("setState");
    issue.state = state;
  	callWithSnackBar(this.snackBar, this.issuesService.updateState(issue, state),
  					 ['Updating state...', 'State updated', 'Error updating state']);
  }

  onViewIssue(issue) {
    console.log(`view issue ${issue.id}`);
    let selectedIssue = JSON.parse(JSON.stringify(issue));

    const dialogRef = this.dialog.open(EditIssueDialogComponent, {
      width: '90%',
      data: { issue: selectedIssue, allowDelete: false }
    });

    dialogRef.afterClosed().subscribe(result => {
     if (result) {
       this.saveIssue(selectedIssue);
     }
    });
  }

  saveIssue(issue:Issue) {
    callWithSnackBar(this.snackBar, this.issuesService.save(issue), ['Saving issue...', 'Issue saved', 'Error saving issue']);
  }

  onSuspendSprint(sprint:Sprint) {
    callWithSnackBar(this.snackBar, this.sprintsService.suspendSprint(sprint), ['Suspending sprint...', 'Sprint suspended', 'Error suspending sprint']);
  }

  onFinishSprint(sprint:Sprint) {
    callWithSnackBar(this.snackBar, this.sprintsService.finishSprint(sprint), ['Finishing sprint...', 'Sprint finished', 'Error finishing sprint']);
  }
}
