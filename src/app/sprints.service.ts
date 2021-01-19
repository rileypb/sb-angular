import { Injectable } from '@angular/core';
import { Sprint } from './sprint';
import { Issue } from './issue';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SprintsService {

  constructor(private http: HttpClient) { }

  deleteSprint(sprint:Sprint):Observable<any> {
    return this.http.delete(`api/projects/${sprint.project.id}/sprints/${sprint.id}`, {});
  }

  save(sprint:Sprint):Observable<any> {
  	return this.http.patch(`api/projects/${sprint.project.id}/sprints/${sprint.id}`, { sprint: sprint });
  }

  createSprint(sprint:Sprint):Observable<any> {
  	return this.http.post(`api/projects/${sprint.project.id}/sprints`, { sprint: sprint });
  }

  reorderIssues(sprint:Sprint, fromIndex:number, toIndex:number):Observable<any> {
    return this.http.patch(`api/sprints/${sprint.id}/reorder_issues`, { data: { fromIndex: fromIndex, toIndex: toIndex }})
  }

  removeIssue(sprint:Sprint, issue:Issue):Observable<any> {
    return this.http.patch(`api/sprints/${sprint.id}/remove_issue`, { issue: { id: issue.id }})
  }

  startSprint(sprint:Sprint):Observable<any> {
    return this.http.post(`api/sprints/${sprint.id}/start`, {});
  }

  suspendSprint(sprint:Sprint):Observable<any> {
    return this.http.post(`api/sprints/${sprint.id}/suspend`, {});
  }
}
