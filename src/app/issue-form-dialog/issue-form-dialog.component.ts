import { Component, OnInit, Inject } from '@angular/core';
import { Epic } from '../epic';
import { Issue } from '../issue';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
	epic:Epic
}

@Component({
  selector: 'sb-issue-form-dialog',
  templateUrl: './issue-form-dialog.component.html',
  styleUrls: ['./issue-form-dialog.component.css']
})
export class IssueFormDialogComponent implements OnInit {
  epic:Epic;

  constructor(public dialogRef: MatDialogRef<IssueFormDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
  			this.epic = data.epic;
  }

  ngOnInit(): void {
  }

  onCancelEdit() {
  	this.dialogRef.close();
  }

  onConfirmEdit(issue:Issue) {
  	this.dialogRef.close(issue);
  }

}
