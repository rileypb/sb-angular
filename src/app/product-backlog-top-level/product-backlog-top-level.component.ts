import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { Issue } from '../issue';
import { IssuesService } from '../issues.service';
import { callWithSnackBar } from '../util';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'sb-product-backlog-top-level',
  templateUrl: './product-backlog-top-level.component.html',
  styleUrls: ['./product-backlog-top-level.component.css']
})
export class ProductBacklogTopLevelComponent implements OnInit {

  public project:Observable<any>;

  constructor(private locationService:LocationService, private route:ActivatedRoute, private dataService:DataService, private issuesService:IssuesService,
              private snackBar:MatSnackBar) { }

  ngOnInit(): void {
  	this.locationService.setTab('product-backlog');
  	this.locationService.projectId = +this.route.snapshot.paramMap.get('id');
  	this.dataService.load(`projects/${this.locationService.projectId}`, [`projects/${this.locationService.projectId}`]);
    this.project = this.dataService.values[`projects/${this.locationService.projectId}`];
  }

  ngOnDestroy() {
  	this.dataService.unload(`projects/${this.locationService.projectId}`, [`projects/${this.locationService.projectId}`]);
  }

  onIssueChanged(issue:Issue) {
    callWithSnackBar(this.snackBar,
                     this.issuesService.save(issue),
                     ["Saving Issue...", "Issue Saved", "Error Saving Issue"]);
  }

}
