import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../project';
import { Sprint } from '../sprint';
import { DataService } from '../data.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Issue } from '../issue';
import { Base } from '../base';

@Component({
  selector: 'sb-sprint-list',
  templateUrl: './sprint-list.component.html',
  styleUrls: ['./sprint-list.component.css']
})
export class SprintListComponent extends Base implements OnInit {
  @Input() project:Project;
  @Input() showStartButton:boolean;
  @Input() editable:boolean;
  @Output() transfer:EventEmitter<any> = new EventEmitter<any>();
  @Output() selected:EventEmitter<Sprint> = new EventEmitter<Sprint>();
  @Output() start:EventEmitter<Sprint> = new EventEmitter<Sprint>();
  @Output() loaded:EventEmitter<Sprint> = new EventEmitter<Sprint>();
  @Output() issueSelected:EventEmitter<Issue> = new EventEmitter<Issue>();

  sprints:Observable<any>;

  private lastDataPath:string;
  private isLoaded:boolean = false;

  constructor(private dataService:DataService) { super(); }

  ngOnInit(): void {
    this.updateData();
  }

  ngOnDestroy():void {
  	this.dataService.unload(this.lastDataPath, [`projects/${this.project.id}/sprints`, `projects/${this.project.id}/sprints/*`]);
  }

  @Input() set currentOnly(value:boolean) {
    this._currentOnly = value;
    this.updateData();
  }
  get currentOnly():boolean {
    return this._currentOnly;
  }
  private _currentOnly:boolean;

  @Input() set completedOnly(value:boolean) {
    this._completedOnly = value;
    this.updateData();
  }
  get completedOnly():boolean {
    return this._completedOnly;
  }
  private _completedOnly:boolean;

  updateData():void {
    if (this.lastDataPath) {
      this.dataService.unload(this.lastDataPath, [`projects/${this.project.id}/sprints`, `projects/${this.project.id}/sprints/*`]);
    }
    var newDataPath:string = `projects/${this.project.id}/sprints`;
    if (this.currentOnly) {
      newDataPath += '?current=true';
    } else {
      newDataPath += '?completed=true';
    }
    this.dataService.load(newDataPath, [`projects/${this.project.id}/sprints`, `projects/${this.project.id}/sprints/*`]);
    this.sprints = this.dataService.values[newDataPath];
    this.sprints.subscribe((x) => {
      if (!this.isLoaded && x != null) {
        console.log(x);
        let lastSprint = x.sprints.list[0];
        this.isLoaded = true;
        this.loaded.emit(lastSprint);
      }
    });
    this.lastDataPath = newDataPath;
  }

  onTransfer(transferData) {
  	this.transfer.emit(transferData);
  }

  onSprintSelected(sprint) {
    console.log(`sprintSelected: ${sprint.id}`);
    this.selected.emit(sprint);
  }

  onStart(sprint) {
    this.start.emit(sprint);
  }

  onIssueSelected(issue:Issue) {
    this.issueSelected.emit(issue);
  }
}
