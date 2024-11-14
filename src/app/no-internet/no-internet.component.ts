import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-no-internet',
  templateUrl: './no-internet.component.html',
  styleUrls: ['./no-internet.component.css']
})
export class NoInternetComponent {

  Title:string = "No Internet"
  Message:string = "No Internet .. check your internet connection"

  constructor
  (
    @Inject(MAT_DIALOG_DATA) public data:any,
    private dialogRef: MatDialogRef<NoInternetComponent>
  ) 
  {
    if (data.title != null) {
      this.Title = data.title
    }
    if (data.message != null) {
      this.Message = data.message
    }
  }

}
