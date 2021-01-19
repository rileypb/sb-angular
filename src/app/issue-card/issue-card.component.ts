import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Issue } from '../issue';
import { IssuesService } from '../issues.service';
import { TasksService } from '../tasks.service';
import { Base } from '../base';
import { Task } from '../task';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-issue-card',
  templateUrl: './issue-card.component.html',
  styleUrls: ['./issue-card.component.css']
})
export class IssueCardComponent extends Base implements OnInit {
  @Input() issue:Issue;

  constructor(private issuesService:IssuesService, private tasksService:TasksService,
    public dialog: MatDialog,
    private _snackBar : MatSnackBar,) { 
    super();
  }

  ngOnInit(): void {

  }

  updateState(value:string): void {
  	this.issuesService.updateState(this.issue, value);
  }

  createTask() {
    let data:Task = {id: -1, title:'', description: '', estimate: 0, issue: {id: this.issue.id}};
    const dialogRef:MatDialogRef<EditTaskDialogComponent, any> = this.dialog.open(EditTaskDialogComponent, {
      width: '90%',
      data: data,
      disableClose: true
    });
    dialogRef.componentInstance.newTaskMode = true;

    dialogRef.afterClosed().subscribe(result => {
     if (result) {
       this.create(data);
     }
    });
  }

  private create(task) {
    this._snackBar.open("Creating Task...", null, {
      duration: 30000,
    });
    console.log("this one");
    this.tasksService.createTask(task).subscribe(
      success => {
        this._snackBar.open("Task Created", null, {
          duration: 2000,
        });
      },
      error => {
        this._snackBar.open("Error Creating Task", null, {
          duration: 4000,
        });
      }
    );
  }
}
