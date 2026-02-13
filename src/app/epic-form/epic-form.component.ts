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
    styleUrls: ['./epic-form.component.css'],
    standalone: false
})
export class EpicFormComponent extends Base implements OnInit {
  @Input() mode:string;
  public epicForm:FormGroup;
  private fb:FormBuilder = new FormBuilder();

  @Output() cancelEdit:EventEmitter<void> = new EventEmitter<void>();
  @Output() confirmEdit:EventEmitter<Epic> = new EventEmitter<Epic>();
  @Output() deleteEpic:EventEmitter<Epic> = new EventEmitter<Epic>();

  public quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ]
  };

  constructor(public dialog: MatDialog, private _snackBar : MatSnackBar) {
  	super();
  }

  ngOnInit(): void {
  }

  init():void {
  	const parsedDescription = this.parseDescription(this.epic.description);
  	this.epicForm = this.fb.group({
  		title: new FormControl(this.epic.title, Validators.compose([Validators.pattern(".*[^\\s]+.*"), Validators.required])),
  		description: new FormControl(parsedDescription),
  		size: new FormControl(String(this.epic.size)),
  		color: new FormControl(this.epic.color),
  	});
  }

  private parseDescription(description: any): any {
    // If description is already a Delta object, return as is
    if (description && typeof description === 'object' && description.ops) {
      return description;
    }
    
    // If description is a JSON string containing Delta, parse it
    if (typeof description === 'string' && description.trim().startsWith('{')) {
      try {
        const parsed = JSON.parse(description);
        if (parsed.ops) {
          return parsed;
        }
      } catch (e) {
        // Not valid JSON, treat as plain text
      }
    }
    
    // If description is HTML/plain text string, convert to Delta
    if (typeof description === 'string' && description.trim()) {
      // Create a simple Delta with just text
      return { ops: [{ insert: description + '\n' }] };
    }
    
    // Return empty Delta for null/undefined/empty
    return { ops: [{ insert: '\n' }] };
  }

  @Input() set epic(value:Epic) {
    this._epic = value;
    if (value) {
      this.init();
    }
  }
  get epic():Epic {
    return this._epic;
  }
  private _epic:Epic;

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
