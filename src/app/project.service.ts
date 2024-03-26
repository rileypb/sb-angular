import { Injectable } from '@angular/core';
import { Api } from './api';
import { Observable, Subject, ReplaySubject } from 'rxjs';

import { Project } from './project';
import { User } from './user';

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

  createProject(project:Project):Observable<any> {
    return this.api.post('api/projects', { project: project });
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

  joinProject(projectKey:string):Observable<any> {
    return this.api.post(`api/projects/join`, { data: { projectKey: projectKey }})
  }

  addMember(project:Project, userEmail:string):Observable<any> {
    return this.api.post(`api/projects/${project.id}/add_member`, { data: { email: userEmail }});
  }

  removeMember(projectId:number, userId:number):Observable<any> {
    return this.api.post(`api/projects/${projectId}/remove_member`, { data: { userId: userId }});
  }
}
