import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../project';
import { Issue } from '../issue';
import { Base } from '../base';
import { IssuesService } from '../issues.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { callWithSnackBar } from '../util';

@Component({
  selector: 'app-sprint-retrospective',
  templateUrl: './sprint-retrospective.component.html',
  styleUrls: ['./sprint-retrospective.component.css']
})
export class SprintRetrospectiveComponent extends Base implements OnInit {
  @Input() project:Project;

  selectedSprint:any;
  editingRetrospective:boolean = false;
  selectedIssueId:number = null;

  constructor(private issuesService:IssuesService, private snackBar:MatSnackBar) {
    super();
  }

  ngOnInit(): void {
  }

  selectSprint(sprint) {
  	console.log("select sprint")
    this.selectedIssueId = null;
  	this.selectedSprint = sprint;
  }
 
  printSprintReport(sprint) {
  	
  }

  onIssueSelected(issue) {
    this.selectedIssueId = issue.id;
  }

  onCompleteIssue(issue:Issue) {
    callWithSnackBar(this.snackBar, this.issuesService.markCompleted(issue.id),
      ["Completing issue...", "Issue completed", "Error completing issue"]); 
  }
}
