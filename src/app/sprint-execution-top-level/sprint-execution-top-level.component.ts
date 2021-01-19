import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'sb-sprint-execution-top-level',
  templateUrl: './sprint-execution-top-level.component.html',
  styleUrls: ['./sprint-execution-top-level.component.css']
})
export class SprintExecutionTopLevelComponent implements OnInit {
  project:Observable<any>;

  constructor(private locationService:LocationService, private route:ActivatedRoute, private dataService:DataService) { }

  ngOnInit(): void {
  	this.locationService.setTab('sprint-execution');
  	this.locationService.projectId = +this.route.snapshot.paramMap.get('id');

    this.dataService.load(`projects/${this.locationService.projectId}`, [`projects/${this.locationService.projectId}`]);
    this.project = this.dataService.values[`projects/${this.locationService.projectId}`];
  }

  ngOnDestroy() {
    this.dataService.unload(`projects/${this.locationService.projectId}`, [`projects/${this.locationService.projectId}`]);
  }
}
