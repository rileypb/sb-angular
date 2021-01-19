import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Sprint } from '../sprint';
import { DataService } from '../data.service';

@Component({
  selector: 'sb-current-sprint',
  templateUrl: './current-sprint.component.html',
  styleUrls: ['./current-sprint.component.css']
})
export class CurrentSprintComponent implements OnInit {
  @Input() currentSprintId;

  currentSprint:Observable<Sprint>;

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
  	this.dataService.load(`sprints/${this.currentSprintId}`, [`sprints/${this.currentSprintId}`]);
  	this.currentSprint = this.dataService.values[`sprints/${this.currentSprintId}`];
  }

  ngOnDestroy():void {
  	this.dataService.unload(`sprints/${this.currentSprintId}`, [`sprints/${this.currentSprintId}`]);
  }
}
