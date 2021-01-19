import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../task';
import { UiStateService } from '../ui-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-number-link',
  templateUrl: './task-number-link.component.html',
  styleUrls: ['./task-number-link.component.css']
})
export class TaskNumberLinkComponent implements OnInit {
  @Input() task:Task;

  constructor(private router:Router, private uiStateService:UiStateService) { }

  ngOnInit(): void {
  }

  navigateToIssue():void {
  	this.uiStateService.selectedIssue = this.task.issue;
  	this.router.navigate([`/projects/${this.task.issue.project.id}/issues`]);
  }

}
