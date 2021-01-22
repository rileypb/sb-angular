import { Injectable } from '@angular/core';
import { Sprint } from './sprint';
import { Issue } from './issue';
import { Api } from './api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SprintsService {

  constructor(private api:Api) { }

  deleteSprint(sprint:Sprint):Observable<any> {
    return this.api.delete(`api/projects/${sprint.project.id}/sprints/${sprint.id}`);
  }

  save(sprint:Sprint):Observable<any> {
  	return this.api.patch(`api/projects/${sprint.project.id}/sprints/${sprint.id}`, { sprint: sprint });
  }

  createSprint(sprint:Sprint):Observable<any> {
  	return this.api.post(`api/projects/${sprint.project.id}/sprints`, { sprint: sprint });
  }

  reorderIssues(sprint:Sprint, fromIndex:number, toIndex:number):Observable<any> {
    return this.api.patch(`api/sprints/${sprint.id}/reorder_issues`, { data: { fromIndex: fromIndex, toIndex: toIndex }})
  }

  removeIssue(sprint:Sprint, issue:Issue):Observable<any> {
    return this.api.patch(`api/sprints/${sprint.id}/remove_issue`, { issue: { id: issue.id }})
  }

  startSprint(sprint:Sprint):Observable<any> {
    return this.api.post(`api/sprints/${sprint.id}/start`, {});
  }

  suspendSprint(sprint:Sprint):Observable<any> {
    return this.api.post(`api/sprints/${sprint.id}/suspend`, {});
  }
}
