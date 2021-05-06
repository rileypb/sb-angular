import { Injectable } from '@angular/core';
import { Api } from './api';
import { Project } from './project';
import { Epic } from './epic';
import { Observable } from 'rxjs';
import { Issue } from './issue';

@Injectable({
  providedIn: 'root'
})
export class EpicsService {

  constructor(private api:Api) { }


  reorder(projectId: number, order: string) : void {
  	this.api.patch('api/projects/' + projectId , { project: { epic_order: order }}).subscribe();
  }


  save(epic: Epic) : Observable<any> {
  	return this.api.patch(`api/epics/${epic.id}`, { epic: {
      id: epic.id,
      project_id: epic.project.id,
      title: epic.title,
      description: epic.description,
      size: epic.size,
      color: epic.color
    } });
  }

  createEpic(epic: Epic) : Observable<any> {
    return this.api.post(`api/projects/${epic.project.id}/epics`, { epic: epic });
  }

  deleteEpic(epicId: number) : Observable<any> {
    return this.api.delete(`api/epics/${epicId}`);
  }

  removeIssue(epic:Epic, issue:Issue):Observable<any> {
    return this.api.patch(`api/epics/${epic.id}/remove_issue`, { issue: { id: issue.id }})
  }

  reorderIssues(epic:Epic, fromIndex:number, toIndex:number):Observable<any> {
    return this.api.patch(`api/epics/${epic.id}/reorder_issues`, { data: { fromIndex: fromIndex, toIndex: toIndex }})
  }

  addIssue(epicId:number, issue:Issue, index:number = -1) {
    return this.api.patch(`api/epics/${epicId}/add_issue`, { data: { issue_id: issue.id, index: index } });
  }
}
