import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';
import { Issue } from '../issue';

@Component({
  selector: 'sb-issue-loading-wrapper',
  templateUrl: './issue-loading-wrapper.component.html',
  styleUrls: ['./issue-loading-wrapper.component.css']
})
export class IssueLoadingWrapperComponent implements OnInit {
  issue:Observable<Issue>
  
  constructor(private dataService:DataService) { }

  ngOnInit(): void {
  }

  @Input() set issueId(value:number) {
  	this._issueId = value;
  	this.loadIssue();
  }
  get issueId():number {
  	return this._issueId
  }
  private _issueId:number;

  private loadIssue() {
  	this.dataService.load(`issues/${this.issueId}`, [`issues/${this.issueId}`, `issues/${this.issueId}/tasks`, `issues/${this.issueId}/tasks/*`]);
  	this.issue = this.dataService.values[`issues/${this.issueId}`];
  }

  ngOnDestroy() {
  	this.dataService.unload(`issues/${this.issueId}`, [`issues/${this.issueId}`, `issues/${this.issueId}/tasks`, `issues/${this.issueId}/tasks/*`]);
  }

}
