import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../project';
import { DataService } from '../data.service';

@Component({
  selector: 'sb-project-activity-list',
  templateUrl: './project-activity-list.component.html',
  styleUrls: ['./project-activity-list.component.css']
})
export class ProjectActivityListComponent implements OnInit {
  @Input() project:Project;
  activities:any = null;

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
  	this.dataService.load(`projects/${this.project.id}/activity`, [`projects/${this.project.id}/activity`]);
  	this.activities = this.dataService.values[`projects/${this.project.id}/activity`];
  }

  ngOnDestroy():void {
  	this.dataService.unload(`projects/${this.project.id}/activity`, [`projects/${this.project.id}/activity`]);
  }

}
