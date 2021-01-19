import { Project } from './project';
import { Sprint } from './sprint';
import { Epic } from './epic';

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
}
