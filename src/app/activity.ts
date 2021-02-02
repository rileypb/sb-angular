import { Project } from './project';
import { Issue } from './issue';
import { Task } from './task';
import { Epic } from './epic';
import { User } from './user';
import { Sprint } from './sprint';

export interface Activity {
  id:number;
  user:User;
  project?:Project;
  issue?:Issue;
  task?:Task;
  epic?:Epic;
  epic2?:Epic;
  action:string;
  modifier?:string;
  sprint?:Sprint;
  sprint2?:Sprint;
  project_context:Project;
}
