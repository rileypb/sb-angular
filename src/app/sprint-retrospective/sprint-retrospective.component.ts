import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../project';
import { Base } from '../base';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { SprintsService } from '../sprints.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { callWithSnackBar } from '../util';

@Component({
  selector: 'app-sprint-retrospective',
  templateUrl: './sprint-retrospective.component.html',
  styleUrls: ['./sprint-retrospective.component.css']
})
export class SprintRetrospectiveComponent extends Base implements OnInit {
  @Input() project:Project;
  public Editor = ClassicEditor;

  selectedSprint:any;
  editingRetrospective:boolean = false;

  constructor(private sprintsService:SprintsService, private snackBar:MatSnackBar) {
    super();
  }

  ngOnInit(): void {
  }

  selectSprint(sprint) {
  	console.log("select sprint")
  	this.selectedSprint = sprint;
  }

  saveRetrospective() {
  	callWithSnackBar(this.snackBar, this.sprintsService.save({ id: this.selectedSprint.id, project: this.selectedSprint.project, retrospective: this.selectedSprint.retrospective }),
  		['Saving retrospective...', 'Saved retrospective', 'Error saving retrospective']);
  	this.editingRetrospective = false;
  }
 
}
