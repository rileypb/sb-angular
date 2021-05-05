import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewChildren, ElementRef, Renderer2, QueryList } from '@angular/core';
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
import { EpicsService } from '../epics.service';
import { MatSelectChange } from '@angular/material/select';
import { timer } from 'rxjs';


@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.css']
})
export class IssueDetailComponent extends Base implements OnInit {
  @ViewChild('newCriterion') newCriterion:ElementRef;

  @ViewChild('container') container:ElementRef;

  @Input() showAcceptanceCriteria:boolean;
  @Input() showCompletionCheckboxes:boolean;
  @Input() editable:boolean = true;


  @Output() editIssue:EventEmitter<Issue> = new EventEmitter<Issue>();

  public team:Observable<any>;
  public assignee:any;
  public epicId:number = -1;

  constructor(public dialog: MatDialog, private snackBar:MatSnackBar, private tasksService:TasksService, private dataService:DataService, private issuesService:IssuesService,
              private epicsService:EpicsService, private renderer:Renderer2) { 
    super(); 
  }


  ngOnInit(): void {
  }
  
  updateTeam() {
    this.dataService.load(`projects/${this.issue.project.id}/team`, []);
    this.team = this.dataService.values[`projects/${this.issue.project.id}/team`];
  }

  ngAfterViewInit() {
    this.updateSelectorStyle();
  }

  private updateSelectorStyle() {
    if (this.issue) {
      this.container.nativeElement.style.setProperty('--mat-select-value-text-color', this.fontColor(this.issue.epic?.color));
    }
  }

  @Input() set epics(value:any) {
    this._epics = value;
    this.updateSelectorStyle();
  }
  get epics():any {
    return this._epics;
  }
  private _epics:any;


  ngOnDestroy() {
    this.dataService.unload(`projects/${this.issue.project.id}/team`, []);
  }

  @Input() set issue(value:Issue) {
    this._issue = value;
    this.epicId = value.epic?.id || -1;
    if (value != null) {
      this.updateTeam();
    } else {
      this.team = null;
    }
    this.updateSelectorStyle();
  }
  get issue():Issue {
    return this._issue;
  }
  private _issue:Issue;

  fontColor(bgColor:string):string {  
    return Color.fontColor(bgColor);
  }

  adaptiveFontColor(color) {
    let fc = Color.fontColor(color);
    if (fc == '#FFFFFF') {
      return color;
    }
    return fc;
  }

  adaptiveBackgroundColor(color) {
    let fc = Color.fontColor(color);
    if (fc == '#FFFFFF') {
      return fc;
    }
    return color;
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

  onEditIssue() {
    this.editIssue.emit(this.issue);
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

  onChangeSelection(event:MatSelectChange) {
    if (event.value == -1) {
      callWithSnackBar(this.snackBar, this.epicsService.removeIssue(this.issue.epic, this.issue),
                       ['Removing issue from epic', 'Removed issue from epic', 'Error removing issue from epic']);
    }
    if (event.value != -1) {
      callWithSnackBar(this.snackBar, this.epicsService.addIssue(this.epicId, this.issue),
                       ['Adding issue to epic', 'Added issue to epic', 'Error adding issue to epic']);
    }
  }

}
