import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Task } from '../task';
import { Base } from '../base';
import { EditCoordinator } from '../tasks/tasks.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { callWithSnackBar } from '../util';
import { TasksService } from '../tasks.service';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { User } from '../user';

@Component({
  selector: 'sb-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent extends Base implements OnInit {
  @ViewChild("estimateEditor") estimateEditor: ElementRef;

  @Input() task:Task;
  @Input() editCoordinator:EditCoordinator;

  public team:Observable<any>;

  private taskUnderEdit:Task;

  estimate:any;
  private originalEstimate:number;

  constructor(private dialog: MatDialog, private snackBar:MatSnackBar, private tasksService:TasksService, private dataService:DataService) {
  	super();
  }

  ngOnInit(): void {
    this.dataService.load(`projects/${this.task.issue.project.id}/team`, []);
    this.team = this.dataService.values[`projects/${this.task.issue.project.id}/team`];
  }

  ngOnDestroy() {
    this.dataService.unload(`projects/${this.task.issue.project.id}/team`, []);
  }

  assignTask(user:User) {
    callWithSnackBar(this.snackBar,
                     this.tasksService.assignTask(this.task.id, user?.id),
                     ["Assigning task...", "Assigned task", "Error assigning task"]);
  }

  editTask(task:Task, event:any):void {
    event.stopPropagation();
    this.taskUnderEdit = JSON.parse(JSON.stringify(task));

    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      width: '90%',
      data: this.taskUnderEdit
    });

    dialogRef.afterClosed().subscribe(result => {
     if (result) {
       this.save(this.taskUnderEdit);
     }
    });
  }

  private save(t) {
  	callWithSnackBar(this.snackBar, this.tasksService.save(t), ['Saving task...', 'Task saved', 'Error saving task']);
  }

  // isEditingEstimate(task) {
  //   return this.editingEstimate[String(task.id)];
  // }

  startEditingEstimate() {
  	console.log("startEditingEstimate");
    this.editCoordinator.objectUnderEdit = `estimate-${this.task.id}`;
    this.estimate = this.task.estimate;
    this.originalEstimate = this.task.estimate;
    setTimeout(()=>{
    	this.estimateEditor.nativeElement.focus();
    },0);
  }

  isEditingEstimate() {
  	return this.editCoordinator.objectUnderEdit == `estimate-${this.task.id}`;
  }

  processKeyPress(event) {
    console.log("processKeyPress");
    let keyCode = event.keyCode;
    if (keyCode == 27 || keyCode == 13 || keyCode == 9) {
   	  this.stopEditingEstimate(keyCode != 9);
    }
  }

  stopEditingEstimate(saveEdit) {
    this.editCoordinator.objectUnderEdit = null;
    if (saveEdit)
    {
    	this.task.estimate = Number(this.estimate);
    	this.save(this.task);
    }
  }

}
