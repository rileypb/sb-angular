import { Component, OnInit, Input } from '@angular/core';
import { Sprint } from '../sprint';
import { Issue } from '../issue';
import { Base } from '../base';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { IssuesService } from '../issues.service';
import { SprintsService } from '../sprints.service'; 
import { callWithSnackBar } from '../util';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'sb-sprint-detail',
  templateUrl: './sprint-detail.component.html',
  styleUrls: ['./sprint-detail.component.css']
})
export class SprintDetailComponent extends Base implements OnInit {
  public mode:string = "show";
  sprintIssues:Observable<any>;
  projectIssues:Observable<any>;

  constructor(private dataService:DataService, private router:Router, private issuesService:IssuesService, private snackBar:MatSnackBar, private sprintsService:SprintsService) { 
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
}
