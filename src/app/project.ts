import { User } from './user';

export interface Project {
	id: number;
	name?: string;
	owner?: User | null;
	activities?: any[];
	epic_order?: string;
	current_sprint_id?: number;
	team?:any;
	picture?:string;
	setting_auto_close_issues?:boolean;
	setting_use_acceptance_criteria?:boolean;
	allow_issue_completion_without_sprint?:boolean;
	hidden?:boolean;
}