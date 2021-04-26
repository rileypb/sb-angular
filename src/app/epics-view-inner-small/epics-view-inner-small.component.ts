import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../project';
import { Base } from '../base';
import { Epic } from '../epic';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { callWithSnackBar } from '../util';
import { ProjectService } from '../project.service';
import { Color } from '../color';

@Component({
  selector: 'sb-epics-view-inner-small',
  templateUrl: './epics-view-inner-small.component.html',
  styleUrls: ['./epics-view-inner-small.component.css']
})
export class EpicsViewInnerSmallComponent extends Base implements OnInit {

  @Input() project:Project;
  @Input() epics:any;

  public selectedEpic:Epic;

  public mode:String = "show";

  constructor(private router:Router, private snackBar:MatSnackBar, private projectService:ProjectService) {
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

  showDetail(epic:Epic):void {
  	if (this.mode == 'show') {
  	  this.router.navigate(['projects',this.project.id,'epics',epic.id]);
  	}
  }

  onReorderEpics(reorderData:any) {
    callWithSnackBar(this.snackBar, this.projectService.reorderEpics(this.project, reorderData.fromIndex, reorderData.toIndex),
      ["Reordering Epics...", "Epics Reordered", "Error Reordering Epics"]);
  }

  fontColor(bgColor:string):string {  
    return Color.fontColor(bgColor);
  }

  selectEpic(epic:Epic) {
    this.selectedEpic = epic;
  }

  clearSelectedEpic() {
    this.selectedEpic = null;
  }

}
