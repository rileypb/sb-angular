import { Component, OnInit, Input } from '@angular/core';
import { TasksService } from '../tasks.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { callWithSnackBar } from '../util';
import { Task } from '../task';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'sb-checkable-task-entry',
  templateUrl: './checkable-task-entry.component.html',
  styleUrls: ['./checkable-task-entry.component.css']
})
export class CheckableTaskEntryComponent implements OnInit {
  @Input() task:Task;

  constructor(private tasksService:TasksService, private snackBar:MatSnackBar) { }

  ngOnInit(): void {
  }

  onCheckboxChange(event:MatCheckboxChange) {
  	callWithSnackBar(this.snackBar, this.tasksService.setComplete(this.task.id, event.checked),
  					 ["Updating task...", "Task updated", "Error updating task"]);
  }

}
