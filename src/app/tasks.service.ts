import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './task';
import { Api } from './api';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private api:Api) { }

  save(task: Task) : Observable<any> {
  	return this.api.patch(`api/tasks/${task.id}`, { task: task });
  }

  createTask(task: Task) : Observable<any> {
    return this.api.post(`api/issues/${task.issue.id}/tasks`, { task: task });
  }

  deleteTask(taskId: number) : Observable<any> {
    return this.api.delete(`api/tasks/${taskId}`);
  }

  updateState(task: Task, value:string): void {
    this.api.patch(`api/tasks/${task.id}`, { task: { id: task.id, state: value } }).subscribe();
  }

  setComplete(taskId:number, complete:boolean) {
    return this.api.patch(`api/tasks/${taskId}/set_complete`, { complete: complete });
  }

  assignTask(taskId:number, userId:number):Observable<any> {
    return this.api.patch(`api/tasks/${taskId}/assign_task`, { data: { userId: userId || -1 }});
  }
}
