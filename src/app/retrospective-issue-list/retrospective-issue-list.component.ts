import { Component, OnInit, Input } from '@angular/core';
import { Sprint } from '../sprint';
import { DataService } from '../data.service';

@Component({
  selector: 'sb-retrospective-issue-list',
  templateUrl: './retrospective-issue-list.component.html',
  styleUrls: ['./retrospective-issue-list.component.css']
})
export class RetrospectiveIssueListComponent implements OnInit {
  // @Input() sprint:Sprint;
  public issues:any;

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
  }

  @Input() set sprint(value:Sprint) {
  	this._sprint = value;
  	this.dataService.load(`sprints/${this.sprint.id}/issues`, [`sprints/${this.sprint.id}`, `sprints/${this.sprint.id}/issues`, `sprints/${this.sprint.id}/issues/*`]);
    this.issues = this.dataService.values[`sprints/${this.sprint.id}/issues`];
  }
  get sprint():Sprint {
  	return this._sprint;
  }
  private _sprint:Sprint;

}
