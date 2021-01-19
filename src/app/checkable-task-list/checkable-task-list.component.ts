import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Issue } from '../issue';
import { Base } from '../base';

@Component({
  selector: 'sb-checkable-task-list',
  templateUrl: './checkable-task-list.component.html',
  styleUrls: ['./checkable-task-list.component.css']
})
export class CheckableTaskListComponent extends Base implements OnInit {
  @ViewChild("checkbox") checkbox:ElementRef;

  checked:boolean;

  @Input() issue:Issue;

  constructor() { 
  	super();
  }

  ngOnInit(): void {
  }

}
