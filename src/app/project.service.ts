import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, ReplaySubject } from 'rxjs';

import { Project } from './project';

@Injectable()
export class ProjectService {


  constructor(private http: HttpClient) { 
  }

  refresh() {
  	return this.http.get('api/projects');
  }

  getProject(id: number) {
  	return this.http.get('api/projects/' + id);
  }

  getProjectIssues(id: number) {
  	return this.http.get('api/projects/' + id + '/issues');
  }

  updateProject(project:Project) {
    console.log("updateProject");
    return this.http.patch(`api/projects/${project.id}`, {project: project});
  }

  reorderEpics(project:Project, fromIndex:number, toIndex:number) {
    return this.http.patch(`api/projects/${project.id}/reorder_epics`, { data: { fromIndex: fromIndex, toIndex: toIndex }});
  }

  reorderIssues(project:Project, fromIndex:number, toIndex:number) {
    return this.http.patch(`api/projects/${project.id}/reorder_issues`, { data: { fromIndex: fromIndex, toIndex: toIndex }});
  } 
}
