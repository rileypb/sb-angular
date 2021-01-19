import { Injectable } from '@angular/core';
import { Breadcrumb } from './breadcrumb';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, Subject, ReplaySubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  breadcrumb:Breadcrumb = {path:[], links:[]};

  type:string;

  menuItem: string = "projects";

  private _projectId:number;
  sprintId:number;
  issueId:number;

  public tab:string = 'projects';

  public navLinks:any[];

  constructor(private router:Router) { 
    this.navLinks = [
      {
        label: 'Projects',
        link: '/projects',
        icon: 'fa-shapes',
        active: false,
        disabled: false,
        tab: 'projects'
      },
      {
        label: 'Dashboard',
        link: this.project_dashboard(),
        icon: 'fa-tachometer-alt',
        active: false,
        disabled: true,
        tab: 'dashboard'
      },
      {
        label: 'Epics',
        link: this.project_epics(),
        icon: 'fa-scroll',
        active: false,
        disabled: true,
        tab: 'epics'
      },
      {
        label: 'Product Backlog',
        link: `/projects/${this.projectId}/backlog`,
        icon: 'fa-list-alt',
        active: false,
        disabled: true,
        tab: 'product-backlog'  
      },
      {
        label: 'Sprint Planning',
        link: `/projects/${this.projectId}/planning`,
        icon: 'fa-drafting-compass',
        active: false,
        disabled: true,
        tab: 'sprint-planning'  
      },
      {
        label: 'Sprint Execution',
        link: `/projects/${this.projectId}/execution`,
        icon: 'fa-hard-hat',
        active: false,
        disabled: true,
        tab: 'sprint-execution'
      },
      {
        label: 'Sprint Retrospective',
        link: `/projects/${this.projectId}/retrospective`,
        icon: 'fa-hourglass-end',
        active: false,
        disabled: true,
        tab: 'sprint-retrospective'  
      },
    ];
    this.router.events.subscribe((res) => {
      if (res instanceof NavigationEnd) {
        this.rebuildNavLinks();
      }
    });
    this.rebuildNavLinks();
  }

  setTab(tabName:string):void {
    this.tab = tabName;
  }

  projects():string {
  	return '/projects';
  }
 
  profile():string {
  	return '/projects/profile'
  }

  settings():string {
  	return '/projects/settings';
  }

  project_dashboard():string {
    return `/projects/${this.projectId}/dashboard`;
  }

  project_info():string {
  	return `/projects/${this.projectId}/backlog`;
  }

  project_team():string {
  	return `/projects/${this.projectId}/team`;
  }

  project_epics():string {
    return `/projects/${this.projectId}/epics`;
  }

  project_issues():string {
  	return `/projects/${this.projectId}/foo`;
  }

  project_sprints():string {
  	return `/projects/${this.projectId}/sprints`;
  }

  issue_detail():string {
    return `/projects/${this.projectId}/issues`;
  }

  sprint_issues():string {
    return `/projects/${this.projectId}/sprints/${this.sprintId}`;
  }

  sprint_info():string {
    return `/projects/${this.projectId}/sprints/${this.sprintId}/info`;
  }

  sprint_analytics():string {
    return `/projects/${this.projectId}/sprints/${this.sprintId}/analytics`;
  }


  get projectId():number {
    return this._projectId;
  }

  set projectId(newId:number) {
    this._projectId = newId;
    this.rebuildNavLinks();
  }

  rebuildNavLinks():void {
    this.navLinks[0].active = (this.tab == 'projects');
    if (this.projectId) {
      this.navLinks[1].link = this.project_dashboard();
      this.navLinks[2].link = this.project_epics();
      this.navLinks[3].link = `/projects/${this.projectId}/backlog`;
      this.navLinks[4].link = `/projects/${this.projectId}/planning`;
      this.navLinks[5].link = `/projects/${this.projectId}/execution`;
      this.navLinks[6].link = `/projects/${this.projectId}/retrospective`;
      for (let i = 1; i < this.navLinks.length; i++) {
        this.navLinks[i].disabled = false;
        this.navLinks[i].active = (this.tab == this.navLinks[i].tab);
      }
    } else {
      for (let i = 1; i < this.navLinks.length; i++) {
        // this.navLinks[i].disabled = true;
        // this.navLinks[i].active = false;
      }
    }

  }
}
