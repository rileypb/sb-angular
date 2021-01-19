import { Project } from './project';
import { Issue } from './issue';

export interface Epic {
	id:number;
	title:string;
	description:string;
	size:number;
	color?:string;

	project: Project;
	issues?: Issue[];
	issue_order?: string;
}
