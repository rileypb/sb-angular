import { Project } from './project';
import { Sprint } from './sprint';
import { Epic } from './epic';
import { User } from './user';

export interface Issue {
	id: number;
	title?: string;
	description?: string;
	estimate?: number;
	state?: string; 
	project?: Project;
	sprint?: Sprint;
	epic?: Epic;
	tasks?: any;
	assignee?:User;
	add_to_epic?: any;
	completed?:boolean;
}
