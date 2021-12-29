import { Component, OnInit, Input, ViewChildren, QueryList } from '@angular/core';
import { Project } from '../project';
import { Base } from '../base';
import { Issue } from '../issue';
import { Epic } from '../epic';
import { Sprint } from '../sprint';
import { Router } from '@angular/router';
import { IssuesService } from '../issues.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { callWithSnackBar } from '../util';
import { IssueFormComponent } from '../issue-form/issue-form.component';
import { first } from 'rxjs/operators';
import { ProjectService } from '../project.service';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'sb-issues-view-inner',
  templateUrl: './issues-view-inner.component.html',
  styleUrls: ['./issues-view-inner.component.css']
})
export class IssuesViewInnerComponent extends Base implements OnInit {
  @ViewChildren("createIssue") createIssueComponent:QueryList<IssueFormComponent>;

  @Input() issues:any;

  epics$:Observable<Epic>;
  sprints$:Observable<Sprint>;

  public mode:String = "show";
  
  constructor(private router:Router, private issuesService:IssuesService, 
  	          private snackBar:MatSnackBar, private projectService:ProjectService, private dataService:DataService) { 
  	super();
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.unloadEpics(this.project);
  }

  loadEpics() {
    if (!this.project) {
      return;
    }
    this.dataService.load(`projects/${this.project.id}/epics`,[`projects/${this.project.id}/epics`, `projects/${this.project.id}/epics/*`]);
    this.epics$ = this.dataService.values[`projects/${this.project.id}/epics`];
    this.dataService.load(`projects/${this.project.id}/sprints?current=true`,[`projects/${this.project.id}/sprints`, `projects/${this.project.id}/sprints/*`]);
    this.sprints$ = this.dataService.values[`projects/${this.project.id}/sprints?current=true`];
  }

  unloadEpics(p:Project) {
    if (!p) {
      return;
    }
    this.dataService.unload(`projects/${p.id}/epics`,[`projects/${p.id}/epics`, `projects/${p.id}/epics/*`]);
  }

  @Input() set project(value:Project) {
    console.log("stop here");
    if (this._project) {
      this.unloadEpics(this._project);
    }
    this._project = value;
    if (this._project) {
      this.loadEpics()
    }
  }
  get project():Project {
    return this._project;
  }
  private _project:Project;

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

  clearDetail() {
    this.router.navigate(['projects',this.project.id,'backlog']);
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

  onCompleteIssue(issue:Issue):void {
    callWithSnackBar(this.snackBar, this.issuesService.markCompleted(issue.id),
      ["Completing issue...", "Issue completed", "Error completing issue"]); 
  }
}
