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
  selector: 'sb-sprint-snapshot',
  templateUrl: './sprint-snapshot.component.html',
  styleUrls: ['./sprint-snapshot.component.css']
})
export class SprintSnapshotComponent extends Base implements OnInit {
  @Input() project:Project;

  @Output() close:EventEmitter<any> = new EventEmitter<any>();

  snapshot:Observable<any>;

  done:boolean = false
  public snapshotText(ss) {
    if (!this.done && ss) {
      console.log(ss);
      this.done = true;
    }
    return JSON.stringify(ss);
  }

  constructor(private dataService:DataService, private snackBar:MatSnackBar, private tasksService:TasksService) {
    super();
  }

  ngOnInit(): void {
  }

  private loadSnapshot():void {
    this.dataService.load(`sprints/${this.sprint.id}/snapshot`, [`sprints/${this.sprint.id}/snapshot`]);
    this.snapshot = this.dataService.values[`sprints/${this.sprint.id}/snapshot`];
  }

  private unloadSnapshot():void {
    this.dataService.unload(`sprints/${this.sprint.id}/snapshot`, [`sprints/${this.sprint.id}/snapshot`]);
  }

  @Input() set sprint(value:Sprint) {
    if (this._sprint) {
      this.unloadSnapshot();
    }
    this._sprint = value;
    this.loadSnapshot();
  }
  get sprint():Sprint {
    return this._sprint;
  }
  private _sprint:Sprint;

  ngOnDestroy() {
    // we do a fast unload because we want fresh data every time we load the dialog.
    this.dataService.fastUnload(`sprints/${this.sprint.id}/snapshot`);
  }



  okay() {
    this.close.emit();
  }

}
