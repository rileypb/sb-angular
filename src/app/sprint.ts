import { Project } from './project';

export interface Sprint {
	id:number;
	title:string;
	description:string;
	project: Project;
	burndownData?: any;
	goal?: string;
	start_date?:Date;
	end_date?:Date;
	started?:boolean;
	completed?:boolean;
	retrospective?:string;
}
