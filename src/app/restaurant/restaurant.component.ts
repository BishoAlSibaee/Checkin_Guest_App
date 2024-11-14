import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { RESTAURANT_MENU } from '../RESTAURANT_MENU';
import { RESTAURANT_MENU_ITEM } from '../RESTAURANT_MENU_ITEM';
import {Location} from '@angular/common';
import { ItemDialogComponent } from '../item-dialog/item-dialog.component';
import { DialogConfig } from '@angular/cdk/dialog';
import { ORDER_ITEM } from '../ORDER_ITEM';
import { FACILITY } from '../FACILITY';
import { ConfermationDialogComponent } from '../confermation-dialog/confermation-dialog.component';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent {

  RoomNumber = AppComponent.Reservation.RoomNumber
  ProjectName = AppComponent.ProjectName
  ReservationNumber = AppComponent.Reservation.id
  GuestName = AppComponent.Reservation.ClientFirstName +" "+ AppComponent.Reservation.ClientLastName
  Restaurant = AppComponent.SelectedRestaurant
  Menues:RESTAURANT_MENU[] = []
  Items:RESTAURANT_MENU_ITEM[] = []
  SELECTED_MENU:RESTAURANT_MENU
  menuesVisible = true
  itemsVisible = false
  OrderItemsCount = 0
  ORDER_ITEMS:ORDER_ITEM[]
  ItemsCount = 0
  loading = 0

  constructor(
    private router: Router,
    public dialog:MatDialog,
    private client:HttpClient,
    private location:Location
  ) 
  {
    this.SELECTED_MENU = new RESTAURANT_MENU(0,0,"","","")
    this.ORDER_ITEMS = AppComponent.ORDER_ITEMS
    this.ItemsCount = AppComponent.ORDER_ITEMS.length
  }

  ngOnInit() {
    this.getRestaurantMenues()
  }

  goBack() {
    if (this.menuesVisible) {
      this.location.back()
    }
    else {
      this.itemsVisible = false
      this.menuesVisible = true
    }
  }

  getRestaurantMenues() {
    let url = AppComponent.apiUrlFacility + "getRestaurantMenuesForRoom"
    let params = new FormData()
    params.append("facility_id",this.Restaurant.id.toString())
    this.loading = 1.0
    this.client.post<any>(url,params).subscribe({next:(result)=>{
      this.loading = 0
      console.log(result)
      if (result != null) {
        let x = JSON.stringify(result)
        let y = JSON.parse(x)
        if (y.result == "success") {
          let xx = JSON.stringify(y.menues)
          let yy = JSON.parse(xx)
          this.Menues = yy
        }
        console.log(this.Menues)
      }
    },error:(error)=>{
      this.loading = 0
    }})
  }

  goToMenuItems(menu:RESTAURANT_MENU) {
    this.SELECTED_MENU = menu
    let url = AppComponent.apiUrlFacility + "getRestaurantMenueMealsForRoom"
    let params = new FormData()
    params.append("facility_id",this.Restaurant.id.toString())
    params.append("menue_id",menu.id.toString())
    this.loading = 1.0
    this.client.post<any>(url,params).subscribe({next:(result)=>{
      this.loading = 0
      console.log(result)
      if (result != null) {
        let x = JSON.stringify(result)
        let y = JSON.parse(x)
        if (y.result == "success") {
          let xx = JSON.stringify(y.meals)
          let yy = JSON.parse(xx)
          this.Items = yy
          this.menuesVisible = false 
          this.itemsVisible = true
        }
        console.log(this.Items)
      }
    },error:(error)=>{
      this.loading = 0
    }})
  }

  itemClicked(item:RESTAURANT_MENU_ITEM) {
    let dcon = new MatDialogConfig
    dcon.data = item
    dcon.width = "80%"
    let d = this.dialog.open(ItemDialogComponent,dcon)
    d.afterClosed().subscribe({next:(result)=>{
      if (result != null) {
        let orderItem = new ORDER_ITEM(item,result)
        if (AppComponent.ORDER_ITEMS.length > 0) {
          if (AppComponent.ORDER_ITEMS[0].Item.facility_id == item.facility_id) {
            AppComponent.ORDER_ITEMS.push(orderItem)
            this.ItemsCount = AppComponent.ORDER_ITEMS.length
          }
          else {
            //show confermation dialog to remove old items 
            let dcon = new MatDialogConfig()
            dcon.data = {"message":"you have items from "+FACILITY.searchFacility(AppComponent.Facilities, AppComponent.ORDER_ITEMS[0].Item.facility_id)?.Name+ " you can not add items from 2 deferent restaurants","title":"defrent restaurant ."}
            dcon.width = "60%"
            let d = this.dialog.open(ConfermationDialogComponent,dcon)
            d.afterClosed().subscribe({next:(result)=>{
              if (result == 0) {
                
              }
              else if (result == 1) {
                AppComponent.ORDER_ITEMS = []
                AppComponent.ORDER_ITEMS.push(orderItem)
                this.ItemsCount = AppComponent.ORDER_ITEMS.length
              }
              console.log(AppComponent.ORDER_ITEMS.length)
            },error:(error)=>{

            }})
          }
        }
        else {
          AppComponent.ORDER_ITEMS.push(orderItem)
          this.ItemsCount = AppComponent.ORDER_ITEMS.length
        }
        
      }
    },error:(error)=>{
      
    }})
  }

  goToCart() {
    if (AppComponent.ORDER_ITEMS.length == 0) {
      let dcon = new MatDialogConfig()
      dcon.data = {"message":"no items added","title":"no items"}
      dcon.width = "60%"
      let d = this.dialog.open(ConfermationDialogComponent,dcon)
      return
    }
    this.router.navigate(['cart'])
  }

}
