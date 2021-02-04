import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
    title: string;
    message: string;
}

@Component({
  selector: 'sb-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.css']
})
export class InfoDialogComponent implements OnInit {

  constructor(
        public dialogRef: MatDialogRef<InfoDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
                ) {}

  ngOnInit(): void {
  }

  onConfirm() {
    this.dialogRef.close(false);
  }

}
