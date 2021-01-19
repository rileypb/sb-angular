import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { IssuesService } from "../issues.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';
import { Issue } from '../issue';
import { Sprint } from '../sprint';
import { Project } from '../project';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Base } from '../base';
import { UiStateService } from '../ui-state.service';
import { Router } from '@angular/router';
import { Task } from '../task';
import { TasksService } from '../tasks.service';
import { DataService } from '../data.service';
import { callWithSnackBar } from '../util';

export class EditCoordinator {
  objectUnderEdit:string;
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent extends Base implements OnInit {
  
  selectedTask: Task;
  tasks: Observable<any>;

  editCoordinator:EditCoordinator = new EditCoordinator();


  constructor(private dataService:DataService, private tasksService:TasksService, public dialog: MatDialog, private snackBar : MatSnackBar, 
              private uiStateService:UiStateService, private router:Router, private issuesService:IssuesService) { 
  	super();
  }

  ngOnInit(): void {
  	this.refreshList();
  }

  @Input() set issue(value:Issue) {
    this._issue = value;
    this.refreshList();
  }
  get issue():Issue {
    return this._issue;
  }
  private _issue:Issue;

  refreshList() {
    this.dataService.load(`issues/${this.issue.id}/tasks`, [`issues/${this.issue.id}/tasks`, `issues/${this.issue.id}/tasks/*`]);
    this.tasks = this.dataService.values[`issues/${this.issue.id}/tasks`];
  }

  ngOnDestroy() {
    this.dataService.unload(`issues/${this.issue.id}/tasks`, [`issues/${this.issue.id}/tasks`, `issues/${this.issue.id}/tasks/*`]);
  }

  onDrop(event):void {
    console.log("foo");
    let tmp = JSON.parse(JSON.stringify(event.container.data.tasks));
    moveItemInArray(tmp.tasks.list, event.previousIndex, event.currentIndex);
    this.dataService.update(`issues/${this.issue.id}/tasks`, tmp);
    callWithSnackBar(this.snackBar,
                     this.issuesService.reorderTasks(this.issue, event.previousIndex, event.currentIndex),
                     ['Reordering tasks...', 'Tasks reordered', 'Error reordering tasks']);
  }



}
