import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.service';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../project.service';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'sb-dashboard-top-level',
  templateUrl: './dashboard-top-level.component.html',
  styleUrls: ['./dashboard-top-level.component.css']
})
export class DashboardTopLevelComponent implements OnInit {
  project:Observable<any>;

  constructor(private locationService:LocationService, private route:ActivatedRoute, public projectService:ProjectService, public dataService:DataService) { }

  ngOnInit(): void {
  	this.locationService.setTab('dashboard');
  	this.locationService.projectId = +this.route.snapshot.paramMap.get("id");
  	// this.projectService.setProjectId(this.locationService.projectId);
  	this.dataService.load(`projects/${this.locationService.projectId}`, [`projects/${this.locationService.projectId}`]);
  	this.project = this.dataService.values[`projects/${this.locationService.projectId}`];
  }

  ngOnDestroy() {
    this.dataService.unload(`projects/${this.locationService.projectId}`, [`projects/${this.locationService.projectId}`]);
  }
}
