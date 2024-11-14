import { Component } from '@angular/core';
import { PROJECTVARIABLES } from './PROJECTVARIABLES';
import { Reservation } from './Reservation';
import { SERVICE_SWITCH } from './SERVICE_SWITCH';
import { FACILITY } from './FACILITY';
import { ORDER_ITEM } from './ORDER_ITEM';
import { ROOMCLASS } from './ROOMCLASS';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  static title = 'Checkin Guest';
  static ProjectName = 'apiTest'//'apiTest' //SeaFront
  static urlProjectName = "samples" //seafront
  static ProjectVariables:PROJECTVARIABLES
  static apiUrlRoomsManagement:string = "https://"+AppComponent.urlProjectName+".checkin.ratco-solutions.com/api/roomsManagement/"
  static apiUrlReservation = "https://"+AppComponent.urlProjectName+".checkin.ratco-solutions.com/api/reservations/"
  static apiUrlFacility = "https://"+AppComponent.urlProjectName+".checkin.ratco-solutions.com/api/facilitys/"
  static guestUrl = "https://"+AppComponent.urlProjectName+".checkin.ratco-solutions.com/api/reservations/checkAndRedirect/?type=mob&number="
  static qrCodeUrl = "http://api.qrserver.com/v1/create-qr-code/?data="
  static db:AngularFireDatabase
  static Reservation:Reservation
  static ServiceSwitch:SERVICE_SWITCH
  static Facilities:FACILITY[]
  static Restaurants:FACILITY[]
  static Laundries:FACILITY[]
  static restaurantVisible = false
  static SelectedRestaurant:FACILITY
  static ORDER_ITEMS:ORDER_ITEM[] = []
  static Selected_ROOM:ROOMCLASS
  static RESTAURANT_ORDER:ORDER_ITEM[]=[]
  static RoomNumber = 211
  static ROOM:ROOMCLASS
  static language="en"
  static LOGO = "./assets/images/logo.png"
  static HotelName = "VENDER"

  constructor
  (
  ) 
  {
    let x = localStorage.getItem("language")
    if ( x!= null) {
      AppComponent.language = x
    }
  }
}
