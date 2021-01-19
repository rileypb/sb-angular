import { Component, OnInit, Input } from '@angular/core';
import { Base } from '../base';
import { Project } from '../project';
import { Issue } from '../issue';
import { Color } from '../color';
import { Task } from '../task';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { callWithSnackBar } from '../util';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.css']
})
export class IssueDetailComponent extends Base implements OnInit {
  @Input() issue:Issue;

  constructor(public dialog: MatDialog, private snackBar:MatSnackBar, private tasksService:TasksService) { 
    super(); 
  }


  ngOnInit(): void {
  }


  ngOnDestroy() {
  }

  fontColor(bgColor:string):string {  
    return Color.fontColor(bgColor);
  }

  createTask() {
    console.log("CREATETASK");
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
    callWithSnackBar(this.snackBar, this.tasksService.createTask(task),
                     ['Creating task...', 'Created task', 'Error creating task']);
  }

}
