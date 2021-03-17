import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../project';
import { Sprint } from '../sprint';
import { DataService } from '../data.service';

@Component({
  selector: 'sb-sprint-execution',
  templateUrl: './sprint-execution.component.html',
  styleUrls: ['./sprint-execution.component.css']
})
export class SprintExecutionComponent implements OnInit {

  currentSprint:Sprint;

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
  }

  @Input() set project(value:Project) {
  	this._project = value;
  	this.loadCurrentSprint();
  }
  get project():Project {
  	return this._project;
  }
  private _project:Project;

  private loadCurrentSprint() {
  	if (this.project) {
	  	let currentSprintId = this.project.current_sprint_id;
	  	if (currentSprintId) {
	  		//this.dataService.load()
	  	} else {
	  		this.currentSprint = null;
	  	}
	  }
  }
}
