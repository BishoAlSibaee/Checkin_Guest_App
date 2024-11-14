import { Component, Inject, Input } from '@angular/core';
import { AppComponent } from '../app.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-view-login-error',
  templateUrl: './view-login-error.component.html',
  styleUrls: ['./view-login-error.component.css']
})
export class ViewLoginErrorComponent {

  ProjectName:string
  static error:string = ""
  LOGO = "./assets/images/logo.png"


  constructor
  (
    private route: ActivatedRoute,
    private client:HttpClient,
    private router: Router,
    ) 
    {
    this.ProjectName = AppComponent.ProjectName
    window.addEventListener("focus", function login() {
      console.log("focus on")
      let url = AppComponent.apiUrlReservation + "guestLogin"
      let params = new FormData()
      let n = localStorage.getItem("ReservationId")
      if (n != null) {
        params.append("number", n)
      }
      client.post(url,params).subscribe({next:(result)=>{
        console.log("login: ")
        console.log(result)
        let xx = JSON.stringify(result)
        let x = JSON.parse(xx)
        if (x.result != "success") {
          ViewLoginErrorComponent.error = x.error
        }
        else {
          router.navigate(['login'])
          this.window.removeEventListener("focus",login)
        }
      },error:(error)=>{
        console.log("login: ")
        console.log(error)
        ViewLoginErrorComponent.error = error
      }})
    })
    this.LOGO = AppComponent.ProjectVariables.Logo
  }

  ngOnInit() {
    console.log(history.state.error)
    ViewLoginErrorComponent.error = history.state.error
  }

  static setError(e:string) {
    this.error = e
  }

  getError() {
    return ViewLoginErrorComponent.error
  }
}
