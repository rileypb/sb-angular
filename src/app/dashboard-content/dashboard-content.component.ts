import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../project';
import { Base } from '../base';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { User } from '../user';	
import { AddMemberDialogComponent } from '../add-member-dialog/add-member-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { callWithSnackBar } from '../util';
import { ProjectService } from '../project.service';
import {InputDialogComponent} from '../input-dialog/input-dialog.component';

@Component({
  selector: 'sb-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.css']
})
export class DashboardContentComponent extends Base implements OnInit {
  @Input() project:Project;

  constructor(public dialog: MatDialog, private snackBar:MatSnackBar, private projectService:ProjectService) {
  	super();
  }

  ngOnInit(): void {
  }

  addMember(): void {
    console.log("addMember");
    let data:User = { id: -1 };
    const dialogRef:MatDialogRef<InputDialogComponent, any> = this.dialog.open(InputDialogComponent, {
      maxWidth: '400px',
      data: {
        title: "Add Project Member",
        message: 'Enter member email:'
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.doAddMember(dialogResult);
    });
  }

  private doAddMember(userEmail:string) {
  	callWithSnackBar(this.snackBar,
  					 this.projectService.addMember(this.project, userEmail),
  					 ['Adding member...', 'Member added', 'Error adding member']);
  }
}
