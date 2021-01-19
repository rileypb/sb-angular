import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sb-sprint-retrospective-top-level',
  templateUrl: './sprint-retrospective-top-level.component.html',
  styleUrls: ['./sprint-retrospective-top-level.component.css']
})
export class SprintRetrospectiveTopLevelComponent implements OnInit {

  constructor(private locationService:LocationService, private route:ActivatedRoute) { }

  ngOnInit(): void {
  	this.locationService.setTab('sprint-retrospective');
  	this.locationService.projectId = +this.route.snapshot.paramMap.get('id');
  }

}
