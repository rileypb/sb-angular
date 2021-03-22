import { Injectable } from '@angular/core';
import { Api } from './api';
import { Observable, Subject, ReplaySubject } from 'rxjs';

import { Project } from './project';

@Injectable()
export class ProjectService {


  constructor(private api:Api) { 
  }

  refresh() {
  	return this.api.get('api/projects');
  }

  getProject(id: number) {
  	return this.api.get('api/projects/' + id);
  }

  getProjectIssues(id: number) {
  	return this.api.get('api/projects/' + id + '/issues');
  }

  updateProject(project:Project):Observable<any> {
    console.log("updateProject");
    return this.api.patch(`api/projects/${project.id}`, {project: project});
  }

  reorderEpics(project:Project, fromIndex:number, toIndex:number) {
    return this.api.patch(`api/projects/${project.id}/reorder_epics`, { data: { fromIndex: fromIndex, toIndex: toIndex }});
  }

  reorderIssues(project:Project, fromIndex:number, toIndex:number) {
    return this.api.patch(`api/projects/${project.id}/reorder_issues`, { data: { fromIndex: fromIndex, toIndex: toIndex }});
  } 
}
