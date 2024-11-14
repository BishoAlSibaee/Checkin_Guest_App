import { Component, QueryList, ViewChildren } from '@angular/core';
import { AppComponent } from '../app.component';
import { NavigationEnd, Router } from '@angular/router';
import { Reservation } from '../Reservation';
import { HttpClient } from '@angular/common/http';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ROOMCLASS } from '../ROOMCLASS';
import {MatTabsModule,MatTabGroup, MatTabChangeEvent} from '@angular/material/tabs';
import { PROJECTVARIABLES } from '../PROJECTVARIABLES';
import { ThemePalette } from '@angular/material/core';
import { SERVICE_SWITCH } from '../SERVICE_SWITCH';
import { FACILITY } from '../FACILITY';
import { filter, fromEvent } from 'rxjs';
import { NoInternetComponent } from '../no-internet/no-internet.component';
import { DialogConfig } from '@angular/cdk/dialog';
import { translation } from '../translation';
import { ReservationExpiredComponent } from '../reservation-expired/reservation-expired.component';
import { Texts } from '../Texts';
import { RoomComponent } from '../room/room.component';
import { ClientMessageDialogComponent } from '../client-message-dialog/client-message-dialog.component';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-room-page',
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.css'],
})
export class RoomPageComponent {

  RoomNumber 
  ProjectName
  ReservationNumber=0
  ROOMs:ROOMCLASS[] = []
  GuestName
  Checkin
  Checkout
  tabColor:ThemePalette = 'primary'
  xxx:ThemePalette = 'accent'
  loading = 0
  //QRCodeUrl = ""
  d:MatDialogRef<NoInternetComponent>|null = null
  static reservationExpiredDialog:MatDialogRef<ReservationExpiredComponent>|null = null
  welcomeText:string = ""
  welcome = ""
  reservationNumber = ""
  checkin = ""
  checkout = ""
  texts
  _room = ""
  LOGO = AppComponent.LOGO
  HotelName = ""

  

