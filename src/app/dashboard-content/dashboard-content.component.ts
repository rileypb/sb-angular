import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../project';
import { Base } from '../base';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { User } from '../user';	
import { AddMemberDialogComponent } from '../add-member-dialog/add-member-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { callWithSnackBar } from '../util';
import { ProjectService } from '../project.service';

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
    const dialogRef:MatDialogRef<AddMemberDialogComponent, any> = this.dialog.open(AddMemberDialogComponent, {
      width: '90%',
      data: data,
      disableClose: true
    });
    //dialogRef.componentInstance.newTaskMode = true;

    dialogRef.afterClosed().subscribe(result => {
     if (result) {
       this.doAddMember(data);
     }
    });
  }

  private doAddMember(memberData:User) {
  	callWithSnackBar(this.snackBar,
  					 this.projectService.addMember(this.project, memberData),
  					 ['Adding member...', 'Member added', 'Error adding member']);
  }
}
