import { Component, OnInit, Input } from '@angular/core';
import { Sprint } from '../sprint';
import { DataService } from '../data.service';

@Component({
  selector: 'sb-retrospective-issue-list',
  templateUrl: './retrospective-issue-list.component.html',
  styleUrls: ['./retrospective-issue-list.component.css']
})
export class RetrospectiveIssueListComponent implements OnInit {
  @Input() issues:any;

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
  }

  isAccepted(issue):boolean {
  	if (!issue.acceptance_criteria) {
  		return true;
  	}
  	for (let ac of issue.acceptance_criteria) {
  		if (!ac.completed) {
  			return false;
  		}
  	}
  	return true;
  }

}
