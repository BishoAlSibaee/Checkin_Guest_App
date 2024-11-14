import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ItemDialogComponent } from '../item-dialog/item-dialog.component';

@Component({
  selector: 'app-confermation-dialog',
  templateUrl: './confermation-dialog.component.html',
  styleUrls: ['./confermation-dialog.component.css']
})
export class ConfermationDialogComponent {

  Title:string = ""
  Message:string = ""

  constructor
  (
    @Inject(MAT_DIALOG_DATA) public data:any,
    private dialogRef: MatDialogRef<ConfermationDialogComponent>
  ) {
    this.Title = data.title
    this.Message = data.message
  }

  no() {
    this.dialogRef.close(0)
  }

  yes() {
    this.dialogRef.close(1)
  }

}
