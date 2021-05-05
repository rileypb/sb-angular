import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../project';
import { Sprint } from '../sprint';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { callWithSnackBar } from '../util';
import { TasksService } from '../tasks.service';
import { User } from '../user';
import { Base } from '../base';

@Component({
  selector: 'sb-team-summary',
  templateUrl: './team-summary.component.html',
  styleUrls: ['./team-summary.component.css']
})
export class TeamSummaryComponent extends Base implements OnInit {
  @Input() project:Project;
  @Input() editable:boolean;  

  @Output() close:EventEmitter<any> = new EventEmitter<any>();

  teamSummary:Observable<any>;

  constructor(private dataService:DataService, private snackBar:MatSnackBar, private tasksService:TasksService) {
  	super();
  }

  ngOnInit(): void {
  }

  private loadSummary():void {
    this.dataService.load(`sprints/${this.sprint.id}/team_summary`, [`sprints/${this.sprint.id}/team_summary`]);
    this.teamSummary = this.dataService.values[`sprints/${this.sprint.id}/team_summary`];
  }

  private unloadSummary():void {
    this.dataService.unload(`sprints/${this.sprint.id}/team_summary`, [`sprints/${this.sprint.id}/team_summary`]);
  }

  @Input() set sprint(value:Sprint) {
    if (this._sprint) {
      this.unloadSummary();
    }
    this._sprint = value;
    this.loadSummary();
  }
  get sprint():Sprint {
    return this._sprint;
  }
  private _sprint:Sprint;

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

  okay() {
    this.close.emit();
  }

}
