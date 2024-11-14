import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { RESTAURANT_MENU_ITEM } from '../RESTAURANT_MENU_ITEM';
import { FACILITY } from '../FACILITY';
import { AppComponent } from '../app.component';
import { ConfermationDialogComponent } from '../confermation-dialog/confermation-dialog.component';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';

@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.css']
})
export class ItemDialogComponent {

  Quantity:number
  Item:RESTAURANT_MENU_ITEM
  quantityColor = "white"


  constructor
  (
    @Inject(MAT_DIALOG_DATA) public data:any,
    private dialogRef: MatDialogRef<ItemDialogComponent>,
    public dialog:MatDialog,
  ) {
    this.Quantity = 0
    this.Item = data
  }


  closeDialog() {
    this.dialogRef.close()
  }

  addItem() {
    if (this.Quantity == 0) {
      this.quantityColor = "red"
      return
    }
    this.dialogRef.close(this.Quantity)
  }

  downClick() {
    if (this.Quantity != 0) {
      this.Quantity = this.Quantity - 1
    }
  }


  upClick() { 
    if (this.Quantity != 100) {
      this.Quantity = this.Quantity + 1
    }
  }

  calculateTotal() {
    return this.Quantity * this.Item.price
  }

}
