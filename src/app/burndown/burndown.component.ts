import { Component, OnInit, Input } from '@angular/core';
import { Sprint } from '../sprint';
import { DataService } from '../data.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-burndown',
  templateUrl: './burndown.component.html',
  styleUrls: ['./burndown.component.css']
})
export class BurndownComponent implements OnInit {
  options: any;
  constructor(private dataService:DataService) {}

  public sprint$:Observable<Sprint>;
  private sub:Subscription;

  ngOnInit(): void {
    this.updateSprint();
  }

  private updateSprint() {
    if (this.sprintId) {
      this.dataService.load(`sprints/${this.sprintId}`, [`sprints/${this.sprintId}`]);
      this.sprint$ = this.dataService.values[`sprints/${this.sprintId}`];
      this.sub = this.sprint$.subscribe(
        x => this.setBurndownData(x)
      );
    }
  }

  ngOnDestroy() {
    this.disposeSprint();
  }

  private disposeSprint() {
    if (this.sub) {
      this.sub.unsubscribe();
      this.dataService.unload(`sprints/${this.sprintId}`, [`sprints/${this.sprintId}`]);
    }
  }

  setBurndownData(sprint:Sprint) { 
    if (!sprint?.burndownData) {
      return;
    }  
    this.options = {
      legend: {
        data: ['ideal', 'actual'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: sprint.burndownData.xAxisData,
        silent: false,
        splitLine: {
          show: true,
        },
        name: 'date',
        boundaryGap: false
      },
      yAxis: {
        name: 'points'
      },
      series: [
        {
          name: 'ideal',
          type: 'line',
          data: sprint.burndownData.ideal,
        },
        {
          name: 'projected',
          type: 'line',
          data: sprint.burndownData.projected,
          lineStyle: {
            type: 'dashed'
          }
        },
        {
          name: 'actual',
          type: 'line',
          data: sprint.burndownData.actual,
        },
      ],
    };
  }

  @Input()
  set sprintId(value:number) {
    this.disposeSprint();
    this._sprintId = value;
    this.updateSprint();

  }
  get sprintId():number {
    return this._sprintId;
  }
  private _sprintId:number;
}