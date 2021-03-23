import { Issue } from './issue';

export interface Task {
  id:number;
  title?:string;
  description?:string;
  estimate?:number;
  issue?:Issue;
  state?:string;
  completed_at?:string
}
