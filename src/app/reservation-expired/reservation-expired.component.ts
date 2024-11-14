import { Component } from '@angular/core';

@Component({
  selector: 'app-reservation-expired',
  templateUrl: './reservation-expired.component.html',
  styleUrls: ['./reservation-expired.component.css']
})
export class ReservationExpiredComponent {

  Title:string = "Reservation Expired"
  Message:string = "Your Reservation Has Expired \n please call reception "

}
