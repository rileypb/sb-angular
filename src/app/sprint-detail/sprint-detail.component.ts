import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Sprint } from '../sprint';
import { Issue } from '../issue';
import { Project } from '../project';
import { Base } from '../base';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { IssuesService } from '../issues.service';
import { SprintsService } from '../sprints.service'; 
import { callWithSnackBar } from '../util';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { StartSprintComponent } from '../start-sprint/start-sprint.component';

@Component({
  selector: 'sb-sprint-detail',
  templateUrl: './sprint-detail.component.html',
  styleUrls: ['./sprint-detail.component.css']
})
export class SprintDetailComponent extends Base implements OnInit {
  @Output() editSprint:EventEmitter<Sprint> = new EventEmitter<Sprint>();
  @Output() start:EventEmitter<any> = new EventEmitter<any>();
  @Input() project:Project;
  @Input() editable:boolean;

  public mode:string = "show";
  sprintIssues:Observable<any>;
  projectIssues:Observable<any>;

  constructor(private dataService:DataService, public dialog:MatDialog, private router:Router, private issuesService:IssuesService, private snackBar:MatSnackBar, private sprintsService:SprintsService) { 
  	super();
  }

  ngOnInit(): void {
  }

  @Input() set sprint(value:Sprint) {
    if (this._sprint) {
      this.dataService.unload(`sprints/${this._sprint.id}/issues`, [`sprints/${this._sprint.id}/issues`, `sprints/${this._sprint.id}/issues/*`]);
      this.dataService.unload(`projects/${this._sprint.project.id}/issues`, [`projects/${this._sprint.project.id}/issues`, `projects/${this._sprint.project.id}/issues/*`]);
    }
    this._sprint = value;
    this.dataService.load(`sprints/${this._sprint.id}/issues`, [`sprints/${this._sprint.id}/issues`, `sprints/${this._sprint.id}/issues/*`]);
    this.sprintIssues = this.dataService.values[`sprints/${this._sprint.id}/issues`];

    this.dataService.load(`projects/${this._sprint.project.id}/issues`, [`projects/${this._sprint.project.id}/issues`, `projects/${this._sprint.project.id}/issues/*`]);
    this.projectIssues = this.dataService.values[`projects/${this._sprint.project.id}/issues`];
  }
  get sprint():Sprint {
    return this._sprint;
  }
  private _sprint:Sprint;

  addIssue(sprint:Sprint) {
  	this.mode = "select";
  }

  removeIssue(issue:Issue) {
  	console.log(`removeIssue ${JSON.stringify(issue)}`);

  	callWithSnackBar(this.snackBar, this.issuesService.moveToBacklog(issue.id),
  		["Removing from sprint...", "Removed from sprint", "Error removing from sprint"]);
  }

  onReorder(value) {
  	callWithSnackBar(this.snackBar, this.sprintsService.reorderIssues(this.sprint, value.fromIndex, value.toIndex),
  		["Reordering issues...", "Reordered issues", "Error reordering issues"]);
  }

  onIssueSelected(issue:Issue) { 
  	this.router.navigate(['projects', issue.project.id, 'backlog', issue.id]);
  }

  onEditSprint() {
    this.editSprint.emit(this.sprint);
  }

  showSummary() {
    // let data = {
    //   sprint: this.sprint,
    //   project: this.project,
    //   editable: this.editable
    // }

    // const dialogRef = this.dialog.open(TeamSummaryComponent, {
    //   width: "90%",
    //   maxWidth: "800px",
    //   data: data
    // });

    // // listen to response
    // dialogRef.afterClosed().subscribe(dialogResult => {
    // });

    this.mode = "summary";
  }

  showSnapshot() {
    this.mode = "snapshot";
  }

  onStartSprint(event) {
    let data = {
      sprint: this.sprint,
      reset: false
    }

    const dialogRef = this.dialog.open(StartSprintComponent, {
      maxWidth: "600px",
      width: '90%',
      data: data
    });

    // listen to response
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.start.emit(data);
        this.dataService.forceRefresh(`projects/${this.sprint.project.id}`);
      }    
    });

    // this.start.emit(this.sprint);
  }

  suspendSprint() {
    callWithSnackBar(this.snackBar, this.sprintsService.suspendSprint(this.sprint), ['Suspending sprint...', 'Sprint suspended', 'Error suspending sprint']);
  }
}
