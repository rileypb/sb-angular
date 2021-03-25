import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Base } from '../base';
import { Project } from '../project';
import { Epic } from '../epic';
import { ProjectService } from '../project.service';
import { callWithSnackBar } from '../util';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-epics',
  templateUrl: './epics.component.html',
  styleUrls: ['./epics.component.css']
})
export class EpicsComponent extends Base implements OnInit {

  @Input() project:Project;
  @Output() epicChanged:EventEmitter<Epic> = new EventEmitter<Epic>();
  @Output() deleteEpic:EventEmitter<Epic> = new EventEmitter<Epic>();
  @Output() newEpic:EventEmitter<Epic> = new EventEmitter<Epic>();
  @Output() updateProject:EventEmitter<Project> = new EventEmitter<Project>();
  @Output() transferIssue:EventEmitter<any> = new EventEmitter<any>();

  mode:string = "show";

  selectedEpic:Epic;

  private requestedEpicId:number;

  constructor(private projectService:ProjectService, private snackBar:MatSnackBar, private router:Router, private route:ActivatedRoute) { 
    super(); 
  }

  ngOnInit(): void {
    this.requestedEpicId = +this.route.snapshot.paramMap.get('epic_id');
    this.updateSelectedEpic();
  }

  @Input()
  set epics(val:any) {
    this._epics = val;

    this.updateSelectedEpic();
  }
  get epics():any {
    return this._epics;
  }
  private _epics:any;

  updateSelectedEpic() {
    console.log("stop here");
    let selectedEpicId:number = null;
    if (this.selectedEpic) {
      selectedEpicId = this.selectedEpic.id;
    } else if (this.requestedEpicId && this.requestedEpicId != this.selectedEpic?.id) {
      selectedEpicId = this.requestedEpicId;
    }
    if (selectedEpicId) {
      for (let epic of this._epics?.epics.list || []) {
        if (epic.id == selectedEpicId) {
          this.selectedEpic = epic;
          return;
        }
      }
    }
    this.selectedEpic = null;
  }

  showDetail(epic:Epic) {
    if (this.mode == "show") {
      this.router.navigate(['/projects', epic.project.id, 'epics', epic.id]);
      this.selectedEpic = epic;
    }
    // if (this.mode == "show") {
    //   this.selectedEpic = epic;
    // }
  }

  editEpic() {
    this.mode = "edit";
  }

  createEpic() {
    this.mode = "create";
    this.selectedEpic = { id: -1, title: '', description: '', size: 0, project: this.project };
  }

  cancelEdit() {
    if (this.mode == "create") {
      this.selectedEpic = null;
    }
    this.mode = "show";
  }

  confirmEdit(epic) {
    console.log("confirmEdit " + JSON.stringify(epic));
    this.mode = "show";
    this.epicChanged.emit(epic);
  }

  delete(epic) {
    this.mode = "show";
    this.deleteEpic.emit(epic);
  }

  saveNewEpic(epic) {
    this.selectedEpic = null;
    this.mode = "show";
    this.newEpic.emit(epic);
  }

  projectUpdated(project) {
    this.updateProject.emit(project);
  }

  onTransferIssue(transferData) {
    this.transferIssue.emit(transferData);
  }

  onUpdateEpic(epic) {
    this.epicChanged.emit(epic);
  }

  onReorderEpics(reorderData:any) {
    callWithSnackBar(this.snackBar, this.projectService.reorderEpics(this.project, reorderData.fromIndex, reorderData.toIndex),
      ["Reordering Epics...", "Epics Reordered", "Error Reordering Epics"]);
  }

}
