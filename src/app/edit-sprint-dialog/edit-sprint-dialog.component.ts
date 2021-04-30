import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Sprint } from '../sprint';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { SprintsService } from '../sprints.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router, ActivatedRoute }  from '@angular/router';
import { Base } from '../base';

@Component({
  selector: 'app-edit-sprint-dialog',
  templateUrl: './edit-sprint-dialog.component.html',
  styleUrls: ['./edit-sprint-dialog.component.css']
})
export class EditSprintDialogComponent extends Base implements OnInit {
  private fb:FormBuilder = new FormBuilder();
  public editSprintForm:FormGroup;
  public newSprintMode:boolean;

  constructor(public dialogRef: MatDialogRef<EditSprintDialogComponent>,
  	  @Inject(MAT_DIALOG_DATA) public sprint: Sprint, public dialog: MatDialog,
  	  private sprintsService:SprintsService, private _snackBar:MatSnackBar,
      private router: Router, private route:ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
  	this.editSprintForm = this.fb.group({
      title: new FormControl(this.sprint.title, Validators.compose([Validators.pattern(".*[^\\s]+.*"), Validators.required])),
      description: new FormControl(this.sprint.description),
  	});
  }

  confirmEdit() {
  	this.sprint.title = this.editSprintForm.controls['title'].value;
  	this.sprint.description = this.editSprintForm.controls['description'].value;
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
          message: `You are about to delete sprint '${this.sprint.title}'. All issues in the sprint backlog will be moved to the product backlog.`}
    });

    // listen to response
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.deleteSprint(this.sprint);
        this.dialogRef.close(false);
      }      
    });
  }

  private deleteSprint(sprint: Sprint) : void {
    let snackBarRef = this._snackBar.open("Deleting Sprint...", null, {
      duration: 30000,
    });
    this.sprintsService.deleteSprint(sprint).subscribe(
      success => { 
        snackBarRef.dismiss();
        this._snackBar.open("Delete Successful", null, {
          duration: 4000,
        });
        this.router.navigate([`/projects/${sprint.project.id}`])

      },
      err => {
          snackBarRef.dismiss();
          this._snackBar.open("Error Deleting Sprint", null, {
            duration: 10000,
          });
      }
    );
  }

}
