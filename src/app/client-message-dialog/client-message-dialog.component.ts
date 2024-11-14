import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../message-dialog/message-dialog.component';

@Component({
  selector: 'app-client-message-dialog',
  templateUrl: './client-message-dialog.component.html',
  styleUrls: ['./client-message-dialog.component.css']
})
export class ClientMessageDialogComponent {

  Message:string = ""

  constructor
  (
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.Message = this.data.message
  }

  ok() {

  }

}
