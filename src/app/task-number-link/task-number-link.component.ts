import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../task';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-number-link',
  templateUrl: './task-number-link.component.html',
  styleUrls: ['./task-number-link.component.css']
})
export class TaskNumberLinkComponent implements OnInit {
  @Input() task:Task;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  navigateToIssue():void {
  	this.router.navigate([`/projects/${this.task.issue.project.id}/backlog/${this.task.issue.id}`]);
  }

}
