import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'sb-epics-view',
  templateUrl: './epics-view.component.html',
  styleUrls: ['./epics-view.component.css']
})
export class EpicsViewComponent implements OnInit {
  project$:Observable<any>;
  epics$:Observable<any>;
  epicId:number;

  private sub:Subscription;

  constructor(private locationService:LocationService, private route:ActivatedRoute, private dataService:DataService, private router:Router) { }

  ngOnInit(): void {
  	this.locationService.setTab('epics');
  	this.locationService.projectId = +this.route.snapshot.paramMap.get('id');
  	this.epicId = +this.route.snapshot.paramMap.get('epic_id');

    this.dataService.load(`projects/${this.locationService.projectId}`, [`projects/${this.locationService.projectId}`]);
    this.project$ = this.dataService.values[`projects/${this.locationService.projectId}`];

    this.dataService.load(`projects/${this.locationService.projectId}/epics`, [`projects/${this.locationService.projectId}/epics`]);
    this.epics$ = this.dataService.values[`projects/${this.locationService.projectId}/epics`];

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
    this.dataService.load(`projects/${this.locationService.projectId}/epics`, [`projects/${this.locationService.projectId}/epics`]);
    this.epics$ = this.dataService.values[`projects/${this.locationService.projectId}/epics`];
	
	this.epicId = +this.route.snapshot.paramMap.get('epic_id');
  }

  unloadProject() {
  	this.dataService.unload(`projects/${this.locationService.projectId}`, [`projects/${this.locationService.projectId}`]);
    this.dataService.unload(`projects/${this.locationService.projectId}/epics`, [`projects/${this.locationService.projectId}/epics`]);
  }

  ngOnDestroy() {
  	this.sub.unsubscribe();
  	this.unloadProject();
  }

}
