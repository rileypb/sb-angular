import { Component, OnInit } from '@angular/core';
import { Project } from '../project';
import { ProjectService } from '../project.service';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { LoginService } from '../login.service';
import { LocationService } from '../location.service';
import { Base } from '../base';
import { DataService } from '../data.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent extends Base implements OnInit {
  projects: Observable<any>;
  displayedColumns: string[] = ['id', 'name'];

  constructor(private router: Router, private loginService:LoginService, 
              private locationService:LocationService, private dataService:DataService) {
    super();
    locationService.breadcrumb = {path:[], links: []};
    locationService.type = "home";
    locationService.menuItem = "projects";
    locationService.sprintId = null;
    locationService.projectId = null;
    locationService.setTab('projects');
  }

  ngOnInit() {
  	this.refreshList();
  }

  refreshList() {
    this.dataService.load('projects', ['projects', 'projects/*']);
    this.projects = this.dataService.values['projects'];
  }

  ngOnDestroy() {
    this.dataService.unload('projects', ['projects', 'projects/*']);
  }

  project_list(projects) {
    return projects ? projects.projects.list : [];
  }
}
