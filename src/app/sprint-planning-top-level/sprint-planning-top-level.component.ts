import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'sb-sprint-planning-top-level',
  templateUrl: './sprint-planning-top-level.component.html',
  styleUrls: ['./sprint-planning-top-level.component.css']
})
export class SprintPlanningTopLevelComponent implements OnInit {
  project:Observable<any>;
  sprints:Observable<any>;

  sprintId:number;

  private sub:Subscription;

  constructor(private locationService:LocationService, private route:ActivatedRoute, private dataService:DataService, private router:Router) { }

  ngOnInit(): void {
  	this.locationService.setTab('sprint-planning');
  	this.locationService.projectId = +this.route.snapshot.paramMap.get('id');
    this.sprintId = +this.route.snapshot.paramMap.get('sprint_id');

    this.dataService.load(`projects/${this.locationService.projectId}`, [`projects/${this.locationService.projectId}`]);
    this.project = this.dataService.values[`projects/${this.locationService.projectId}`];

    this.dataService.load(`projects/${this.locationService.projectId}/sprints?current=true`,[`projects/${this.locationService.projectId}/sprints?current=true`]);
    this.sprints = this.dataService.values[`projects/${this.locationService.projectId}/sprints?current=true`];

    this.sub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event:NavigationEnd) => this.handleNavigation(event));
  }

  ngOnDestroy() {
    this.dataService.unload(`projects/${this.locationService.projectId}`, [`projects/${this.locationService.projectId}`]);
  }

  handleNavigation(event:NavigationEnd):void {
    console.log("handleNavigation");
    this.locationService.projectId = +this.route.snapshot.paramMap.get('id');
    this.unloadProject();
    
    this.dataService.load(`projects/${this.locationService.projectId}`, [`projects/${this.locationService.projectId}`]);
    this.project = this.dataService.values[`projects/${this.locationService.projectId}`];
    this.dataService.load(`projects/${this.locationService.projectId}/epics`, [`projects/${this.locationService.projectId}/epics`]);
    this.sprints = this.dataService.values[`projects/${this.locationService.projectId}/epics`];
  
    this.sprintId = +this.route.snapshot.paramMap.get('sprint_id');
  }

  unloadProject() {
    this.dataService.unload(`projects/${this.locationService.projectId}`, [`projects/${this.locationService.projectId}`]);
    this.dataService.unload(`projects/${this.locationService.projectId}/epics`, [`projects/${this.locationService.projectId}/epics`]);
  }
}
