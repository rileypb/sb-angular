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


@Component({
  selector: 'app-sprint-card',
  templateUrl: './sprint-card.component.html',
  styleUrls: ['./sprint-card.component.css']
})
export class SprintCardComponent extends Base implements OnInit {
  @Input() sprint: Sprint;
  @Input() project: Project;
  @Input() showStartButton: boolean;
  @Input() editable:boolean;
  @Output() transfer:EventEmitter<any> = new EventEmitter<any>();
  @Output() selected:EventEmitter<Sprint> = new EventEmitter<Sprint>();
  @Output() start:EventEmitter<any> = new EventEmitter<any>();
  expanded: boolean = false;

  constructor(public uiState:UiStateService, public dialog:MatDialog, private snackBar:MatSnackBar, private sprintsService:SprintsService) {
    super();
  }

  ngOnInit(): void {
    this.expanded = this.uiState.isExpanded("sprint/" + this.sprint.id);
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

  showSummary() {
    let data = {
      sprint: this.sprint,
      project: this.project,
    }

    const dialogRef = this.dialog.open(TeamSummaryComponent, {
      width: "90%",
      maxWidth: "800px",
      data: data
    });

    // listen to response
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.start.emit(data);
      }    
    });
  }

}
