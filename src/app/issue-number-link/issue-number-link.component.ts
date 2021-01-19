import { Component, OnInit, Input } from '@angular/core';
import { Issue } from '../issue';
import { Router } from '@angular/router';
import { UiStateService } from '../ui-state.service';

@Component({
  selector: 'app-issue-number-link',
  templateUrl: './issue-number-link.component.html',
  styleUrls: ['./issue-number-link.component.css']
})
export class IssueNumberLinkComponent implements OnInit {
  @Input() issue:Issue;

  constructor(private router:Router, private uiStateService:UiStateService) { }

  ngOnInit(): void {
  }

  navigateToIssue():void {
  	this.uiStateService.selectedIssue = this.issue;
  	this.router.navigate([`/projects/${this.issue.project.id}/issues`]);
  }

}
