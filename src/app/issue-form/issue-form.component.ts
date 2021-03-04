import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Base } from '../base';
import { Issue } from '../issue';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'sb-issue-form',
  templateUrl: './issue-form.component.html',
  styleUrls: ['./issue-form.component.css']
})
export class IssueFormComponent extends Base implements OnInit {
  @Input() mode:string;
  @Input() issue:Issue;
  public issueForm:FormGroup;
  private fb:FormBuilder = new FormBuilder();

  @Output() cancelEdit:EventEmitter<void> = new EventEmitter<void>();
  @Output() confirmEdit:EventEmitter<Issue> = new EventEmitter<Issue>();
  @Output() deleteIssue:EventEmitter<Issue> = new EventEmitter<Issue>();

  constructor(public dialog: MatDialog) {
  	super();
  }

  ngOnInit(): void {
  	this.issueForm = this.fb.group({
  		title: new FormControl(this.issue.title, Validators.compose([Validators.pattern(".*[^\\s]+.*"), Validators.required])),
      // assignee: new FormControl("foo"),
  		description: new FormControl(this.issue.description),
  		estimate: new FormControl(this.issue.estimate),
  	});
  }

  confirmDelete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
          title: "Are you sure?",
          message: `You are about to delete epic '${this.issue.title}'`
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.deleteIssue.emit(this.issue);
      }    
   });
  }

  submit() {
  	let editedIssue:Issue = { id: this.issue.id, 
  							title: this.issueForm.value['title'], 
  							description: this.issueForm.value['description'], 
  							estimate: this.issueForm.value['estimate'],
  							project: this.issue.project
  						  };
  	this.confirmEdit.emit(editedIssue);
  }

}
