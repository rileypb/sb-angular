import { Component, OnInit, Input, Inject } from '@angular/core';
import { Issue } from '../issue';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { IssuesService } from '../issues.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Base } from '../base';

@Component({
  selector: 'app-edit-issue-dialog',
  templateUrl: './edit-issue-dialog.component.html',
  styleUrls: ['./edit-issue-dialog.component.css']
})
export class EditIssueDialogComponent extends Base implements OnInit {
  public Editor = ClassicEditor;
  private fb:FormBuilder = new FormBuilder();
  public editIssueForm:FormGroup;
  public allowDelete:boolean;

  public newIssueMode:boolean;
 
  constructor(public dialogRef: MatDialogRef<EditIssueDialogComponent>,
  	@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private issuesService:IssuesService,
        private _snackBar : MatSnackBar) { 
    super();
    this.allowDelete = data.allowDelete;
  }

  ngOnInit(): void {    
    this.editIssueForm = this.fb.group({
      title: new FormControl(this.data.issue.title, Validators.compose([Validators.pattern(".*[^\\s]+.*"), Validators.required])),
      description: new FormControl(this.data.issue.description),
      estimate: new FormControl(this.data.issue.estimate),
      state: new FormControl({ value: this.data.issue.state || "Open", disabled: this.newIssueMode})
    });
  }

  confirmEdit() {
    this.data.issue.title = this.editIssueForm.controls['title'].value;
    this.data.issue.description = this.editIssueForm.controls['description'].value;
    this.data.issue.estimate = this.editIssueForm.controls['estimate'].value;
    this.data.issue.state = this.editIssueForm.controls['state'].value;
  	this.dialogRef.close(true);
  }

  cancelEdit() {
  	this.dialogRef.close(false);
  }

  confirmDelete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
          title: "Are you sure?",
          message: `You are about to delete issue '${this.data.issue.title}'`
      }
    });

    // listen to response
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this._snackBar.open("Deleting Issue...", null, {
          duration: 30000,
        });
        this.issuesService.deleteIssue(this.data.issue.id).subscribe(
          success => {
            this._snackBar.open("Issue Deleted", null, {
              duration: 2000,
            });
          },
          error => {
            this._snackBar.open("Error Deleting Issue", null, {
              duration: 4000,
            });
          }
        );
        this.dialogRef.close(false);
      }    
   });
  }

}
