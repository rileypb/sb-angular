import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../project';
import { Sprint } from '../sprint';
import { DataService } from '../data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'sb-sprint-list',
  templateUrl: './sprint-list.component.html',
  styleUrls: ['./sprint-list.component.css']
})
export class SprintListComponent implements OnInit {
  @Input() project:Project;
  @Input() showStartButton:boolean;
  @Input() currentOnly:boolean;
  @Output() transfer:EventEmitter<any> = new EventEmitter<any>();
  @Output() selected:EventEmitter<Sprint> = new EventEmitter<Sprint>();
  @Output() start:EventEmitter<Sprint> = new EventEmitter<Sprint>();

  sprints:any;

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
  	this.dataService.load(`projects/${this.project.id}/sprints?current=true`, [`projects/${this.project.id}/sprints`, `projects/${this.project.id}/sprints/*`]);
    this.sprints = this.dataService.values[`projects/${this.project.id}/sprints?current=true`];
  	// this.sprints = this.dataService.values[`projects/${this.project.id}/sprints`].asObservable().pipe(map((val, index) =>  {
   //    return val && val.filter((x) => { return !x.completed; });
   //  }));
  }

  ngOnDestroy():void {
  	this.dataService.unload(`projects/${this.project.id}/sprints?current=true`, [`projects/${this.project.id}/sprints`, `projects/${this.project.id}/sprints/*`]);
  }

  onTransfer(transferData) {
  	this.transfer.emit(transferData);
  }

  onSprintSelected(sprint) {
    this.selected.emit(sprint);
  }

  onStart(sprint) {
    this.start.emit(sprint);
  }
}
