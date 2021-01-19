import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.service';
import { Base } from '../base';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent extends Base implements OnInit {

  constructor(private locationService:LocationService, private route:ActivatedRoute) {
    super();
    locationService.breadcrumb = { path: [], links: [] };
    locationService.type = "home";
    locationService.menuItem = "settings";
    locationService.projectId = null;
    locationService.sprintId = null;
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
  }

}
