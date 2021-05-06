import { Component, OnInit, Input } from '@angular/core';
import { Issue } from '../issue';
import { Color } from '../color';
import { IssuesService } from '../issues.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { callWithSnackBar } from '../util';

@Component({
  selector: 'sb-expandable-issue',
  templateUrl: './expandable-issue.component.html',
  styleUrls: ['./expandable-issue.component.css']
})
export class ExpandableIssueComponent implements OnInit {
  @Input() issue:Issue;

  constructor(private issuesService:IssuesService, private snackBar:MatSnackBar) { }

  ngOnInit(): void {
  }

  clickIssue(issue:Issue) {

  }

  fontColor(bgColor:string):string {
  	return Color.fontColor(bgColor);
  }

  onViewIssue(event, issue) {

  }

  setState(issue:Issue, state: string) {
  	if (issue.state != state) {
	    issue.state = state;
	  	callWithSnackBar(this.snackBar, this.issuesService.updateState(issue, state),
	  					 ['Updating state...', 'State updated', 'Error updating state']);
	}
  }
}
