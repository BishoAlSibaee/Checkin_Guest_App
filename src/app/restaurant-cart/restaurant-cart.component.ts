import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { ORDER_ITEM } from '../ORDER_ITEM';
import {Location} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { RoomComponent } from '../room/room.component';

@Component({
  selector: 'app-restaurant-cart',
  templateUrl: './restaurant-cart.component.html',
  styleUrls: ['./restaurant-cart.component.css']
})
export class RestaurantCartComponent {

  RoomNumber = AppComponent.Reservation.RoomNumber
  ProjectName = AppComponent.ProjectName
  ReservationNumber = AppComponent.Reservation.id
  GuestName = AppComponent.Reservation.ClientFirstName +" "+ AppComponent.Reservation.ClientLastName
  Restaurant = AppComponent.SelectedRestaurant
  loading = 0
  OrderItems:ORDER_ITEM[] = []

  constructor
  (
    private client:HttpClient,
    private location:Location,
    public dialog:MatDialog,
  ) 
  {
    this.OrderItems = AppComponent.ORDER_ITEMS
  }

  goBack() {
    this.location.back()
  }

  sendOrder() {
      let url = AppComponent.apiUrlFacility + "addRestaurantOrder"
      let params = new FormData()
      params.append("room_id",AppComponent.Selected_ROOM.id)
      params.append("facility_id",this.Restaurant.id.toString())
      params.append("countItems",AppComponent.ORDER_ITEMS.length.toString())
      let TOTAL = 0
      for (let i =0 ; i<AppComponent.ORDER_ITEMS.length;i++) {
        params.append("itemNo"+i ,AppComponent.ORDER_ITEMS[i].Item.id.toString())
        params.append("name"+i , AppComponent.ORDER_ITEMS[i].Item.name)
        params.append("desc"+i , AppComponent.ORDER_ITEMS[i].Item.desc)
        params.append("quantity"+i ,AppComponent.ORDER_ITEMS[i].Quantity.toString())
        params.append("price"+i ,AppComponent.ORDER_ITEMS[i].Item.price.toString())
        params.append("total"+i ,(AppComponent.ORDER_ITEMS[i].Item.price*AppComponent.ORDER_ITEMS[i].Quantity).toString())
        TOTAL = TOTAL + (AppComponent.ORDER_ITEMS[i].Item.price*AppComponent.ORDER_ITEMS[i].Quantity)
    }
    params.append("total",TOTAL.toString())
    this.loading = 1.0
    this.client.post(url,params).subscribe({next:(result)=>{
      this.loading = 0
      console.log(result)
      let x = JSON.stringify(result)
      let y = JSON.parse(x)
      if (y.result == "success") {
        let dcon = new MatDialogConfig()
        dcon.data = {"title":"Done","message":"order sent successfully"}
        dcon.width = "50%"
        this.dialog.open(MessageDialogComponent,dcon)
        let time = Date.now()
        RoomComponent.RestaurantRef.set(time)
        for (let i=0;i<AppComponent.ORDER_ITEMS.length;i++) {
          AppComponent.RESTAURANT_ORDER.push(AppComponent.ORDER_ITEMS[i])
        }
        AppComponent.ORDER_ITEMS = []
        this.OrderItems = []
      }
    },error:(error)=>{
      this.loading = 0
      let dcon = new MatDialogConfig()
      dcon.data = {"title":"Error","message":error}
      dcon.width = "50%"
      this.dialog.open(MessageDialogComponent,dcon)
      console.log(error)
    }})
  }

}
