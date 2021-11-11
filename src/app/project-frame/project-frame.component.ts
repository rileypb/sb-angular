import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../project';
import { Base } from '../base';
import { ProjectService } from '../project.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { callWithSnackBar } from '../util';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-project-frame',
  templateUrl: './project-frame.component.html',
  styleUrls: ['./project-frame.component.css']
})
export class ProjectFrameComponent extends Base implements OnInit {
  @Input() project:Project;
  @Input() showEditButton:boolean = false;
  @Input() showSettingsButton:boolean = true;

  public mode:string = "showingContent";

  constructor(private projectService:ProjectService, private snackBar:MatSnackBar,
      public navigationService:NavigationService) {
  	super();
  }

  ngOnInit(): void {

  }

  editProject() {
    this.mode = "editingProject";
  }

  showTeam() {
    this.mode = "showingTeam";
  }

  showContent() {
    this.mode = "showingContent";
  }

  editSettings() {
    if (this.mode != "editingSettings") {
      this.mode = "editingSettings";
    } else {
      this.showContent();
    }
  }

  saveSettings() {
    callWithSnackBar(this.snackBar,
                     this.projectService.updateProject(
                       { id: this.project.id, picture: this.project.picture, 
                         setting_auto_close_issues: this.project.setting_auto_close_issues, 
                         setting_use_acceptance_criteria: this.project.setting_use_acceptance_criteria, 
                         hidden: this.project.hidden
                       }),
                     ["Saving settings...", "Settings saved", "Error saving settings"]);
  }

}
