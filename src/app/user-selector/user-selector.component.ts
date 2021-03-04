import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'sb-user-selector',
  templateUrl: './user-selector.component.html',
  styleUrls: ['./user-selector.component.css']
})
export class UserSelectorComponent implements OnInit {
  @Input() team:any;
  @Output() userSelected:EventEmitter<User> = new EventEmitter<User>();

  constructor() { }

  ngOnInit(): void {
  	console.log("stop here");
  	this.assigneeId = this.assignee ? this.assignee.id : -1;
  }

  @Input() set assignee(value:any) {
  	this._assignee = value;
  	let newId = value ? value.id : -1;
  	if (newId != this.assigneeId) {
	  	this.assigneeId = newId;
  	}
  }
  get assignee():any {
  	return this._assignee;
  }
  private _assignee:any;

  set assigneeId(value:any) {
  	this._assigneeId = value;
  	let newAssignee:any = null;
  	for (let user of this.team) {
  		if (user.id == value) {
  			newAssignee = user;
  			break;
  		}
  	}
  	if (newAssignee != this.assignee) {
	  	this._assignee = newAssignee;
	}
  }
  get assigneeId():any {
  	return this._assigneeId;
  }
  private _assigneeId:any;

  onChangeSelection() {
  	console.log("onChangeSelection: " + JSON.stringify(this.assignee));
  	this.userSelected.emit(this.assignee);
  }
}
