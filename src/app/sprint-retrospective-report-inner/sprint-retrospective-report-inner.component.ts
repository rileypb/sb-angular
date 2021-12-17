import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SprintsService } from '../sprints.service';
import { callWithSnackBar } from '../util';
import { Base } from '../base';

@Component({
  selector: 'sb-sprint-retrospective-report-inner',
  templateUrl: './sprint-retrospective-report-inner.component.html',
  styleUrls: ['./sprint-retrospective-report-inner.component.css']
})
export class SprintRetrospectiveReportInnerComponent extends Base implements OnInit {
  @Input() report:any;
  @Input() sprintId:number;

  mode:string = "report";

  editingRetrospective:boolean;

  constructor(private sprintsService:SprintsService, private snackBar:MatSnackBar) {
    super();
  }

  ngOnInit(): void {
  }

  saveRetrospective() {
  	callWithSnackBar(this.snackBar, this.sprintsService.save({ id: this.sprintId, retrospective: this.report.sprint.retrospective }),
  		['Saving retrospective...', 'Saved retrospective', 'Error saving retrospective']);
  	this.editingRetrospective = false;
  }

}
