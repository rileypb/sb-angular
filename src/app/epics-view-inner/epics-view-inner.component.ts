import { Component, OnInit, Input, ViewChildren, QueryList } from '@angular/core';
import { Project } from '../project';
import { Base } from '../base';
import { Epic } from '../epic';
import { Router } from '@angular/router';
import { EpicsService } from '../epics.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { callWithSnackBar } from '../util';
import { EpicFormComponent } from '../epic-form/epic-form.component';
import { first } from 'rxjs/operators';
import { ProjectService } from '../project.service';

@Component({
  selector: 'sb-epics-view-inner',
  templateUrl: './epics-view-inner.component.html',
  styleUrls: ['./epics-view-inner.component.css']
})
export class EpicsViewInnerComponent extends Base implements OnInit {
  @ViewChildren("createEpic") createEpicComponent:QueryList<EpicFormComponent>;

  @Input() project:Project;
  @Input() epics:any;

  public mode:String = "show";

  constructor(private router:Router, private epicsService:EpicsService, 
  	          private snackBar:MatSnackBar, private projectService:ProjectService) { 
  	super();
  }

  ngOnInit(): void {
  }

  @Input() set epic(value:Epic) {
  	this._epic = value;
  	this.mode = 'show';
  }
  get epic():Epic {
  	return this._epic;
  }
  private _epic:Epic;

  editEpic():void {
  	this.mode = 'edit';
  }

  showDetail(epic:Epic):void {
  	if (this.mode == 'show') {
  	  this.router.navigate(['projects',this.project.id,'epics',epic.id]);
  	}
  }

  cancelEdit():void {
  	this.mode = 'show';
  }

  confirmEdit(epic:Epic):void {
  	this.mode = 'show';
  	callWithSnackBar(this.snackBar,
  					 this.epicsService.save(epic),
  					 ['Saving epic...', 'Epic saved', 'Error saving epic']);
  }

  createEpic():void {
  	this.mode = "create";
  	// need to wait for the epic form to be added to the view.
  	this.createEpicComponent.changes.pipe(first()).subscribe(x => {
  	  this.createEpicComponent.first.epic = { id: -1, title: '', description: '', size: 0, color: '#FFFFFF', project: this.project };
  	});
  }

  saveNewEpic(epic:Epic):void {
	callWithSnackBar(this.snackBar,
					 this.epicsService.createEpic(epic),
					 ['Creating epic...', 'Epic created', 'Error creating epic'])
					 .subscribe(success => {
					 	this.mode = "show";
					    this.router.navigate(['projects', this.project.id, 'epics', success.id]);
					 });  	
  }

  onReorderEpics(reorderData:any) {
    callWithSnackBar(this.snackBar, this.projectService.reorderEpics(this.project, reorderData.fromIndex, reorderData.toIndex),
      ["Reordering Epics...", "Epics Reordered", "Error Reordering Epics"]);
  }

  delete(epic:Epic):void {
    callWithSnackBar(this.snackBar, this.epicsService.deleteEpic(epic.id),
      ["Deleting epic...", "Epic deleted", "Error deleting epic"])
					 .subscribe(success => {
					 	this.mode = "show";
					    this.router.navigate(['projects', this.project.id, 'epics']);
					 });  
  }
}
