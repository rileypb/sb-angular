import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { UiStateService } from '../ui-state.service';
import { Base } from '../base';
import { Sprint } from '../sprint';
import { Project } from '../project';
import { StartSprintComponent } from '../start-sprint/start-sprint.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { callWithSnackBar } from '../util';
import { SprintsService } from '../sprints.service';
import { TeamSummaryComponent } from '../team-summary/team-summary.component';
import { Issue } from '../issue';
import { Observable, never } from 'rxjs';
import { DataService } from '../data.service';


@Component({
  selector: 'app-sprint-card',
  templateUrl: './sprint-card.component.html',
  styleUrls: ['./sprint-card.component.css']
})
export class SprintCardComponent extends Base implements OnInit {
  @Input() project: Project;
  @Input() showStartButton: boolean;
  @Input() editable:boolean;
  @Output() transfer:EventEmitter<any> = new EventEmitter<any>();
  @Output() selected:EventEmitter<Sprint> = new EventEmitter<Sprint>();
  @Output() start:EventEmitter<any> = new EventEmitter<any>();
  @Output() issueSelected:EventEmitter<Issue> = new EventEmitter<Issue>();
  expanded: boolean = false;

  private unloader:()=>void;

  public sprint$:Observable<Sprint>;

  constructor(public uiState:UiStateService, public dialog:MatDialog, private snackBar:MatSnackBar, private sprintsService:SprintsService, private dataService:DataService) {
    super();
  }

  ngOnInit(): void {
    this.expanded = this.uiState.isExpanded("sprint/" + this.sprint.id);
  }

  @Input() set sprint(value:Sprint) {
    this._sprint = value;
    if (value) {
      this.updateSprintAsync();
    } else {
      this.clearSprintAsync();
    }
  }
  get sprint():Sprint {
    return this._sprint;
  }
  private _sprint:Sprint

  private updateSprintAsync() {
    if (this.unloader) {
      this.unloader();
    }
    this.dataService.load(`sprints/${this.sprint.id}`, [`sprints/${this.sprint.id}`, `sprints/${this.sprint.id}/issues`]);
    this.sprint$ = this.dataService.values[`sprints/${this.sprint.id}`];
    this.unloader = () => {
      this.dataService.unload(`sprints/${this.sprint.id}`, [`sprints/${this.sprint.id}`, `sprints/${this.sprint.id}/issues`]);
    }
  }

  private clearSprintAsync() {
    if (this.unloader) {
      this.unloader();
    }
    this.sprint$ = never(); // if no sprint set, the Observable should never complete.
  }

  ngOnDestroy() {
    if (this.unloader) {
      this.unloader();
    }
  }

  toggleExpanded(): void {
  	this.expanded = !this.expanded;
    this.uiState.setExpanded("sprint/" + this.sprint.id, this.expanded);
  }

  onTransfer(transferData) {
    this.transfer.emit(transferData);
  }

  onViewSprint(event) {
    event.stopPropagation();
    this.selected.emit(this.sprint);
  }

  onStartSprint(event) {
    let data = {
      sprint: this.sprint,
      reset: false
    }

    const dialogRef = this.dialog.open(StartSprintComponent, {
      maxWidth: "600px",
      data: data
    });

    // listen to response
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.start.emit(data);
      }    
    });

    // this.start.emit(this.sprint);
  }

  suspendSprint() {
    callWithSnackBar(this.snackBar, this.sprintsService.suspendSprint(this.sprint), ['Suspending sprint...', 'Sprint suspended', 'Error suspending sprint']);
  }

  onIssueSelected(issue:Issue) {
    console.log("FOOOOO");
    this.issueSelected.emit(issue);
  }

  showSummary() {
    let data = {
      sprint: this.sprint,
      project: this.project,
      editable: this.editable
    }

    const dialogRef = this.dialog.open(TeamSummaryComponent, {
      width: "90%",
      maxWidth: "800px",
      data: data
    });

    // listen to response
    dialogRef.afterClosed().subscribe(dialogResult => {
    });
  }

}
