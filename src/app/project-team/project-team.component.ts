import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.service';
import { Base } from '../base';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-team',
  templateUrl: './project-team.component.html',
  styleUrls: ['./project-team.component.css']
})
export class ProjectTeamComponent extends Base implements OnInit {

  constructor(private locationService:LocationService, private route:ActivatedRoute) {
    super();
    locationService.breadcrumb = { path: ['Home', '...'], links: ['']};
    locationService.type = "project";
    locationService.menuItem = "project_team";
    locationService.projectId = +this.route.snapshot.paramMap.get('id');
    locationService.sprintId = null;
  }

  ngOnInit(): void {
  }

  onSyncFinish(data:any) {
    this.locationService.breadcrumb = { path: ['Home', data.name], links: ['']}
  }

  ngOnDestroy() {
  }

}
