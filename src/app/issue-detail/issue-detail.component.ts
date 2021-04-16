import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Base } from '../base';
import { Project } from '../project';
import { Issue } from '../issue';
import { Color } from '../color';
import { Task } from '../task';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { callWithSnackBar } from '../util';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';
import { TasksService } from '../tasks.service';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { User } from '../user';
import { IssuesService } from '../issues.service';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.css']
})
export class IssueDetailComponent extends Base implements OnInit {
  @ViewChild('newCriterion') newCriterion:ElementRef;

  @Input() showAcceptanceCriteria:boolean;
  @Input() showCompletionCheckboxes:boolean;
  @Input() editable:boolean = true;

  public team:Observable<any>;
  public assignee:any;

  constructor(public dialog: MatDialog, private snackBar:MatSnackBar, private tasksService:TasksService, private dataService:DataService, private issuesService:IssuesService) { 
    super(); 
  }


  ngOnInit(): void {
    //this.dataService.load(`projects/${this.issue.project.id}/team`, []);
    //this.team = this.dataService.values[`projects/${this.issue.project.id}/team`];
  }
  
  updateTeam() {
    this.dataService.load(`projects/${this.issue.project.id}/team`, []);
    this.team = this.dataService.values[`projects/${this.issue.project.id}/team`];
  }


  ngOnDestroy() {
    this.dataService.unload(`projects/${this.issue.project.id}/team`, []);
  }

  @Input() set issue(value:Issue) {
    this._issue = value;
    this.assignee = this.issue.assignee || "-1";
    if (value != null) {
      this.updateTeam();
    } else {
      this.team = null;
    }
  }
  get issue():Issue {
    return this._issue;
  }
  private _issue:Issue;

  fontColor(bgColor:string):string {  
    return Color.fontColor(bgColor);
  }

  assignIssue(user:User) {
    callWithSnackBar(this.snackBar,
                     this.issuesService.assignIssue(this.issue.id, user?.id),
                     ["Assigning issue...", "Assigned issue", "Error assigning issue"]);
  }

  createTask() {
    console.log("CREATETASK");
    let data:Task = {id: -1, title:'', description: '', estimate: 0, issue: {id: this.issue.id}};
    const dialogRef:MatDialogRef<EditTaskDialogComponent, any> = this.dialog.open(EditTaskDialogComponent, {
      width: '90%',
      data: data,
      disableClose: true
    });
    dialogRef.componentInstance.newTaskMode = true;

    dialogRef.afterClosed().subscribe(result => {
     if (result) {
       this.create(data);
     }
    });
  }

  createAC(criterion:string) {
    console.log("create criterion" + criterion);

    callWithSnackBar(this.snackBar, 
                     this.issuesService.createAcceptanceCriterion(this.issue.id, criterion),
                     ['Creating acceptance criterion...', 'Acceptance criterion created', 'Error creating acceptance criterion']);

    this.newCriterion.nativeElement.value = '';
    this.newCriterion.nativeElement.blur();
  }

  deleteAC(criterion) {
    callWithSnackBar(this.snackBar, 
                     this.issuesService.deleteAcceptanceCriterion(this.issue.id, criterion.id),
                     ['Deleting acceptance criterion...', 'Acceptance criterion deleted', 'Error deleting acceptance criterion']);
  }

  private create(task) {
    callWithSnackBar(this.snackBar, this.tasksService.createTask(task),
                     ['Creating task...', 'Created task', 'Error creating task']);
  }

}
