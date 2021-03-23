import { Component, OnInit, Input } from '@angular/core';
import { TasksService } from '../tasks.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { callWithSnackBar } from '../util';
import { Task } from '../task';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Base } from '../base';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';

@Component({
  selector: 'sb-checkable-task-entry',
  templateUrl: './checkable-task-entry.component.html',
  styleUrls: ['./checkable-task-entry.component.css']
})
export class CheckableTaskEntryComponent extends Base implements OnInit {
  @Input() task:Task;

  constructor(private tasksService:TasksService, private snackBar:MatSnackBar, private dialog:MatDialog) { 
    super(); 
  }

  ngOnInit(): void {
  }

  onCheckboxChange(event:MatCheckboxChange) {
  	callWithSnackBar(this.snackBar, this.tasksService.setComplete(this.task.id, event.checked),
  					 ["Updating task...", "Task updated", "Error updating task"]);
  }

  showTaskDetails() {
    const dialogRef:MatDialogRef<EditTaskDialogComponent, any> = this.dialog.open(EditTaskDialogComponent, {
      width: '90%',
      data: this.task,
      disableClose: false
    });
    dialogRef.componentInstance.newTaskMode = false;
    dialogRef.componentInstance.infoMode = true;

    dialogRef.afterClosed().subscribe(result => {
     if (result) {
       this.update(this.task);
     }
    });
  }

  update(task:Task) {
    callWithSnackBar(this.snackBar, 
      this.tasksService.save(task),
      ["Updating task...", "Task updated", "Error updating task"]);
  }

}
