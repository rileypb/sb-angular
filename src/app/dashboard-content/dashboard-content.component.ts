import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../project';

@Component({
  selector: 'sb-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.css']
})
export class DashboardContentComponent implements OnInit {
  @Input() project:Project;

  constructor() { }

  ngOnInit(): void {
  }

}
