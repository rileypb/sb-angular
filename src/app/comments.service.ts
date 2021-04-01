import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from './api';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private api:Api) { }

  newComment(args:any):Observable<any> {
  	console.log(`newComment ${JSON.stringify(args)}`);
  	if (args.projectId) {
  		return this.api.post(`api/projects/${args.projectId}/comments`, { comment: { text: args.text }});
  	} else if (args.epicId) {
  		return this.api.post(`api/epics/${args.epicId}/comments`, { comment: { text: args.text }});
  	} else if (args.issueId) {
  		return this.api.post(`api/issues/${args.issueId}/comments`, { comment: { text: args.text }});
  	}
  	return null;
  }
}
