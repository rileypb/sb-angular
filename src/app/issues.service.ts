import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from './project';
import { Sprint } from './sprint';
import { Issue } from './issue';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {

  constructor(private http: HttpClient) { }

  reorder(projectId: number, sprintId: number | null, order: string) : void {
    if (!sprintId) {
  	  this.http.patch('api/projects/' + projectId , { project: { order: order }}).subscribe();
  	} else {
  	  this.http.patch('api/projects/' + projectId + '/sprints/' + sprintId, { sprint: { order: order }}).subscribe();
  	}
  }

  // transfer(projectId1 : number, sprintId1 : number, order1 : string, projectId2: number, sprintId2: number, order2: string) : void {
  //   console.log(`transfer ${projectId1}/${sprintId1} -> ${order1}, ${projectId2}/${sprintId2} -> ${order2}`);
  //   this.http.patch('api/transfer_issues', { transfer: { projectId1: projectId1, sprintId1: sprintId1, order1: order1,
  //                                            projectId2: projectId2, sprintId2: sprintId2, order2: order2 } }).subscribe();
  // }

  transfer(transfer_data) {
    return this.http.patch('api/transfer_issues', { transfer: transfer_data })
  }

  save(issue: Issue) : Observable<any> {
  	return this.http.patch(`api/issues/${issue.id}`, { issue: issue });
  }

  createIssue(issue: Issue) : Observable<any> {
    return this.http.post(`api/projects/${issue.project.id}/issues`, { issue: issue });
  }

  deleteIssue(issueId: number) : Observable<any> {
    return this.http.delete(`api/issues/${issueId}`);
  }

  updateState(issue: Issue, value:string): Observable<any> {
    return this.http.patch(`api/issues/${issue.id}`, { issue: { id: issue.id, state: value } });
  }

  reorderTasks(issue:Issue, fromIndex:number, toIndex:number): Observable<any> {
    return this.http.patch(`api/issues/${issue.id}/reorder_tasks`, { data: { fromIndex: fromIndex, toIndex: toIndex }});
  }
}
