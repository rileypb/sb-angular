import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
    title: string;
    message: string;
}

@Component({
  selector: 'app-input-dialog',
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.css']
})
export class InputDialogComponent implements OnInit {
    public formInput: string;
    dialogData: DialogData;
    title:string;
    message:string;

    constructor(
        public dialogRef: MatDialogRef<InputDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
                ) {console.log("opening dialog")}

    ngOnInit() {

    }

    onConfirm(): void {
        // Close the dialog, return value
        this.dialogRef.close(this.formInput);
    }

    onDismiss(): void {
        // Close the dialog, return false
        this.dialogRef.close(false);
    }

}
