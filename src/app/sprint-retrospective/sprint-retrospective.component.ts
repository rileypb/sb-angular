import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../project';
import { Issue } from '../issue';
import { Base } from '../base';
import { IssuesService } from '../issues.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { callWithSnackBar } from '../util';
import { Observable } from 'rxjs';
import { Epic } from '../epic';
import { DataService } from '../data.service';
import { Sprint } from '../sprint';

@Component({
  selector: 'app-sprint-retrospective',
  templateUrl: './sprint-retrospective.component.html',
  styleUrls: ['./sprint-retrospective.component.css']
})
export class SprintRetrospectiveComponent extends Base implements OnInit {
  epics$:Observable<Epic>;
  sprints$:Observable<Sprint>;
  oldSprints$:Observable<Sprint>;

  selectedSprint:any;
  editingRetrospective:boolean = false;
  selectedIssueId:number = null;

  constructor(private issuesService:IssuesService, private snackBar:MatSnackBar, private dataService:DataService) {
    super();
  }

  ngOnInit(): void {
  }

  loadEpics() {
    if (!this.project) {
      return;
    }
    this.dataService.load(`projects/${this.project.id}/epics`,[`projects/${this.project.id}/epics`, `projects/${this.project.id}/epics/*`]);
    this.epics$ = this.dataService.values[`projects/${this.project.id}/epics`];
    this.dataService.load(`projects/${this.project.id}/sprints?current=true`,[`projects/${this.project.id}/sprints`, `projects/${this.project.id}/sprints/*`]);
    this.sprints$ = this.dataService.values[`projects/${this.project.id}/sprints?current=true`];
    this.dataService.load(`projects/${this.project.id}/sprints?current=false`,[`projects/${this.project.id}/sprints`, `projects/${this.project.id}/sprints/*`]);
    this.oldSprints$ = this.dataService.values[`projects/${this.project.id}/sprints?current=false`];
  }

  unloadEpics(p:Project) {
    if (!p) {
      return;
    }
    this.dataService.unload(`projects/${p.id}/epics`,[`projects/${p.id}/epics`, `projects/${p.id}/epics/*`]);
  }


  @Input() set project(value:Project) {
    console.log("stop here 2");
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
