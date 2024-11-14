import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { PROJECTVARIABLES } from '../PROJECTVARIABLES';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ROOMCLASS } from '../ROOMCLASS';
import { Reservation } from '../Reservation';
import { ViewLoginErrorComponent } from '../view-login-error/view-login-error.component';
import { Texts } from '../Texts';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  title = AppComponent.title
  ProjectName = AppComponent.ProjectName
  MobileNumber:string = ""
  Type:string = "mob"
  texts:Texts
  welcomeText:string
  LOGO = AppComponent.LOGO
  HotelName = ""


  constructor(
    public client:HttpClient,
    public dialog:MatDialog,
    public router: Router,
    private route: ActivatedRoute
  ) 
  {
    this.HotelName = AppComponent.HotelName
    this.texts = new Texts()
    this.welcomeText = this.texts.getText("welcomeTo", "ar")
    this.getProjectVariables()
  }

  

    getProjectVariables() {
      let url = AppComponent.apiUrlRoomsManagement + "getProjectVariables"
      this.client.get<PROJECTVARIABLES>(url).subscribe({next:(data) => {
        console.log("project variables: ok")
        AppComponent.ProjectVariables = data
        this.LOGO = AppComponent.ProjectVariables.Logo
        localStorage.setItem("ServiceSwitch",AppComponent.ProjectVariables.ServiceSwitchButtons)
        this.getRoomData()
      },error:(error) => {
        console.log("project variables: ")
        console.log(error)
        this.dialog.open(MessageDialogComponent,{data:{title :"Error getting project variables please check your internet connection ",Message:error}})
      }});
    }

    login(n :number) {
      let url = AppComponent.apiUrlReservation + "guestLogin"
      let params = new FormData()
      params.append("number", n.toString())
      this.client.post(url,params).subscribe({next:(result)=>{
        console.log("login: ok")
        let xx = JSON.stringify(result)
        let x = JSON.parse(xx)
        if (x.result == "success") {
          let rr = JSON.stringify(x.reservation)
          let reservation = JSON.parse(rr)
          AppComponent.Reservation = reservation
          this.router.navigate(['roomPage'])
        }
        else {
          this.router.navigate(['loginError'],{state:{error:x.error}})
        }
      },error:(error)=>{
        console.log("login: ")
        console.log(error)
        this.router.navigate(['loginError'],{state:{error:error}})
      }})
    }

    getRoomData() {
      let url = AppComponent.apiUrlRoomsManagement + "getRoomByNumber"
      let params = new FormData()
      params.append("room_number", AppComponent.RoomNumber.toString())
      this.client.post<ROOMCLASS>(url,params).subscribe({next:(result)=>{
        console.log("room data: ok")
        console.log(result)
        AppComponent.ROOM = result
        this.getReservation()
      },error:(error)=>{
        console.log("room data: ")
        console.log(error)
        this.router.navigate(['loginError'],{state:{error:error}})
      }})
    }

    getReservation() {
      if (AppComponent.ROOM.SuiteStatus == 2) {
        let url = AppComponent.apiUrlReservation + "getSuiteReservation"
        let params = new FormData()
        params.append("suite_number", AppComponent.ROOM.SuiteNumber.toString())
        params.append("reservation_id", AppComponent.ROOM.ReservationNumber)
        this.client.post(url,params).subscribe({next:(result)=>{
          console.log("reservation data: ok")
          console.log(result)
          let xx = JSON.stringify(result)
          let x = JSON.parse(xx)
          if (x.result == "success") {
            let rr = JSON.stringify(x.reservation)
            let reservation = JSON.parse(rr)
            AppComponent.Reservation = reservation
            localStorage.setItem("ReservationId",AppComponent.Reservation.id.toString())
            this.login(AppComponent.ROOM.ReservationNumber)
          }
          else {
            console.log("reservation data: "+x.error)
            this.router.navigate(['loginError'],{state:{error:x.error}})
          }
        },error:(error)=>{
          console.log("reservation data: ")
          console.log(error)
          this.router.navigate(['loginError'],{state:{error:error}})
        }})
      }
      else {
        let url = AppComponent.apiUrlReservation + "getRoomReservation"
        let params = new FormData()
        params.append("room_number", AppComponent.RoomNumber.toString())
        params.append("reservation_id", AppComponent.ROOM.ReservationNumber)
        this.client.post(url,params).subscribe({next:(result)=>{
          console.log("reservation data: ok")
          console.log(result)
          let xx = JSON.stringify(result)
          let x = JSON.parse(xx)
          if (x.result == "success") {
            let rr = JSON.stringify(x.reservation)
            let reservation = JSON.parse(rr)
            AppComponent.Reservation = reservation
            localStorage.setItem("ReservationId",AppComponent.Reservation.id.toString())
            localStorage.setItem("ProjectName",AppComponent.ProjectName)
            localStorage.setItem("RoomNumber",AppComponent.Reservation.RoomNumber.toString())
            localStorage.setItem("GuestName",AppComponent.Reservation.ClientFirstName + " " + AppComponent.Reservation.ClientLastName)
            localStorage.setItem("Start",AppComponent.Reservation.StartDate)
            localStorage.setItem("End",AppComponent.Reservation.EndDate)
            localStorage.setItem("MobileNumber",AppComponent.Reservation.MobileNumber.toString())
            this.login(AppComponent.ROOM.ReservationNumber)
          }
          else {
            console.log(x.error)
            this.router.navigate(['loginError'],{state:{error:x.error}})
          }
        },error:(error)=>{
          console.log("reservation data: ")
          console.log(error)
          this.router.navigate(['loginError'],{state:{error:error}})
        }})
      }
      
    }
}
