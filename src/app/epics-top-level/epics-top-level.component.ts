import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.service';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../project.service';
import { EpicsService } from '../epics.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IssuesService } from '../issues.service';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'sb-epics-top-level',
  templateUrl: './epics-top-level.component.html',
  styleUrls: ['./epics-top-level.component.css']
})
export class EpicsTopLevelComponent implements OnInit {
  project:Observable<any>;
  epics:Observable<any>;

  constructor(private locationService:LocationService, private route:ActivatedRoute, public projectService:ProjectService, 
    private epicsService:EpicsService, private _snackBar : MatSnackBar, private issuesService:IssuesService, public dataService:DataService) { }

  ngOnInit(): void {
  	this.locationService.setTab('epics');
  	this.locationService.projectId = +this.route.snapshot.paramMap.get("id");
  	// this.projectService.setProjectId(this.locationService.projectId);
    this.dataService.load(`projects/${this.locationService.projectId}`, [`projects/${this.locationService.projectId}`]);
    this.project = this.dataService.values[`projects/${this.locationService.projectId}`];
    this.dataService.load(`projects/${this.locationService.projectId}/epics`, [`projects/${this.locationService.projectId}/epics`]);
    this.epics = this.dataService.values[`projects/${this.locationService.projectId}/epics`];
  }

  saveEpic(epic) {
  	console.log("saveEpic ");
  	this._snackBar.open("Saving Epic...", null, {
  		duration: 30000,
  	});

  	this.epicsService.save(epic).subscribe(
  		success => {
  			this._snackBar.open("Epic Saved", null, {
  				duration: 2000,
  			});
  		},
  		error => {
  			this._snackBar.open("Error Saving Epic", null, {
  				duration: 4000,
  			});
  		}
  	);
  }

  deleteEpic(epic) {
    this._snackBar.open("Deleting epic...", null, {
      duration: 30000,
    })
    this.epicsService.deleteEpic(epic.id).subscribe(
      success => {
        this._snackBar.open("Epic Deleted", null, {
          duration: 2000,
        });
      },
      error => {
        this._snackBar.open("Error Deleting Epic", null, {
          duration: 4000,
        });
      }
    );
  }

  createNewEpic(epic) {
    this._snackBar.open("Creating epic...", null, {
      duration: 30000,
    })
    this.epicsService.createEpic(epic).subscribe(
      success => {
        this._snackBar.open("Epic Created", null, {
          duration: 2000,
        });
      },
      error => {
        this._snackBar.open("Error Creating Epic", null, {
          duration: 4000,
        });
      }
    );
  }

  updateProject(project) {

    this._snackBar.open("Updating project...", null, {
      duration: 30000,
    })
    
    this.projectService.updateProject(project).subscribe(
      success => {
        this._snackBar.open("Project Updated", null, {
          duration: 2000,
        });
      },
      error => {
        this._snackBar.open("Error Updating Project", null, {
          duration: 4000,
        });
      }
    );
  }

  onTransferIssue(transferData) {
    console.log(`onTransferIssue ${JSON.stringify(transferData)}`);
    this.issuesService.transfer(transferData).subscribe();
  }

  ngOnDestroy() {
    this.dataService.unload(`projects/${this.locationService.projectId}`, [`projects/${this.locationService.projectId}`]);
    this.dataService.unload(`projects/${this.locationService.projectId}/epics`, [`projects/${this.locationService.projectId}/epics`]);
  }
}
