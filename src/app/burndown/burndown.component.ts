import { Component, OnInit, Input } from '@angular/core';
import { Sprint } from '../sprint';

@Component({
  selector: 'app-burndown',
  templateUrl: './burndown.component.html',
  styleUrls: ['./burndown.component.css']
})
export class BurndownComponent implements OnInit {
  options: any;
  constructor() {}

  ngOnInit(): void {

  }

  setBurndownData(sprint:Sprint) {    
    this.options = {
      legend: {
        data: ['ideal', 'projected', 'actual'],
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
  set sprint(value:Sprint) {
    this._sprint = value;
    if (value) {
      this.setBurndownData(value);
    }
  }
  get sprint():Sprint {
    return this._sprint;
  }
  private _sprint:Sprint;
}