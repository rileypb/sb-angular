import { Component, OnInit, Inject } from '@angular/core';
import { Base } from '../base';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Task } from '../task';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { TasksService } from '../tasks.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent extends Base implements OnInit {
  public newTaskMode: boolean;
  public infoMode:boolean;
  public Editor = ClassicEditor;
  private fb:FormBuilder = new FormBuilder();
  public editTaskForm:FormGroup;

  constructor(public dialogRef: MatDialogRef<EditTaskDialogComponent>,
  	@Inject(MAT_DIALOG_DATA) public task: Task, public dialog: MatDialog, private tasksService:TasksService,
  	private _snackBar : MatSnackBar) 
  { 
  	super();
  }

  ngOnInit(): void {
    this.editTaskForm = this.fb.group({
      title: new FormControl(this.task.title, Validators.compose([Validators.pattern(".*[^\\s]+.*"), Validators.required])),
      description: new FormControl(this.task.description),
      estimate: new FormControl(this.task.estimate),
    });
  }

  confirmEdit() {
    this.task.title = this.editTaskForm.controls['title'].value;
    this.task.description = this.editTaskForm.controls['description'].value;
    this.task.estimate = this.editTaskForm.controls['estimate'].value;
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
          message: `You are about to delete task '${this.task.title}'`
      }
    });

    // listen to response
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this._snackBar.open("Deleting Task...", null, {
          duration: 30000,
        });
        this.tasksService.deleteTask(this.task.id).subscribe(
          success => {
            this._snackBar.open("Task Deleted", null, {
              duration: 2000,
            });
          },
          error => {
            this._snackBar.open("Error Deleting Task", null, {
              duration: 4000,
            });
          }
        );
        this.dialogRef.close(false);
      }    
   });
  }

}
