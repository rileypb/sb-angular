import { Component, OnInit, Input } from '@angular/core';
import { Activity } from '../activity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activity-entry',
  templateUrl: './activity-entry.component.html',
  styleUrls: ['./activity-entry.component.css']
})
export class ActivityEntryComponent implements OnInit {
  @Input() activity:Activity;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  navigateToBacklog() {
  	this.router.navigate([`/projects/${this.activity.project_context.id}/backlog`]);
  }

}
