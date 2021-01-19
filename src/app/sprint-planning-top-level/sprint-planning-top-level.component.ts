import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'sb-sprint-planning-top-level',
  templateUrl: './sprint-planning-top-level.component.html',
  styleUrls: ['./sprint-planning-top-level.component.css']
})
export class SprintPlanningTopLevelComponent implements OnInit {
  project:Observable<any>;

  constructor(private locationService:LocationService, private route:ActivatedRoute, private dataService:DataService) { }

  ngOnInit(): void {
  	this.locationService.setTab('sprint-planning');
  	this.locationService.projectId = +this.route.snapshot.paramMap.get('id');

    this.dataService.load(`projects/${this.locationService.projectId}`, [`projects/${this.locationService.projectId}`]);
    this.project = this.dataService.values[`projects/${this.locationService.projectId}`];
  }

  ngOnDestroy() {
    this.dataService.unload(`projects/${this.locationService.projectId}`, [`projects/${this.locationService.projectId}`]);
  }

}
