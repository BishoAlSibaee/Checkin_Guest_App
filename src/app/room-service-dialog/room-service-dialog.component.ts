import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfermationDialogComponent } from '../confermation-dialog/confermation-dialog.component';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-room-service-dialog',
  templateUrl: './room-service-dialog.component.html',
  styleUrls: ['./room-service-dialog.component.css']
})
export class RoomServiceDialogComponent {

  Towels = false
  Slippers = false
  BathroomSet = false
  Other = false
  textColor:ThemePalette = "accent"
  orderObject = {"Towels":"","Slippers":"","BathroomSet":"","Other":""}
  OrderText = ""
  OrderTextColor = "white"
  otherText = ""

  constructor
  ( 
    @Inject(MAT_DIALOG_DATA) public data:any,
    private dialogRef: MatDialogRef<RoomServiceDialogComponent>
  ) 
  {

  }

  cancel() {
    this.dialogRef.close()
  }

  send() {
    if (!this.Towels && !this.Slippers && !this.BathroomSet && !this.Other) {
      this.OrderText = "please select order"
      this.OrderTextColor = "red"
      return
    }
    this.OrderTextColor = "white"
    this.OrderText = ""
    if (this.Towels) {
      this.orderObject.Towels = " towels "
    }
    if (this.Slippers) {
      this.orderObject.Slippers = " slippers "
    }
    if (this.BathroomSet) {
      this.orderObject.BathroomSet = " bathset "
    }
    if (this.Other) {
      if (this.otherText == "") {
          this.OrderText = "please enter your order"
          this.OrderTextColor = "red"
          return
        }
        else {
          this.orderObject.Other = " "+this.otherText+" "
        }
      }
      console.log(this.otherText)
      this.OrderText = this.orderObject.Towels+this.orderObject.Slippers+this.orderObject.BathroomSet+this.orderObject.Other
      console.log(this.OrderText)
      this.dialogRef.close(this.OrderText)
    }
    
}
