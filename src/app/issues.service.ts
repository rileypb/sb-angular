import { Injectable } from '@angular/core';
import { Api } from './api';
import { Project } from './project';
import { Sprint } from './sprint';
import { Issue } from './issue';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {

  constructor(private api:Api) { }

  reorder(projectId: number, sprintId: number | null, order: string) : void {
    if (!sprintId) {
  	  this.api.patch('api/projects/' + projectId , { project: { order: order }}).subscribe();
  	} else {
  	  this.api.patch('api/projects/' + projectId + '/sprints/' + sprintId, { sprint: { order: order }}).subscribe();
  	}
  }

  // transfer(projectId1 : number, sprintId1 : number, order1 : string, projectId2: number, sprintId2: number, order2: string) : void {
  //   console.log(`transfer ${projectId1}/${sprintId1} -> ${order1}, ${projectId2}/${sprintId2} -> ${order2}`);
  //   this.http.patch('api/transfer_issues', { transfer: { projectId1: projectId1, sprintId1: sprintId1, order1: order1,
  //                                            projectId2: projectId2, sprintId2: sprintId2, order2: order2 } }).subscribe();
  // }

  transfer(transfer_data) {
    return this.api.patch('api/transfer_issues', { transfer: transfer_data })
  }

  save(issue: Issue) : Observable<any> {
  	return this.api.patch(`api/issues/${issue.id}`, { issue: issue });
  }

  createIssue(issue: Issue) : Observable<any> {
    return this.api.post(`api/projects/${issue.project.id}/issues`, { issue: issue });
  }

  deleteIssue(issueId: number) : Observable<any> {
    return this.api.delete(`api/issues/${issueId}`);
  }

  updateState(issue: Issue, value:string): Observable<any> {
    return this.api.patch(`api/issues/${issue.id}`, { issue: { id: issue.id, state: value } });
  }

  reorderTasks(issue:Issue, fromIndex:number, toIndex:number): Observable<any> {
    return this.api.patch(`api/issues/${issue.id}/reorder_tasks`, { data: { fromIndex: fromIndex, toIndex: toIndex }});
  }

  assignIssue(issueId, userId):Observable<any> {
    return this.api.patch(`api/issues/${issueId}/assign_issue`, { data: { userId: userId || -1 }});
  }

  markCompleted(issueId:number):Observable<any> {
    return this.api.patch(`api/issues/${issueId}/mark_complete`);
  }

  moveToBacklog(issueId:number):Observable<any> {
    return this.api.patch(`api/issues/${issueId}/move_to_backlog`);
  }
}
