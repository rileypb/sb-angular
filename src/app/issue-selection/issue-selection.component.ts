import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Color } from '../color';
import { Sprint } from '../sprint';
import { Issue } from '../issue';
import { IssuesService } from '../issues.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { callWithSnackBar } from '../util';

@Component({
  selector: 'sb-issue-selection',
  templateUrl: './issue-selection.component.html',
  styleUrls: ['./issue-selection.component.css']
})
export class IssueSelectionComponent implements OnInit {
  @Input() sprint:Sprint;
  @Output() close:EventEmitter<any> = new EventEmitter<any>();

  private inSprint:any = {};

  constructor(private issuesService:IssuesService, private snackBar:MatSnackBar) { }

  ngOnInit(): void {
  }

  @Input() set issues(value:Issue[]) {
  	console.log(`issue-selection issues updated`);
  	let orderedIssues:Issue[] = [];
  	let sprintIssues:Issue[] = [];
  	for (let issue of value) {
  		if (issue.sprint?.id == this.sprint.id) {
  			sprintIssues.push(issue);
  			this.inSprint[issue.id] = true;
  		} else {
  			orderedIssues.push(issue);
  			this.inSprint[issue.id] = false;
  		}
  	}
  	this._issues = sprintIssues.concat(orderedIssues);	
  }
  get issues():Issue[] {
  	return this._issues;
  }
  private _issues:Issue[];

  okay() {
  	// for (let issue of this.issues) {
  	// 	if (issue.sprint?.id == this.sprint.id && !this.inSprint[issue.id]) {
  	// 		// {sprintId1: fromSprint.id, projectId1: fromProject.id, 
   //   // 				 sprintId2: toSprint.id, projectId2: toProject.id, fromIndex: transferData.fromIndex, toIndex: transferData.toIndex}
  	// 		// this.issuesService.transfer({sprintId1: this.sprint.id, projectId1: this.sprint.project.id, 
  	// 		// 							 sprintId2: null, projectId2: this.sprint.project.id, })


  	// 		this.issuesService.moveToBacklog(issue.id);

  	// 	} else if (issue.sprint?.id != this.sprint.id && this.inSprint[issue.id]) {
  	// 		this.issuesService.moveToSprint(issue.id, this.sprint.id);
  	// 	}
  	// }
  	this.close.emit();
  }

  cancel() {
  	this.close.emit();
  }

  fontColor(bgColor:string):string {
  	return Color.fontColor(bgColor);
  }

  toggleInSprint(issue:Issue) {
  	this.inSprint[issue.id] = !this.inSprint[issue.id];
  	if (this.inSprint[issue.id]) {
  		callWithSnackBar(this.snackBar, this.issuesService.moveToSprint(issue.id, this.sprint.id), 
  			["Adding to sprint...", "Added to sprint", "Error adding to sprint"]);
  	} else {
  		callWithSnackBar(this.snackBar, this.issuesService.moveToBacklog(issue.id), 
  			["Removing from sprint...", "Removed from sprint", "Error removing from sprint"]);
  	}
  }
}