  constructor(
    private router: Router,
    public dialog:MatDialog,
    public client:HttpClient,
    public child:RoomComponent,
    private db:AngularFireDatabase,
  ) 
  {
    this.HotelName = AppComponent.HotelName
    this.texts = new Texts()
    this.setLanguage()

    let id:string|null = ""  
    id = localStorage.getItem("ReservationId")
    if (id != null) {
      this.ReservationNumber = parseInt(id)
    }
    let pn:string|null = ""
    pn = localStorage.getItem("ProjectName")
    if (pn != null) {
      this.ProjectName = pn
    }

    let rn:string|null = ""
    rn = localStorage.getItem("RoomNumber")
    if (rn != null) {
      this.RoomNumber = parseInt(rn)
    }

    let gn:string|null = ""
    gn = localStorage.getItem("GuestName")
    if (gn != null) {
      this.GuestName = gn
    }

    let st:string|null = ""
    st = localStorage.getItem("Start")
    if (st != null) {
      this.Checkin = st
    }

    let en:string|null = ""
    en = localStorage.getItem("End")
    if (en != null) {
      this.Checkout = en
    }
    this.getProjectVariables()
    fromEvent(window,'online').subscribe(e=>{
        console.log("online")
        if (this.d != null) {
          this.d.close()
        }
    })
    fromEvent(window,'offline').subscribe(e=>{
      console.log("offline")
      let dialogconf = new MatDialogConfig
      dialogconf.disableClose = true
      dialogconf.data = {"title":"No Internet","message":"No Internet .. check your internet connection"}
      this.d = dialog.open(NoInternetComponent,dialogconf)
    })
    window.addEventListener("focus", function login() {
      console.log("focus on")
      let url = AppComponent.apiUrlReservation + "guestLogin"
      let params = new FormData()
      let n = localStorage.getItem("ReservationId")
      if (n != null) {
        params.append("number", n)
      }
      client.post(url,params).subscribe({next:(result)=>{
        console.log("login: ok")
        let xx = JSON.stringify(result)
        let x = JSON.parse(xx)
        if (x.result != "success") {
          let dialogconf = new MatDialogConfig
          dialogconf.disableClose = true
          router.navigate(['loginError'],{state:{error:x.error}})
          this.window.removeEventListener("focus",login)
        }
      },error:(error)=>{
        console.log("login: ")
        console.log(error)
        router.navigate(['loginError'],{state:{error:error}})
        this.window.removeEventListener("focus",login)
      }})
    })
    this.router.events.pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd)).subscribe(event => {
      if (
        event.id === 1 &&
        event.url === event.urlAfterRedirects
      ) {
      }
    })
    //let vvv = encodeURIComponent(AppComponent.guestUrl+AppComponent.Reservation.MobileNumber)
    //console.log(vvv)
    //this.QRCodeUrl = AppComponent.qrCodeUrl+vvv+"&size=120x120"
  }

  ngOnInit() {
  
  }

  getTheRooms() {
    let url = AppComponent.apiUrlRoomsManagement + "getReservationRooms"
    let params = new FormData()
    params.append("reservation_id",this.ReservationNumber.toString())
    this.loading = 1.0
    this.client.post<any>(url, params).subscribe({next:(result)=>{
      console.log("rooms: ok")
      console.log(result)
      this.loading = 0
      let r = JSON.stringify(result)
      let x = JSON.parse(r)
      if (x.result == "success") {
        let rr = JSON.stringify(x.rooms)
        let xx = JSON.parse(rr)
        if (xx != null) {
          this.ROOMs = xx
          if (this.ROOMs.length == 1) {
            AppComponent.Selected_ROOM = this.ROOMs[0]
          }
        }
      }
      else {
        this.dialog.open(MessageDialogComponent,{data:{title :"Failed to get Reservation Rooms",Message:x.error}})
      }
    },error:(error)=>{
      console.log("rooms: ")
      console.log(error)
      this.loading = 0
      this.dialog.open(MessageDialogComponent,{data:{title :"Failed to get Reservation Rooms",Message:error}})
    }})
  }

  getFacilities() {
    let url = AppComponent.apiUrlFacility + "getfacilitys"
    this.loading = 1.0
    this.client.get<FACILITY[]>(url).subscribe({next:(result)=>{
      console.log("facilities: ok")
      this.loading = 0
      if (result != null) {
        AppComponent.Facilities = result
        AppComponent.Restaurants = []
        AppComponent.Laundries = []
        AppComponent.Facilities.forEach(fac => {
          if (fac.TypeName == "Restaurant" || fac.TypeName == "CoffeeShop") {
            AppComponent.restaurantVisible = true
            AppComponent.Restaurants.push(fac)
          }
          else if (fac.TypeName == "Laundry") {
            AppComponent.Laundries.push(fac)
          }
        });
        this.getTheRooms()
      }
    },error:(error)=>{
      console.log("facilities: ")
      console.log(error)
      this.loading = 0
      this.dialog.open(MessageDialogComponent,{data:{title :"facilities error",Message:"error getting facilities \n"+error.message}})
    }})
  }

  getProjectVariables() {
    let url = AppComponent.apiUrlRoomsManagement + "getProjectVariables"
    this.loading = 1.0
    this.client.get<PROJECTVARIABLES>(url).subscribe({next:(data) => {
      console.log("projectvariables: ok")
      this.loading = 0
      AppComponent.ProjectVariables = data
      this.LOGO = AppComponent.ProjectVariables.Logo
      this.setServiceSwitchButtons(AppComponent.ProjectVariables.ServiceSwitchButtons)
      this.getFacilities()
    },error:(error) => {
      console.log("projectvariables: ")
      console.log(error)
      this.loading = 0
      this.dialog.open(MessageDialogComponent,{data:{title :"project variables error",Message:"error getting project variables \n"+error.message}})
    }});
  }

  setServiceSwitchButtons(btns:string) {
    let y:SERVICE_SWITCH = JSON.parse(btns)
    AppComponent.ServiceSwitch = y
  }

  roomTabClick(tabChangeEvent: MatTabChangeEvent) {
    if (tabChangeEvent.index != null) {
      AppComponent.Selected_ROOM = this.ROOMs[tabChangeEvent.index]
    }
  }

  setLanguageEnglish() {
    localStorage.setItem("language", "en")
    AppComponent.language = "en"
    this.setLanguage()
    this.child.setLanguageXX()
  }

  setLanguageArabic() {
    localStorage.setItem("language", "ar")
    AppComponent.language = "ar"
    this.setLanguage()
    this.child.setLanguageXX()
  }

  setLanguage() {
    this.welcomeText = this.texts.getText("welcomeTo", AppComponent.language)
    this.welcome = this.texts.getText("welcome", AppComponent.language)
    this.reservationNumber = this.texts.getText("reservationNumber", AppComponent.language)
    this.checkin = this.texts.getText("checkin", AppComponent.language)
    this.checkout = this.texts.getText("checkout", AppComponent.language)
    this._room = this.texts.getText("room", AppComponent.language)
  }

}


