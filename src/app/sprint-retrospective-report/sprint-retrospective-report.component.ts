import { Component, OnInit, Input } from '@angular/core';
import { Sprint } from '../sprint';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'sb-sprint-retrospective-report',
  templateUrl: './sprint-retrospective-report.component.html',
  styleUrls: ['./sprint-retrospective-report.component.css']
})
export class SprintRetrospectiveReportComponent implements OnInit {

  public report:Observable<any>

  constructor(private dataService:DataService) { }

  ngOnInit() {}

  load(): void {
    this.dataService.load(`sprints/${this.sprintId}/retrospective_report`, [`sprints/${this.sprintId}`, `sprints/${this.sprintId}/issues`, `sprints/${this.sprintId}/issues/*`]);
    this.report = this.dataService.values[`sprints/${this.sprintId}/retrospective_report`];
  }

  unload() {
  	this.dataService.unload(`sprints/${this.sprintId}/retrospective_report`, [`sprints/${this.sprintId}`, `sprints/${this.sprintId}/issues`, `sprints/${this.sprintId}/issues/*`]);
  }

  @Input() set sprintId(value:number) {
    if (this._sprintId) {
      this.unload();
    }
    this._sprintId = value;
    if (this._sprintId) {
      this.load();
    }
  }
  get sprintId():number {
    return this._sprintId;
  }
  private _sprintId:number;

}
