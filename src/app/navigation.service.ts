import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  public projectId:number = 0;
  public segment:string = 'projects';
  public selectedId:number = 0;

  private sub:Subscription;

  constructor(private router:Router, private route:ActivatedRoute) { 
  	this.sub = this.router.events
	    .pipe(filter(event => event instanceof NavigationEnd))
	    .subscribe((event:NavigationEnd) => this.handleNavigation(event));
  }

  private handleNavigation(event:NavigationEnd) {
  	let segments:string[] = event.url.substr(1).split('/');

  	if (segments.length > 1) {
  		this.projectId = +segments[1];
  	} else {
  		this.segment = 'projects';
  	}

  	if (segments.length > 2) {
  		this.segment = segments[2];
  	}

  	if (segments.length > 3) {
  		this.selectedId = +segments[3];
  	}
  	console.log("navigated to project " + this.projectId);
  }

  public go(segment, selectedId=0) {
  	if (segment == 'projects') {
  		this.router.navigate(['projects']);
  		return;
  	}

  	console.log(`NavigationService.go(${segment}, ${selectedId}), project = ${this.projectId}`);
  	if (this.projectId == 0) {
  		return;
  	}

  	if (selectedId == 0) {
	  	this.router.navigate(['projects', this.projectId, segment]);
	} else {
	  	this.router.navigate(['projects', this.projectId, segment, selectedId]);
	}
  }
}
