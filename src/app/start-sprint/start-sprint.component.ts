import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sprint } from '../sprint';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';

export interface DialogData {
    sprint:Sprint;
    reset:boolean;
}

const dateValidator: ValidatorFn = (fg: FormGroup) => {
	const start = fg.get('startDate').value;
	const end = fg.get('endDate').value;
	return start !== null && end !== null && start < end ? null : { range: true };
};

@Component({
  selector: 'sb-start-sprint',
  templateUrl: './start-sprint.component.html',
  styleUrls: ['./start-sprint.component.css']
})
export class StartSprintComponent implements OnInit {

  private fb:FormBuilder = new FormBuilder();
  public startSprintForm:FormGroup;

  constructor(public dialogRef: MatDialogRef<StartSprintComponent>,
        	  @Inject(MAT_DIALOG_DATA) public data: DialogData,
        	  private dialog:MatDialog) {}

  ngOnInit(): void {
  	this.startSprintForm = this.fb.group({
  		startDate: new FormControl(this.data.sprint.start_date, Validators.required),
  		endDate: new FormControl(this.data.sprint.end_date, Validators.required),
  		reset: new FormControl(false),
  	}, { validator: dateValidator });
  }

  onDismiss() {
  	this.dialogRef.close(false);
  }

  onConfirm() {
  	this.data.sprint.startDate = this.startSprintForm.get('startDate').value;
  	this.data.sprint.endDate = this.startSprintForm.get('endDate').value;
  	this.data.reset = this.startSprintForm.get('reset').value;
  	console.log(`this.data.reset = ${this.data.reset}`);
  	this.dialogRef.close(true);
  }

  showResetHelp() {
  	this.dialog.open(InfoDialogComponent, {
      maxWidth: "600px",
      data: {
        title: "Help",
        message: "When this box is checked, all previous burndown data will be cleared, and the burndown will start fresh."
      }
    });
  }

  hasBurndownData(sprint:Sprint):boolean {
  	return sprint.hasOwnProperty("burndownData") && sprint.burndownData && sprint.burndownData.ideal;
  }

}
