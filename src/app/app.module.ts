import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule , MAT_DIALOG_DATA ,MatDialogRef } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RoomPageComponent } from './room-page/room-page.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatTabsModule} from '@angular/material/tabs';
import { RoomComponent } from './room/room.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../enviroments/environment';
import * as crypto from 'crypto-js';
import { SwitchComponent } from './switch/switch.component';
import { ButtonComponent } from './button/button.component';
import { AcComponent } from './ac/ac.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { ItemDialogComponent } from './item-dialog/item-dialog.component';
import { ConfermationDialogComponent } from './confermation-dialog/confermation-dialog.component';
import { LoadingDialogComponent } from './loading-dialog/loading-dialog.component';
import { RoomServiceDialogComponent } from './room-service-dialog/room-service-dialog.component'
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatInputModule} from '@angular/material/input';
import { RestaurantCartComponent } from './restaurant-cart/restaurant-cart.component';
import { NoInternetComponent } from './no-internet/no-internet.component';
import { ReservationExpiredComponent } from './reservation-expired/reservation-expired.component';
import { ViewLoginErrorComponent } from './view-login-error/view-login-error.component';
import { ClientMessageDialogComponent } from './client-message-dialog/client-message-dialog.component'
import {MatIconModule} from '@angular/material/icon'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MessageDialogComponent,
    RoomPageComponent,
    RoomComponent,
    SwitchComponent,
    ButtonComponent,
    AcComponent,
    RestaurantComponent,
    ItemDialogComponent,
    ConfermationDialogComponent,
    LoadingDialogComponent,
    RoomServiceDialogComponent,
    RestaurantCartComponent,
    NoInternetComponent,
    ReservationExpiredComponent,
    ViewLoginErrorComponent,
    ClientMessageDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatTabsModule,
    MatInputModule,
    MatCheckboxModule,
    AngularFireDatabaseModule,
    MatIconModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([{path:'',redirectTo:'/login',pathMatch:'full'},{path:'login', component:LoginComponent},{path:'roomPage',component:RoomPageComponent},{path:'restaurant',component:RestaurantComponent},{
      path:'cart',component:RestaurantCartComponent},{path:'loginError',component:ViewLoginErrorComponent}])
  ],
  providers: [{ provide: MAT_DIALOG_DATA, useValue: {} },{ provide: MatDialogRef, useValue: {} },MessageDialogComponent,RoomPageComponent,RoomComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
