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
  	return this.api.patch(`api/sprints/${sprint.id}`, { sprint: sprint });
  }

  createSprint(sprint:Sprint):Observable<any> {
  	return this.api.post(`api/projects/${sprint.project.id}/sprints`, { sprint: sprint });
  }

  reorderIssues(sprint:Sprint, fromIndex:number, toIndex:number):Observable<any> {
    return this.api.patch(`api/sprints/${sprint.id}/reorder_issues`, { data: { fromIndex: fromIndex, toIndex: toIndex }})
  }

  addIssue(sprintId:number, issue:Issue):Observable<any> {
    return this.api.patch(`api/sprints/${sprintId}/add_issue`, { issue: { issue_id: issue.id }})
  }

  removeIssue(sprint:Sprint, issue:Issue):Observable<any> {
    return this.api.patch(`api/sprints/${sprint.id}/remove_issue`, { issue: { id: issue.id }})
  }

  startSprint(startData:any):Observable<any> {
    return this.api.post(`api/sprints/${startData.sprint.id}/start`, { data: { startDate: startData.sprint.start_date, endDate: startData.sprint.end_date, reset: startData.reset }});
  }

  suspendSprint(sprint:Sprint):Observable<any> {
    return this.api.post(`api/sprints/${sprint.id}/suspend`, {});
  }

  finishSprint(sprint:Sprint):Observable<any> {
    return this.api.post(`api/sprints/${sprint.id}/finish`, {});
  }
}
