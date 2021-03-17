import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Issue } from '../issue';
import { Base } from '../base';
import { Observable, Subscription } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'sb-checkable-task-list',
  templateUrl: './checkable-task-list.component.html',
  styleUrls: ['./checkable-task-list.component.css']
})
export class CheckableTaskListComponent extends Base implements OnInit {
  @ViewChild("checkbox") checkbox:ElementRef;

  public percentComplete:number = 0;
  private sub:Subscription;

  checked:boolean;

  @Input() issue:Issue;

  public tasks$:Observable<any>;

  constructor(private dataService:DataService) { 
  	super();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataService.load(`issues/${this.issue.id}/tasks`, [`issues/${this.issue.id}/tasks`]);
    this.tasks$ = this.dataService.values[`issues/${this.issue.id}/tasks`];
    this.sub = this.tasks$.subscribe((x) => {
      if (x) {
        this.percentComplete = x.percentComplete;
      }
    })
  }

  ngOnDestroy() {
    this.dataService.unload(`issues/${this.issue.id}/tasks`, [`issues/${this.issue.id}/tasks`]);
    this.sub.unsubscribe();
  }
}
