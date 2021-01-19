import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Epic } from '../epic';
import { Base } from '../base';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'sb-epic-form',
  templateUrl: './epic-form.component.html',
  styleUrls: ['./epic-form.component.css']
})
export class EpicFormComponent extends Base implements OnInit {
  @Input() mode:string;
  @Input() epic:Epic;
  public epicForm:FormGroup;
  private fb:FormBuilder = new FormBuilder();

  @Output() cancelEdit:EventEmitter<void> = new EventEmitter<void>();
  @Output() confirmEdit:EventEmitter<Epic> = new EventEmitter<Epic>();
  @Output() deleteEpic:EventEmitter<Epic> = new EventEmitter<Epic>();

  constructor(public dialog: MatDialog, private _snackBar : MatSnackBar) {
  	super();
  }

  ngOnInit(): void {
  	this.epicForm = this.fb.group({
  		title: new FormControl(this.epic.title, Validators.compose([Validators.pattern(".*[^\\s]+.*"), Validators.required])),
  		description: new FormControl(this.epic.description),
  		size: new FormControl(this.epic.size),
  		color: new FormControl(this.epic.color),
  	});
  }

  confirmDelete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
          title: "Are you sure?",
          message: `You are about to delete epic '${this.epic.title}'`
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.deleteEpic.emit(this.epic);
      }    
   });
  }

  submit() {
  	let editedEpic:Epic = { id: this.epic.id, 
  							title: this.epicForm.value['title'], 
  							description: this.epicForm.value['description'], 
  							size: this.epicForm.value['size'],
  							color: this.epicForm.value['color'],
  							project: this.epic.project
  						  };
  	this.confirmEdit.emit(editedEpic);
  }

}
