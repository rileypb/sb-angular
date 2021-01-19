import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Base } from '../base';
import { Project } from '../project';
import { Issue } from '../issue';
import { IssuesService } from '../issues.service';
import { callWithSnackBar } from '../util';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-product-backlog',
  templateUrl: './product-backlog.component.html',
  styleUrls: ['./product-backlog.component.css']
})
export class ProductBacklogComponent extends Base implements OnInit {

  @Input() project:Project;
  @Output() issueChanged:EventEmitter<Issue> = new EventEmitter<Issue>();
  @Output() deleteIssue:EventEmitter<Issue> = new EventEmitter<Issue>();

  mode:string = "show";

  selectedIssue:Issue;

  requestedIssueId:number;

  constructor(private issuesService:IssuesService, private snackBar:MatSnackBar, private route:ActivatedRoute, private dataService:DataService) { 
  	super();
  }

  ngOnInit(): void {
    this.requestedIssueId = +this.route.snapshot.paramMap.get('issue_id');
  }

  ngOnDestroy() {
  }

  showDetail(issue:Issue) {
    if (this.mode == "show") {
      this.selectedIssue = issue;
    }
  }

  editIssue() {
    this.mode = "edit";
  }

  createIssue() {
    this.mode = "create";
    this.selectedIssue = { id: -1, title: '', description: '', estimate: 0, project: this.project };
  }

  cancelEdit() {
    if (this.mode == "create") {
      this.selectedIssue = null;
    }
    this.mode = "show";
  }

  saveNewIssue(issue) {
    this.mode = "show";
    callWithSnackBar(this.snackBar,
                     this.issuesService.createIssue(issue),
                     ["Creating Issue...", "Issue Created", "Error Creating Issue"])
                  .subscribe(msg => {
                    this.selectedIssue = msg;
                  });
  }

  confirmEdit(issue) {
    console.log("confirmEdit " + JSON.stringify(issue));
    this.mode = "show";
    this.selectedIssue.title = issue.title;
    this.selectedIssue.description = issue.description;
    this.selectedIssue.estimate = issue.estimate;
    this.issueChanged.emit(issue);
  }

  delete(issue) {
    console.log('delete issue');
    this.mode = "show"
    this.selectedIssue = null;
    this.dataService.fastUnload(`issues/${issue.id}`);
    callWithSnackBar(this.snackBar,
                     this.issuesService.deleteIssue(issue.id),
                     ['deleting issue...', 'issue deleted', 'error deleting issue']);
  }

}
