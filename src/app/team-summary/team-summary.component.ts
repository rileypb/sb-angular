import { Component, OnInit, Input, Inject } from '@angular/core';
import { Project } from '../project';
import { Sprint } from '../sprint';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { callWithSnackBar } from '../util';
import { TasksService } from '../tasks.service';
import { User } from '../user';

export interface DialogData {
	sprint:Sprint;
	project:Project;
  editable:boolean;
}

@Component({
  selector: 'sb-team-summary',
  templateUrl: './team-summary.component.html',
  styleUrls: ['./team-summary.component.css']
})
export class TeamSummaryComponent implements OnInit {
  sprint:Sprint;
  project:Project;
  editable:boolean;  

  teamSummary:Observable<any>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private dataService:DataService, public dialog:MatDialog, private snackBar:MatSnackBar, private tasksService:TasksService) {
  	this.project = data.project;
  	this.sprint = data.sprint;
    this.editable = data.editable;
  }

  ngOnInit(): void {
  	this.dataService.load(`sprints/${this.sprint.id}/team_summary`, [`sprints/${this.sprint.id}/team_summary`]);
  	this.teamSummary = this.dataService.values[`sprints/${this.sprint.id}/team_summary`];
  }

  ngOnDestroy() {
  	// we do a fast unload because we want fresh data every time we load the dialog.
  	this.dataService.fastUnload(`sprints/${this.sprint.id}/team_summary`);
  }

  unassignTask(task) {
  	callWithSnackBar(this.snackBar, this.tasksService.assignTask(task.id, -1),
  		["Unassigning task...", "Unassigned task", "Error unassigning task"]);
  }

  assignTask(task, user) {
		callWithSnackBar(this.snackBar, this.tasksService.assignTask(task.id, user.id),
			["Assigning task...", "Assigned task", "Error assigning task"]);
  }

}
