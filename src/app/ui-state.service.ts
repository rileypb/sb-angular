import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiStateService {

  private expanded:any = {};
  selectedIssue:any = {};

  constructor() { }

  isExpanded(object:string) {
  	return this.expanded[object];
  }

  setExpanded(object:string, value) {
  	this.expanded[object] = value;
  }

  toggleExpand(object:string) {
    console.log("here");
    this.setExpanded(object, !this.isExpanded(object));
  }

}
