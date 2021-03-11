import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../project';
import { Base } from '../base';
import { Sprint } from '../sprint';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { IssuesService } from '../issues.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { callWithSnackBar } from '../util';
import { DataService } from '../data.service';
import { SprintsService } from '../sprints.service';
import { Issue } from '../issue';

function isSprint(obj: Project | Sprint): obj is Sprint {
	return 'title' in obj;
}

@Component({
  selector: 'sb-sprint-planning',
  templateUrl: './sprint-planning.component.html',
  styleUrls: ['./sprint-planning.component.css']
})
export class SprintPlanningComponent extends Base implements OnInit {

  @Input() project:Project;

  mode:String = "backlog";
  selectedIssue:Issue;

  private sprintUnderEdit:Sprint = null;

  constructor(private issuesService:IssuesService, private snackBar:MatSnackBar, private dataService:DataService, private sprintsService:SprintsService) {
    super(); 
  }

  ngOnInit(): void {
  }

  onTransfer(transferData) {
    console.log("sprint-planning onTransfer");
  	let fromContainer:(Project | Sprint) = transferData.from.data.container;
  	let toContainer:(Project | Sprint) = transferData.to.data.container; 

    transferArrayItem(transferData.from.data.issues, transferData.to.data.issues, transferData.fromIndex, transferData.toIndex);

    if (!isSprint(fromContainer)) {
      this.dataService.update(`projects/${fromContainer.id}/issues`, { issues: { list: transferData.from.data.issues }});
    }

    let fromSprint:any = isSprint(fromContainer) ? fromContainer : {id:null};
    let fromProject:any = !isSprint(fromContainer) ? fromContainer : {id:null};
    let toSprint:any = isSprint(toContainer) ? toContainer : {id:null};
    let toProject:any = !isSprint(toContainer) ? toContainer : {id:null};

    callWithSnackBar(this.snackBar, this.issuesService.transfer({sprintId1: fromSprint.id, projectId1: fromProject.id, 
    				 sprintId2: toSprint.id, projectId2: toProject.id, fromIndex: transferData.fromIndex, toIndex: transferData.toIndex}),
    				 ["Moving issue...", "Issue moved", "Error moving issue"]);
  }

  onSprintSelected(sprint:Sprint) {
    if (this.mode == 'backlog' || this.mode == 'viewIssue') {
      this.mode = "edit";
      this.sprintUnderEdit = sprint;
    }
  }

  newSprint() {
    if (this.mode == 'backlog' || this.mode == 'viewIssue') {
      this.mode = "create";
    }
  }

  onConfirmEdit(sprint:Sprint) {
    this.mode = 'backlog';
    callWithSnackBar(this.snackBar, this.sprintsService.save(sprint),
                     ['Saving sprint...', 'Sprint saved', 'Error saving sprint']);
  }

  onConfirmCreate(sprint:Sprint) {
    this.mode = 'backlog';
    sprint.project = this.project;
    callWithSnackBar(this.snackBar, this.sprintsService.createSprint(sprint),
                     ['Creating sprint...', 'Sprint created', 'Error creating sprint']);
  }

  onDeleteSprint(sprint:Sprint) {
    this.mode = 'backlog';
    callWithSnackBar(this.snackBar, this.sprintsService.deleteSprint(sprint),
                     ['Deleting sprint...', 'Sprint deleted', 'Error deleting sprint']);
  }

  onStart(sprint:Sprint) {
    callWithSnackBar(this.snackBar, this.sprintsService.startSprint(sprint),
                     ['Starting sprint...', 'Sprint started', 'Error starting sprint']);
  }

  onIssueSelected(issue:Issue) {
    if (this.mode == 'backlog' || this.mode == 'viewIssue') {
      this.mode = 'viewIssue';
      this.selectedIssue = issue;
    }
  }
}
