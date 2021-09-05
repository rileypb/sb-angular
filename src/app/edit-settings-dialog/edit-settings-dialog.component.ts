import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ThemeService } from '../theme/theme.service';
import { IssuesService } from '../issues.service';
import { UsersService } from '../users.service';
import { ProjectService } from '../project.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { callWithSnackBar } from '../util';
import { first } from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {InputDialogComponent} from '../input-dialog/input-dialog.component';

@Component({
  selector: 'sb-edit-settings-dialog',
  templateUrl: './edit-settings-dialog.component.html',
  styleUrls: ['./edit-settings-dialog.component.css']
})
export class EditSettingsDialogComponent implements OnInit {
  @ViewChild("displayName") displayNameEditor:ElementRef;

  @Input() user:any;

  private originalDisplayName:string;

  constructor(public dialog: MatDialog, private projectService:ProjectService, private themeService:ThemeService, private usersService:UsersService, private snackBar:MatSnackBar) { }

  ngOnInit(): void {
  }
 
  changeTheme(newTheme):void {
  	this.user.theme = newTheme;
  	this.themeService.setTheme(newTheme);
  	callWithSnackBar(this.snackBar, this.usersService.save({id: this.user.id, theme: newTheme}),
  		["Saving setting...", "Setting saved", "Error saving setting"]);
  }

  startEditingDisplayName():void {
    this.originalDisplayName = this.user.displayName;
  }

  cancelEditingDisplayName():void {
    this.user.displayName = this.originalDisplayName;
  }

  onDisplayNameKeydown(event:KeyboardEvent):void {
    let chrCode:number;
    if (event.charCode)     chrCode = event.charCode;
    else if (event.which)   chrCode = event.which;
    else if (event.keyCode) chrCode = event.keyCode;
    if (chrCode == 13) {
      this.originalDisplayName = this.user.displayName;
      event.preventDefault();
      this.saveDisplayName();
      this.displayNameEditor.nativeElement.blur();
      return;
    } else if (chrCode == 27) {
      event.preventDefault();
      this.user.displayName = this.originalDisplayName;
      this.displayNameEditor.nativeElement.blur();
      return;
    }
  }

  saveDisplayName():void {
    callWithSnackBar(this.snackBar, this.usersService.save({id: this.user.id, displayName: this.user.displayName}),
      ["Saving setting...", "Setting saved", "Error saving setting"]).pipe(first()).subscribe(
        x => location.reload()
    );
  }

  onAddProjectClick():void {console.log("opening dialog")
    const dialogRef = this.dialog.open(InputDialogComponent, {
      maxWidth: "400px",
      data: {
          title: "Add Project",
          message: `Enter your project key:`
      }
    });

    // listen to response
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {

        callWithSnackBar(this.snackBar, this.projectService.joinProject(dialogResult),
          ["Joining Project...", "Project joined", "Error joining project"]).pipe(first()).subscribe(
            x => location.reload()
        );
    //     this.snackBar.open("Deleting Issue...", null, {
    //       duration: 30000,
    //     });
    //     this.issuesService.deleteIssue(this.data.issue.id).subscribe(
    //       success => {
    //         this.snackBar.open("Issue Deleted", null, {
    //           duration: 2000,
    //         });
    //       },
    //       error => {
    //         this.snackBar.open("Error Deleting Issue", null, {
    //           duration: 4000,
    //         });
    //       }
    //     );
    //     this.dialogRef.close(false);
      }    
   });
  }

}
