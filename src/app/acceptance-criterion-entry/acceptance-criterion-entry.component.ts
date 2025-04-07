import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { callWithSnackBar } from '../util';
import { IssuesService } from '../issues.service';
import { Base } from '../base';

@Component({
  selector: 'sb-acceptance-criterion-entry',
  templateUrl: './acceptance-criterion-entry.component.html',
  styleUrls: ['./acceptance-criterion-entry.component.css']
})
export class AcceptanceCriterionEntryComponent extends Base implements OnInit {
  @ViewChild("criterionEditor") editor:ElementRef;

  @Input() criterion;
  @Input() issue;
  @Input() showCompletionCheckboxes:boolean;
  @Input() editable:boolean = true;

  @Output() deleteAC:EventEmitter<any> = new EventEmitter<any>();

  private originalCriterion:string;

  constructor(private snackBar:MatSnackBar, private issuesService:IssuesService) { 
  	super();
  }

  ngOnInit(): void {
  }

  toggleCompleted(criterion:any) {
    console.log("toggleCompleted", criterion);
    // criterion.completed = !criterion.completed;
    callWithSnackBar(this.snackBar,
                     this.issuesService.setACCompleted(this.issue.id, criterion.id, criterion.completed),
                     ["Updating acceptance criterion...", "Acceptance criterion updated", "Error updating acceptance criterion"]);
  }

  startEditing(criterion) {
    this.originalCriterion = criterion.criterion;
  }

  saveCriterion(criterion) {
  	if (criterion.criterion != this.originalCriterion) {
	    callWithSnackBar(this.snackBar,
	    				 this.issuesService.updateAcceptanceCriterion(this.issue.id, criterion.id, criterion.criterion),
	                     ["Updating acceptance criterion...", "Acceptance criterion updated", "Error updating acceptance criterion"]);
    }
  }

  onCriterionKeyDown(event:KeyboardEvent, criterion) {
    let chrCode:number;
    if (event.charCode)     chrCode = event.charCode;
    else if (event.which)   chrCode = event.which;
    else if (event.keyCode) chrCode = event.keyCode;
    if (chrCode == 13 && !event.shiftKey) {
      this.saveCriterion(criterion);
      event.preventDefault();
      this.editor.nativeElement.blur();
      return;
    } else if (chrCode == 27) {
      event.preventDefault();
      criterion.criterion = this.originalCriterion;
      this.editor.nativeElement.blur();
      return;
    }
  }

}
