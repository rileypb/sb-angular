import { Component, OnInit, Input } from '@angular/core';
import { Activity } from '../activity';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {
  @Input() activities:Activity[];

  constructor() { }

  ngOnInit(): void {
  }

}
