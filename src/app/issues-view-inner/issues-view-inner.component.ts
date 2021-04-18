import { Component, OnInit, Input, ViewChildren, QueryList } from '@angular/core';
import { Project } from '../project';
import { Base } from '../base';
import { Issue } from '../issue';
import { Router } from '@angular/router';
import { IssuesService } from '../issues.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { callWithSnackBar } from '../util';
import { IssueFormComponent } from '../issue-form/issue-form.component';
import { first } from 'rxjs/operators';
import { ProjectService } from '../project.service';

@Component({
  selector: 'sb-issues-view-inner',
  templateUrl: './issues-view-inner.component.html',
  styleUrls: ['./issues-view-inner.component.css']
})
export class IssuesViewInnerComponent extends Base implements OnInit {
  @ViewChildren("createIssue") createIssueComponent:QueryList<IssueFormComponent>;

  @Input() project:Project;
  @Input() issues:any;

  public mode:String = "show";
  
  constructor(private router:Router, private issuesService:IssuesService, 
  	          private snackBar:MatSnackBar, private projectService:ProjectService) { 
  	super();
  }

  ngOnInit(): void {
  }

  @Input() set issue(value:Issue) {
  	this._issue = value;
  	this.mode = 'show';
  }
  get issue():Issue {
  	return this._issue;
  }
  private _issue:Issue;


  editIssue():void {
  	this.mode = 'edit';
  }

  showDetail(issue:Issue):void {
  	if (this.mode == 'show') {
  	  this.router.navigate(['projects',this.project.id,'backlog',issue.id]);
  	}
  }

  cancelEdit():void {
  	this.mode = 'show';
  }

  confirmEdit(issue:Issue):void {
  	this.mode = 'show';
  	callWithSnackBar(this.snackBar,
  					 this.issuesService.save(issue),
  					 ['Saving issue...', 'Issue saved', 'Error saving issue']);
  }

  createIssue():void {
  	this.mode = "create";
  	// need to wait for the issue form to be added to the view.
  	this.createIssueComponent.changes.pipe(first()).subscribe(x => {
  	  this.createIssueComponent.first.issue = { id: -1, title: '', description: '', estimate: 0, project: this.project };
  	});
  }

  saveNewIssue(issue:Issue):void {
	callWithSnackBar(this.snackBar,
					 this.issuesService.createIssue(issue),
					 ['Creating issue...', 'Issue created', 'Error creating issue'])
					 .subscribe(success => {
					 	this.mode = "show";
					    this.router.navigate(['projects', this.project.id, 'backlog', success.id]);
					 });  	
  }

  onReorderIssues(reorderData:any) {
    callWithSnackBar(this.snackBar, this.projectService.reorderIssues(this.project, reorderData.fromIndex, reorderData.toIndex),
      ["Reordering Issues...", "Issues Reordered", "Error Reordering Issues"]);
  }

  delete(issue:Issue):void {
    callWithSnackBar(this.snackBar, this.issuesService.deleteIssue(issue.id),
      ["Deleting issue...", "Issue deleted", "Error deleting issue"])
					 .subscribe(success => {
					 	this.mode = "show";
					    this.router.navigate(['projects', this.project.id, 'backlog']);
					 });  
  }
}
