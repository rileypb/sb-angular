import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'sb-issues-view',
  templateUrl: './issues-view.component.html',
  styleUrls: ['./issues-view.component.css']
})
export class IssuesViewComponent implements OnInit {
  project$:Observable<any>;
  issues$:Observable<any>;
  issueId:number;

  private sub:Subscription;

  constructor(private locationService:LocationService, private route:ActivatedRoute, private dataService:DataService, private router:Router) { }

  ngOnInit(): void {
  	this.locationService.setTab('issues');
  	this.locationService.projectId = +this.route.snapshot.paramMap.get('id');
  	this.issueId = +this.route.snapshot.paramMap.get('issue_id');

    this.dataService.load(`projects/${this.locationService.projectId}`, [`projects/${this.locationService.projectId}`]);
    this.project$ = this.dataService.values[`projects/${this.locationService.projectId}`];

    this.dataService.load(`projects/${this.locationService.projectId}/issues`, [`projects/${this.locationService.projectId}/issues`,`projects/${this.locationService.projectId}/issues/*`]);
    this.issues$ = this.dataService.values[`projects/${this.locationService.projectId}/issues`];

    this.sub = this.router.events
	    .pipe(filter(event => event instanceof NavigationEnd))
	    .subscribe((event:NavigationEnd) => this.handleNavigation(event));
  }

  handleNavigation(event:NavigationEnd):void {
  	console.log("handleNavigation");
  	this.locationService.projectId = +this.route.snapshot.paramMap.get('id');
  	this.unloadProject();
  	
  	this.dataService.load(`projects/${this.locationService.projectId}`, [`projects/${this.locationService.projectId}`]);
    this.project$ = this.dataService.values[`projects/${this.locationService.projectId}`];
    this.dataService.load(`projects/${this.locationService.projectId}/issues`, [`projects/${this.locationService.projectId}/issues`]);
    this.issues$ = this.dataService.values[`projects/${this.locationService.projectId}/issues`];
	
	this.issueId = +this.route.snapshot.paramMap.get('issue_id');
  }

  unloadProject() {
  	this.dataService.unload(`projects/${this.locationService.projectId}`, [`projects/${this.locationService.projectId}`]);
    this.dataService.unload(`projects/${this.locationService.projectId}/issues`, [`projects/${this.locationService.projectId}/issues`,`projects/${this.locationService.projectId}/issues/*`]);
  }

  ngOnDestroy() {
  	this.sub.unsubscribe();
  	this.unloadProject();
  }

}
