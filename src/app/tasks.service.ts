import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './task';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  save(task: Task) : Observable<any> {
  	return this.http.patch(`api/tasks/${task.id}`, { task: task });
  }

  createTask(task: Task) : Observable<any> {
    return this.http.post(`api/issues/${task.issue.id}/tasks`, { task: task });
  }

  deleteTask(taskId: number) : Observable<any> {
    return this.http.delete(`api/tasks/${taskId}`);
  }

  updateState(task: Task, value:string): void {
    this.http.patch(`api/tasks/${task.id}`, { task: { id: task.id, state: value } }).subscribe();
  }

  setComplete(taskId:number, complete:boolean) {
    return this.http.patch(`api/tasks/${taskId}/set_complete`, { complete: complete });
  }
}
