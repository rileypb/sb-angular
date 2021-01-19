import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Base } from '../base';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Sprint } from '../sprint';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { callWithSnackBar } from '../util';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'sb-sprint-form',
  templateUrl: './sprint-form.component.html',
  styleUrls: ['./sprint-form.component.css']
})
export class SprintFormComponent extends Base implements OnInit {

  public Editor = ClassicEditor;
  private fb:FormBuilder = new FormBuilder();
  public editSprintForm:FormGroup;

  @Input() mode:String;
  @Input() sprint:Sprint;
  @Output() confirm:EventEmitter<Sprint> = new EventEmitter<Sprint>();
  @Output() cancel:EventEmitter<Sprint> = new EventEmitter<Sprint>();
  @Output() delete:EventEmitter<Sprint> = new EventEmitter<Sprint>();


  constructor(private dialog:MatDialog, private snackBar:MatSnackBar) {
  	super();
  }

  ngOnInit(): void {
  	this.sprint = this.sprint || {id: -1, title: '', description: '', project: {id: 0, name: "foo"}};
  	this.editSprintForm = this.fb.group({
      title: new FormControl(this.sprint.title, Validators.compose([Validators.pattern(".*[^\\s]+.*"), Validators.required])),
      description: new FormControl(this.sprint.description),
  	});
  }

  confirmEdit() {
  	this.sprint.title = this.editSprintForm.controls['title'].value;
  	this.sprint.description = this.editSprintForm.controls['description'].value;
  	this.confirm.emit(this.sprint);
  }

  cancelEdit() {
  	this.cancel.emit(this.sprint);
  }

  confirmDelete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
          title: "Are you sure?",
          message: `You are about to delete sprint '${this.sprint.title}'. All issues in the sprint backlog will be moved to the product backlog.`}
    });

    // listen to response
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.deleteSprint(this.sprint);
      }      
    });
  }

  private deleteSprint(sprint: Sprint) : void {
  	this.delete.emit(sprint);
  }

}
