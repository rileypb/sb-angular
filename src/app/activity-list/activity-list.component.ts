import { Component, OnInit, Input } from '@angular/core';
import { Activity } from '../activity';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {
  @Input() 
  set activities(value:Activity[]) {
  	console.log(value);
  	this._activities = value;
  }
  get activities():Activity[] {
  	return this._activities;
  }
  private _activities:Activity[];

  constructor() { }

  ngOnInit(): void {
  	console.log(this.activities)
  }

  ngAfterViewInit():void {
  	console.log(this.activities)
  }

}
