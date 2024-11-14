import { Component, Input } from '@angular/core';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { ROOMCLASS } from '../ROOMCLASS';
import { Dialog } from '@angular/cdk/dialog';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { ZigbeeLock } from '../ZigbeeLock';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { SWITCH } from '../SWITCH';
import { TmplAstRecursiveVisitor } from '@angular/compiler';
import { ThemePalette } from '@angular/material/core';
import { SERVICE_SWITCH } from '../SERVICE_SWITCH';
import { RoomPageComponent } from '../room-page/room-page.component';
import { FACILITY } from '../FACILITY';
import { Route, Router } from '@angular/router';
import { ConfermationDialogComponent } from '../confermation-dialog/confermation-dialog.component';
import { RoomServiceDialogComponent } from '../room-service-dialog/room-service-dialog.component';
import { fromEvent } from 'rxjs';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Texts } from '../Texts';
import { ClientMessageDialogComponent } from '../client-message-dialog/client-message-dialog.component';


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})

export class RoomComponent {

  @Input() data:any
  ROOM:ROOMCLASS|any
  LockImage:string = "lock"
  lockBgHidden = true
  lightsVisible = false
  acVisible = false
  Switch1:SWITCH = new SWITCH("Switch1")
  Switch2:SWITCH = new SWITCH("Switch2")
  Switch3:SWITCH = new SWITCH("Switch3")
  Switch4:SWITCH = new SWITCH("Switch4")
  Switch5:SWITCH = new SWITCH("Switch5")
  Switch6:SWITCH = new SWITCH("Switch6")
  Switch7:SWITCH = new SWITCH("Switch7")
  Switch8:SWITCH = new SWITCH("Switch8")
  SWITCHEs:SWITCH[] = [this.Switch1,this.Switch2,this.Switch3,this.Switch4]
  ButtonOn =  "linear-gradient(-30deg, rgb(216, 216, 216),rgb(255, 240, 240),rgb(216, 216, 216))"
  ButtonOff =  "linear-gradient(-30deg,#001e3d,#8397ac,#001e3d)"
  ButtonStatus = this.ButtonOff
  PowerACOn = "./assets/images/ac_on.png"
  PowerACOff = "./assets/images/ac_off.png"
  PowerACStatus = this.PowerACOff
  FanACLow = "./assets/images/low_fan.png"
  FanACMed = "./assets/images/med_fan.png"
  FanACHigh = "./assets/images/high_fan.png"
  FanACAuto = "./assets/images/auto_fan.png"
  FanACStatus = this.FanACLow
  CleanupRef:any
  CleanupValue:number=0
  LaundryRef:any
  LaundryValue:number=0
  DNDRef:any
  DNDValue:number=0
  CheckoutRef:any
  CheckoutValue:number=0
  SOSRef:any
  SOSValue:number =0
  RoomServiceRef:any
  RoomServiceValue:number=0
  RoomServiceTextRef:any
  static RestaurantRef:any
  RestaurantValue = 0
  RoomStatusRef:any
  LockRef:any
  LockVisible = false
  curtainVisible = false
  S1B1:any
  S1B2:any
  S1B3:any
  S1B4:any
  S2B1:any
  S2B2:any
  S2B3:any
  S2B4:any
  S3B1:any
  S3B2:any
  S3B3:any
  S3B4:any
  S4B1:any
  S4B2:any
  S4B3:any
  S4B4:any
  S5B1:any
  S5B2:any
  S5B3:any
  S5B4:any
  S6B1:any
  S6B2:any
  S6B3:any
  S6B4:any
  S7B1:any
  S7B2:any
  S7B3:any
  S7B4:any
  S8B1:any
  S8B2:any
  S8B3:any
  S8B4:any
  curtainRef:AngularFireObject<any>|null = null
  ButtonsNames:any
  ClientMessage:any
  ACCurrentTemp:any
  ACCurrentTempValue:number=0
  ACOffOrOn=false
  ACPower:any
  ACPowerValue:number=0
  ACPowerVisible = false
  ACSetTemp:any
  ACSetTempValue:number=0
  ACSetTempVisible = false
  ACTempLength:number=2
  ACFan:any
  ACFanValue:string=""
  ACFanVisible = false
  SetTemp:string=""
  CurrentTemp:string = "22"
  tabColor:ThemePalette = 'primary'
  xxx:ThemePalette = 'accent'
  ServiceSwitch:SERVICE_SWITCH = new SERVICE_SWITCH("0","0","0","0")
  restaurantVisible:boolean
  Restaurants:FACILITY[]
  xx=0
  ClientMessageDialog:MatDialogRef<ClientMessageDialogComponent>|null = null

  cleanupVisible = false
  laundryVisible = false
  dndVisible = false
  checkoutVisible = false
  roomServiceVisible = false
  sosVisible = false
  restaurantVisibleIcon = false

  texts
  static door=""
  static services=""
  static lights=""
  static ac=""
  static restaurants  =""
  static sos=""
  static dnd=""
  static cleanup=""
  static laundry=""
  static roomService=""
  static checkout=""
  static curtain=""

  constructor
  (
    private client:HttpClient,
    private dialog:MatDialog,
    private db:AngularFireDatabase,
    private router:Router,
  ) 
  {
    this.ServiceSwitch = AppComponent.ServiceSwitch
    this.restaurantVisible = AppComponent.restaurantVisible
    this.Restaurants = AppComponent.Restaurants
    this.texts = new Texts()
    this.setLanguage()
  }

  async ngOnInit() {
    this.ROOM=this.data
    this.LockRef = this.db.object("/"+AppComponent.ProjectVariables.projectName+"Devices/"+this.ROOM.RoomNumber+"/"+this.ROOM.RoomNumber+"Lock/1")
    this.CleanupRef = this.db.object("/"+AppComponent.ProjectVariables.projectName+"/B"+this.ROOM.Building+"/F"+this.ROOM.Floor+"/R"+this.ROOM.RoomNumber+"/Cleanup")
    this.LaundryRef = this.db.object("/"+AppComponent.ProjectVariables.projectName+"/B"+this.ROOM.Building+"/F"+this.ROOM.Floor+"/R"+this.ROOM.RoomNumber+"/Laundry")
    this.DNDRef = this.db.object("/"+AppComponent.ProjectVariables.projectName+"/B"+this.ROOM.Building+"/F"+this.ROOM.Floor+"/R"+this.ROOM.RoomNumber+"/DND")
    this.CheckoutRef = this.db.object("/"+AppComponent.ProjectVariables.projectName+"/B"+this.ROOM.Building+"/F"+this.ROOM.Floor+"/R"+this.ROOM.RoomNumber+"/Checkout")
    this.RoomServiceRef = this.db.object("/"+AppComponent.ProjectVariables.projectName+"/B"+this.ROOM.Building+"/F"+this.ROOM.Floor+"/R"+this.ROOM.RoomNumber+"/RoomService")
    this.RoomServiceTextRef = this.db.object("/"+AppComponent.ProjectVariables.projectName+"/B"+this.ROOM.Building+"/F"+this.ROOM.Floor+"/R"+this.ROOM.RoomNumber+"/RoomServiceText")
    this.SOSRef = this.db.object("/"+AppComponent.ProjectVariables.projectName+"/B"+this.ROOM.Building+"/F"+this.ROOM.Floor+"/R"+this.ROOM.RoomNumber+"/SOS")
    this.ButtonsNames = this.db.object("/"+AppComponent.ProjectVariables.projectName+"/B"+this.ROOM.Building+"/F"+this.ROOM.Floor+"/R"+this.ROOM.RoomNumber+"/Buttons")
    RoomComponent.RestaurantRef = this.db.object("/"+AppComponent.ProjectVariables.projectName+"/B"+this.ROOM.Building+"/F"+this.ROOM.Floor+"/R"+this.ROOM.RoomNumber+"/Restaurant")
    this.RoomStatusRef = this.db.object("/"+AppComponent.ProjectVariables.projectName+"/B"+this.ROOM.Building+"/F"+this.ROOM.Floor+"/R"+this.ROOM.RoomNumber+"/roomStatus")
    this.S1B1 = this.db.object("/"+AppComponent.ProjectVariables.projectName+"Devices/"+this.ROOM.RoomNumber+"/"+this.ROOM.RoomNumber+this.Switch1.name+"/1")
    this.S1B2 = this.db.object("/"+AppComponent.ProjectVariables.projectName+"Devices/"+this.ROOM.RoomNumber+"/"+this.ROOM.RoomNumber+this.Switch1.name+"/2")
    this.S1B3 = this.db.object("/"+AppComponent.ProjectVariables.projectName+"Devices/"+this.ROOM.RoomNumber+"/"+this.ROOM.RoomNumber+this.Switch1.name+"/3")
    this.S1B4 = this.db.object("/"+AppComponent.ProjectVariables.projectName+"Devices/"+this.ROOM.RoomNumber+"/"+this.ROOM.RoomNumber+this.Switch1.name+"/4")
    this.S2B1 = this.db.object("/"+AppComponent.ProjectVariables.projectName+"Devices/"+this.ROOM.RoomNumber+"/"+this.ROOM.RoomNumber+this.Switch2.name+"/1")
    this.S2B2 = this.db.object("/"+AppComponent.ProjectVariables.projectName+"Devices/"+this.ROOM.RoomNumber+"/"+this.ROOM.RoomNumber+this.Switch2.name+"/2")
    this.S2B3 = this.db.object("/"+AppComponent.ProjectVariables.projectName+"Devices/"+this.ROOM.RoomNumber+"/"+this.ROOM.RoomNumber+this.Switch2.name+"/3")
    this.S2B4 = this.db.object("/"+AppComponent.ProjectVariables.projectName+"Devices/"+this.ROOM.RoomNumber+"/"+this.ROOM.RoomNumber+this.Switch2.name+"/4")
    this.S3B1 = this.db.object("/"+AppComponent.ProjectVariables.projectName+"Devices/"+this.ROOM.RoomNumber+"/"+this.ROOM.RoomNumber+this.Switch3.name+"/1")
    this.S3B2 = this.db.object("/"+AppComponent.ProjectVariables.projectName+"Devices/"+this.ROOM.RoomNumber+"/"+this.ROOM.RoomNumber+this.Switch3.name+"/2")
    this.S3B3 = this.db.object("/"+AppComponent.ProjectVariables.projectName+"Devices/"+this.ROOM.RoomNumber+"/"+this.ROOM.RoomNumber+this.Switch3.name+"/3")
    this.S3B4 = this.db.object("/"+AppComponent.ProjectVariables.projectName+"Devices/"+this.ROOM.RoomNumber+"/"+this.ROOM.RoomNumber+this.Switch3.name+"/4")
    this.S4B1 = this.db.object("/"+AppComponent.ProjectVariables.projectName+"Devices/"+this.ROOM.RoomNumber+"/"+this.ROOM.RoomNumber+this.Switch4.name+"/1")
    this.S4B2 = this.db.object("/"+AppComponent.ProjectVariables.projectName+"Devices/"+this.ROOM.RoomNumber+"/"+this.ROOM.RoomNumber+this.Switch4.name+"/2")
    this.S4B3 = this.db.object("/"+AppComponent.ProjectVariables.projectName+"Devices/"+this.ROOM.RoomNumber+"/"+this.ROOM.RoomNumber+this.Switch4.name+"/3")
    this.S4B4 = this.db.object("/"+AppComponent.ProjectVariables.projectName+"Devices/"+this.ROOM.RoomNumber+"/"+this.ROOM.RoomNumber+this.Switch4.name+"/4")
    this.S5B1 = this.db.object("/"+AppComponent.ProjectVariables.projectName+"Devices/"+this.ROOM.RoomNumber+"/"+this.ROOM.RoomNumber+this.Switch5.name+"/1")
    this.S5B2 = this.db.object("/"+AppComponent.ProjectVariables.projectName+"Devices/"+this.ROOM.RoomNumber+"/"+this.ROOM.RoomNumber+this.Switch5.name+"/2")
    this.S5B3 = this.db.object("/"+AppComponent.ProjectVariables.projectName+"Devices/"+this.ROOM.RoomNumber+"/"+this.ROOM.RoomNumber+this.Switch5.name+"/3")
    this.S5B4 = this.db.object("/"+AppComponent.ProjectVariables.projectName+"Devices/"+this.ROOM.RoomNumber+"/"+this.ROOM.RoomNumber+this.Switch5.name+"/4")
    this.S6B1 = this.db.object("/"+AppComponent.ProjectVariables.projectName+"Devices/"+this.ROOM.RoomNumber+"/"+this.ROOM.RoomNumber+this.Switch6.name+"/1")
    this.S6B2 = this.db.object("/"+AppComponent.ProjectVariables.projectName+"Devices/"+this.ROOM.RoomNumber+"/"+this.ROOM.RoomNumber+this.Switch6.name+"/2")
    this.S6B3 = this.db.object("/"+AppComponent.ProjectVariables.projectName+"Devices/"+this.ROOM.RoomNumber+"/"+this.ROOM.RoomNumber+this.Switch6.name+"/3")
    this.S6B4 = this.db.object("/"+AppComponent.ProjectVariables.projectName+"Devices/"+this.ROOM.RoomNumber+"/"+this.ROOM.RoomNumber+this.Switch6.name+"/4")
    this.S7B1 = this.db.object("/"+AppComponent.ProjectVariables.projectName+"Devices/"+this.ROOM.RoomNumber+"/"+this.ROOM.RoomNumber+this.Switch7.name+"/1")
    this.S7B2 = this.db.object("/"+AppComponent.ProjectVariables.projectName+"Devices/"+this.ROOM.RoomNumber+"/"+this.ROOM.RoomNumber+this.Switch7.name+"/2")
    this.S7B3 = this.db.object("/"+AppComponent.ProjectVariables.projectName+"Devices/"+this.ROOM.RoomNumber+"/"+this.ROOM.RoomNumber+this.Switch7.name+"/3")
    this.S7B4 = this.db.object("/"+AppComponent.ProjectVariables.projectName+"Devices/"+this.ROOM.RoomNumber+"/"+this.ROOM.RoomNumber+this.Switch7.name+"/4")
    this.S8B1 = this.db.object("/"+AppComponent.ProjectVariables.projectName+"Devices/"+this.ROOM.RoomNumber+"/"+this.ROOM.RoomNumber+this.Switch8.name+"/1")
    this.S8B2 = this.db.object("/"+AppComponent.ProjectVariables.projectName+"Devices/"+this.ROOM.RoomNumber+"/"+this.ROOM.RoomNumber+this.Switch8.name+"/2")
    this.S8B3 = this.db.object("/"+AppComponent.ProjectVariables.projectName+"Devices/"+this.ROOM.RoomNumber+"/"+this.ROOM.RoomNumber+this.Switch8.name+"/3")
    this.S8B4 = this.db.object("/"+AppComponent.ProjectVariables.projectName+"Devices/"+this.ROOM.RoomNumber+"/"+this.ROOM.RoomNumber+this.Switch8.name+"/4")
    this.ACPower = this.db.object("/"+AppComponent.ProjectVariables.projectName+"Devices/"+this.ROOM.RoomNumber+"/"+this.ROOM.RoomNumber+"AC"+"/power")
    this.ACSetTemp = this.db.object("/"+AppComponent.ProjectVariables.projectName+"Devices/"+this.ROOM.RoomNumber+"/"+this.ROOM.RoomNumber+"AC"+"/temp")
    this.ACFan = this.db.object("/"+AppComponent.ProjectVariables.projectName+"Devices/"+this.ROOM.RoomNumber+"/"+this.ROOM.RoomNumber+"AC"+"/fan")
    this.ACCurrentTemp =  this.db.object("/"+AppComponent.ProjectVariables.projectName+"/B"+this.ROOM.Building+"/F"+this.ROOM.Floor+"/R"+this.ROOM.RoomNumber+"/temp")
    this.ClientMessage = this.db.object("/"+AppComponent.ProjectVariables.projectName+"/B"+this.ROOM.Building+"/F"+this.ROOM.Floor+"/R"+this.ROOM.RoomNumber+"/ClientMessage")
    this.curtainRef = this.db.object("/"+AppComponent.ProjectVariables.projectName+"Devices/"+this.ROOM.RoomNumber+"/"+this.ROOM.RoomNumber+"Curtain/control")
  }

  ngAfterViewInit(){
    this.setActions()
  } 

  tabSelectChanged(event:any) {
    let tab = event.tab.textLabel
    switch (tab) {
      case this.texts.getText("door", AppComponent.language): 
        this.setLock()
      break
      case this.texts.getText("services", AppComponent.language):
        this.setServiceSwitch()
      break
      case this.texts.getText("lights", AppComponent.language):
        this.setLightSwitches()
      break
      case this.texts.getText("curtain", AppComponent.language):
        this.setCurtain()
      break
      case this.texts.getText("ac", AppComponent.language):
        this.setAcButtons()
      break
      case this.texts.getText("restaurants", AppComponent.language):
        
      break
    }
  }

  async setLock() {
    await this.LockRef.valueChanges().subscribe((result:number)=>{
      if (result == null) {
        this.LockVisible = false
      }
      else {
        this.LockVisible = true
      }
    })
  }

  async setLightSwitches() {
    await this.S1B1.valueChanges().subscribe((result:number)=>{
      this.Switch1.Button1.value = result
      this.checkSwitch1Visibility()
    })
    await this.S1B2.valueChanges().subscribe((result:number)=>{
      this.Switch1.Button2.value = result
      this.checkSwitch1Visibility()
    })
    await this.S1B3.valueChanges().subscribe((result:number)=>{
      this.Switch1.Button3.value = result
      this.checkSwitch1Visibility()
    })
    await this.S1B4.valueChanges().subscribe((result:number)=>{
      this.Switch1.Button4.value = result
      this.checkSwitch1Visibility()
    })
    await this.S2B1.valueChanges().subscribe((result:number)=>{
      this.Switch2.Button1.value = result
      this.checkSwitch2Visibility()
    })
    await this.S2B2.valueChanges().subscribe((result:number)=>{
      this.Switch2.Button2.value = result
      this.checkSwitch2Visibility()
    })
    await this.S2B3.valueChanges().subscribe((result:number)=>{
      this.Switch2.Button3.value = result
      this.checkSwitch2Visibility()
    })
    await this.S2B4.valueChanges().subscribe((result:number)=>{
      this.Switch2.Button4.value = result
      this.checkSwitch2Visibility()
    })
    await this.S3B1.valueChanges().subscribe((result:number)=>{
      this.Switch3.Button1.value = result
      this.checkSwitch3Visibility()
    })
    await this.S3B2.valueChanges().subscribe((result:number)=>{
      this.Switch3.Button2.value = result
      this.checkSwitch3Visibility()
    })
    await this.S3B3.valueChanges().subscribe((result:number)=>{
      this.Switch3.Button3.value = result
      this.checkSwitch3Visibility()
    })
    await this.S3B4.valueChanges().subscribe((result:number)=>{
      this.Switch3.Button4.value = result
      this.checkSwitch3Visibility()
    })
    await this.S4B1.valueChanges().subscribe((result:number)=>{
      this.Switch4.Button1.value = result
      this.checkSwitch4Visibility()
    })
    await this.S4B2.valueChanges().subscribe((result:number)=>{
      this.Switch4.Button2.value = result
      this.checkSwitch4Visibility()
    })
    await this.S4B3.valueChanges().subscribe((result:number)=>{
      this.Switch4.Button3.value = result
      this.checkSwitch4Visibility()
    })
    await this.S4B4.valueChanges().subscribe((result:number)=>{
      this.Switch4.Button4.value = result
      this.checkSwitch4Visibility()
    })

    await this.S5B1.valueChanges().subscribe((result:number)=>{
      this.Switch5.Button1.value = result
      this.checkSwitch5Visibility()
    })
    await this.S5B2.valueChanges().subscribe((result:number)=>{
      this.Switch5.Button2.value = result
      this.checkSwitch5Visibility()
    })
    await this.S5B3.valueChanges().subscribe((result:number)=>{
      this.Switch5.Button3.value = result
      this.checkSwitch5Visibility()
    })
    await this.S5B4.valueChanges().subscribe((result:number)=>{
      this.Switch5.Button4.value = result
      this.checkSwitch5Visibility()
    })

    await this.S6B1.valueChanges().subscribe((result:number)=>{
      this.Switch6.Button1.value = result
      this.checkSwitch6Visibility()
    })
    await this.S6B2.valueChanges().subscribe((result:number)=>{
      this.Switch6.Button2.value = result
      this.checkSwitch6Visibility()
    })
    await this.S6B3.valueChanges().subscribe((result:number)=>{
      this.Switch6.Button3.value = result
      this.checkSwitch6Visibility()
    })
    await this.S6B4.valueChanges().subscribe((result:number)=>{
      this.Switch6.Button4.value = result
      this.checkSwitch6Visibility()
    })

    await this.S7B1.valueChanges().subscribe((result:number)=>{
      this.Switch7.Button1.value = result
      this.checkSwitch7Visibility()
    })
    await this.S7B2.valueChanges().subscribe((result:number)=>{
      this.Switch7.Button2.value = result
      this.checkSwitch7Visibility()
    })
    await this.S7B3.valueChanges().subscribe((result:number)=>{
      this.Switch7.Button3.value = result
      this.checkSwitch7Visibility()
    })
    await this.S7B4.valueChanges().subscribe((result:number)=>{
      this.Switch7.Button4.value = result
      this.checkSwitch7Visibility()
    })

    await this.S8B1.valueChanges().subscribe((result:number)=>{
      this.Switch8.Button1.value = result
      this.checkSwitch8Visibility()
    })
    await this.S8B2.valueChanges().subscribe((result:number)=>{
      this.Switch8.Button2.value = result
      this.checkSwitch8Visibility()
    })
    await this.S8B3.valueChanges().subscribe((result:number)=>{
      this.Switch8.Button3.value = result
      this.checkSwitch8Visibility()
    })
    await this.S8B4.valueChanges().subscribe((result:number)=>{
      this.Switch8.Button4.value = result
      this.checkSwitch8Visibility()
    })
  }

  async setAcButtons() {
    await this.ACPower.valueChanges().subscribe((result:number)=>{
      if (result == null) {
        this.ACPowerVisible = false
      }
      else {
        this.ACPowerVisible = true
        this.ACPowerValue = result
        if (this.ACPowerValue == 0 || this.ACPowerValue == 2) {
          this.PowerACStatus = this.PowerACOff
          this.ACOffOrOn = false
        }
        else {
          this.PowerACStatus = this.PowerACOn
          this.ACOffOrOn = true
        }
      }
      this.setAcVisibility()
    })
    await this.ACSetTemp.valueChanges().subscribe((result:number)=>{
      if (result == null) {
        this.ACSetTempVisible = false
      }
      else {
        this.ACSetTempVisible = true
        this.ACTempLength = result.toString().length
        if (result.toString().length == 2) {
          this.SetTemp = result.toString()
          this.ACSetTempValue = result
        }
        else if (result.toString().length == 3) {
          this.SetTemp = (result*0.1).toString()
          this.ACSetTempValue = result*0.1
        }
      }
      this.setAcVisibility()
    })
    await this.ACFan.valueChanges().subscribe((result:string)=>{
      if (result == null) {
        this.ACFanVisible = false
      }
      else {
        this.ACFanValue = result
        this.ACFanVisible = true
        let im = document.getElementById("fanImage")
        if (result == "low" || result == "Low" || result == "LOW" || result == "0") {
          this.FanACStatus = this.FanACLow
        }
        else if (result == "med" || result == "Med" || result == "MED" || result == "1") {
          this.FanACStatus = this.FanACMed
        }
        else if (result == "high" || result == "High" || result == "HIGH" || result == "2") {
          this.FanACStatus = this.FanACHigh
        }
        else if (result == "auto" || result == "Auto" || result == "AUTO" || result == "3") {
          this.FanACStatus = this.FanACAuto
        }
      }
      this.setAcVisibility()
    })
    await this.ACCurrentTemp.valueChanges().subscribe((result:number)=>{
      if (result != null) {
          this.ACCurrentTempValue = result
      }
    })
  }

  async setClientMessage() {
    await this.ClientMessage.valueChanges().subscribe((result:any)=>{
      console.log("clientMessage "+result)
      if (result != null && result != undefined && result !="") {
        if (this.ClientMessageDialog == null) {
          let conf = new MatDialogConfig()
          conf.width = "60%"
          conf.data = {"message":result}
          this.ClientMessageDialog = this.dialog.open(ClientMessageDialogComponent,conf)
          this.ClientMessageDialog.afterClosed().subscribe(()=>{
            this.ClientMessage.set("")
            this.ClientMessageDialog = null
          })
        }
      }
    })
  }

  async getButtonsNames() {
    let S1B1Name = this.db.object("/"+AppComponent.ProjectVariables.projectName+"/B"+this.ROOM.Building+"/F"+this.ROOM.Floor+"/R"+this.ROOM.RoomNumber+"/Buttons/Switch1/1")
    S1B1Name.valueChanges().subscribe((result:any)=>{
      console.log(result)
      if(result != null) {
        this.Switch1.Button1.name = result
        this.Switch1.Button1.visible = true
      }
      else {
        this.Switch1.Button1.visible = false
      }
      this.checkSwitch1Visibility()
    })
    let S1B2Name = this.db.object("/"+AppComponent.ProjectVariables.projectName+"/B"+this.ROOM.Building+"/F"+this.ROOM.Floor+"/R"+this.ROOM.RoomNumber+"/Buttons/Switch1/2")
    S1B2Name.valueChanges().subscribe((result:any)=>{
      console.log(result)
      if(result != null) {
        this.Switch1.Button2.name = result
        this.Switch1.Button2.visible = true
      }
      else {
        this.Switch1.Button2.visible = false
      }
      this.checkSwitch1Visibility()
    })
    let S1B3Name = this.db.object("/"+AppComponent.ProjectVariables.projectName+"/B"+this.ROOM.Building+"/F"+this.ROOM.Floor+"/R"+this.ROOM.RoomNumber+"/Buttons/Switch1/3")
    S1B3Name.valueChanges().subscribe((result:any)=>{
      console.log(result)
      if(result != null) {
        this.Switch1.Button3.name = result
        this.Switch1.Button3.visible = true
      }
      else {
        this.Switch1.Button3.visible = false
      }
      this.checkSwitch1Visibility()
    })
    let S1B4Name = this.db.object("/"+AppComponent.ProjectVariables.projectName+"/B"+this.ROOM.Building+"/F"+this.ROOM.Floor+"/R"+this.ROOM.RoomNumber+"/Buttons/Switch1/4")
    S1B4Name.valueChanges().subscribe((result:any)=>{
      console.log(result)
      if(result != null) {
        this.Switch1.Button4.name = result
        this.Switch1.Button4.visible = true
      }
      else {
        this.Switch1.Button4.visible = false
      }
      this.checkSwitch1Visibility()
    })

    let S2B1Name = this.db.object("/"+AppComponent.ProjectVariables.projectName+"/B"+this.ROOM.Building+"/F"+this.ROOM.Floor+"/R"+this.ROOM.RoomNumber+"/Buttons/Switch2/1")
    S2B1Name.valueChanges().subscribe((result:any)=>{
      console.log(result)
      if(result != null) {
        this.Switch2.Button1.name = result
        this.Switch2.Button1.visible = true
      }
      else {
        this.Switch2.Button1.visible = false
      }
      this.checkSwitch2Visibility()
    })
    let S2B2Name = this.db.object("/"+AppComponent.ProjectVariables.projectName+"/B"+this.ROOM.Building+"/F"+this.ROOM.Floor+"/R"+this.ROOM.RoomNumber+"/Buttons/Switch2/2")
    S2B2Name.valueChanges().subscribe((result:any)=>{
      console.log(result)
      if(result != null) {
        this.Switch2.Button2.name = result
        this.Switch2.Button2.visible = true
      }
      else {
        this.Switch2.Button2.visible = false
      }
      this.checkSwitch2Visibility()
    })
    let S2B3Name = this.db.object("/"+AppComponent.ProjectVariables.projectName+"/B"+this.ROOM.Building+"/F"+this.ROOM.Floor+"/R"+this.ROOM.RoomNumber+"/Buttons/Switch2/3")
    S2B3Name.valueChanges().subscribe((result:any)=>{
      console.log(result)
      if(result != null) {
        this.Switch2.Button3.name = result
        this.Switch2.Button3.visible = true
      }
      else {
        this.Switch2.Button3.visible = false
      }
      this.checkSwitch2Visibility()
    })
    let S2B4Name = this.db.object("/"+AppComponent.ProjectVariables.projectName+"/B"+this.ROOM.Building+"/F"+this.ROOM.Floor+"/R"+this.ROOM.RoomNumber+"/Buttons/Switch2/4")
    S2B4Name.valueChanges().subscribe((result:any)=>{
      console.log(result)
      if(result != null) {
        this.Switch2.Button4.name = result
        this.Switch2.Button4.visible = true
      }
      else {
        this.Switch2.Button4.visible = false
      }
      this.checkSwitch2Visibility()
    })

    let S3B1Name = this.db.object("/"+AppComponent.ProjectVariables.projectName+"/B"+this.ROOM.Building+"/F"+this.ROOM.Floor+"/R"+this.ROOM.RoomNumber+"/Buttons/Switch3/1")
    S3B1Name.valueChanges().subscribe((result:any)=>{
      console.log(result)
      if(result != null) {
        this.Switch3.Button1.name = result
        this.Switch3.Button1.visible = true
      }
      else {
        this.Switch3.Button1.visible = false
      }
      this.checkSwitch3Visibility()
    })
    let S3B2Name = this.db.object("/"+AppComponent.ProjectVariables.projectName+"/B"+this.ROOM.Building+"/F"+this.ROOM.Floor+"/R"+this.ROOM.RoomNumber+"/Buttons/Switch3/2")
    S3B2Name.valueChanges().subscribe((result:any)=>{
      console.log(result)
      if(result != null) {
        this.Switch3.Button2.name = result
        this.Switch3.Button2.visible = true
      }
      else {
        this.Switch3.Button2.visible = false
      }
      this.checkSwitch3Visibility()
    })
    let S3B3Name = this.db.object("/"+AppComponent.ProjectVariables.projectName+"/B"+this.ROOM.Building+"/F"+this.ROOM.Floor+"/R"+this.ROOM.RoomNumber+"/Buttons/Switch3/3")
    S3B3Name.valueChanges().subscribe((result:any)=>{
      console.log(result)
      if(result != null) {
        this.Switch3.Button3.name = result
        this.Switch3.Button3.visible = true
      }
      else {
        this.Switch3.Button3.visible = false
      }
      this.checkSwitch3Visibility()
    })
    let S3B4Name = this.db.object("/"+AppComponent.ProjectVariables.projectName+"/B"+this.ROOM.Building+"/F"+this.ROOM.Floor+"/R"+this.ROOM.RoomNumber+"/Buttons/Switch3/4")
    S3B4Name.valueChanges().subscribe((result:any)=>{
      console.log(result)
      if(result != null) {
        this.Switch3.Button4.name = result
        this.Switch3.Button4.visible = true
      }
      else {
        this.Switch3.Button4.visible = false
      }
      this.checkSwitch3Visibility()
    })

    let S4B1Name = this.db.object("/"+AppComponent.ProjectVariables.projectName+"/B"+this.ROOM.Building+"/F"+this.ROOM.Floor+"/R"+this.ROOM.RoomNumber+"/Buttons/Switch4/1")
    S4B1Name.valueChanges().subscribe((result:any)=>{
      console.log(result)
      if(result != null) {
        this.Switch4.Button1.name = result
        this.Switch4.Button1.visible = true
      }
      else {
        this.Switch4.Button1.visible = false
      }
      this.checkSwitch4Visibility()
    })
    let S4B2Name = this.db.object("/"+AppComponent.ProjectVariables.projectName+"/B"+this.ROOM.Building+"/F"+this.ROOM.Floor+"/R"+this.ROOM.RoomNumber+"/Buttons/Switch4/2")
    S4B2Name.valueChanges().subscribe((result:any)=>{
      console.log(result)
      if(result != null) {
        this.Switch4.Button2.name = result
        this.Switch4.Button2.visible = true
      }
      else {
        this.Switch4.Button2.visible = false
      }
      this.checkSwitch4Visibility()
    })
    let S4B3Name = this.db.object("/"+AppComponent.ProjectVariables.projectName+"/B"+this.ROOM.Building+"/F"+this.ROOM.Floor+"/R"+this.ROOM.RoomNumber+"/Buttons/Switch4/3")
    S4B3Name.valueChanges().subscribe((result:any)=>{
      console.log(result)
      if(result != null) {
        this.Switch4.Button3.name = result
        this.Switch4.Button3.visible = true
      }
      else {
        this.Switch4.Button3.visible = false
      }
      this.checkSwitch4Visibility()
    })
    let S4B4Name = this.db.object("/"+AppComponent.ProjectVariables.projectName+"/B"+this.ROOM.Building+"/F"+this.ROOM.Floor+"/R"+this.ROOM.RoomNumber+"/Buttons/Switch4/4")
    S4B4Name.valueChanges().subscribe((result:any)=>{
      console.log(result)
      if(result != null) {
        this.Switch4.Button4.name = result
        this.Switch4.Button4.visible = true
      }
      else {
        this.Switch4.Button4.visible = false
      }
      this.checkSwitch4Visibility()
    })

    let S5B1Name = this.db.object("/"+AppComponent.ProjectVariables.projectName+"/B"+this.ROOM.Building+"/F"+this.ROOM.Floor+"/R"+this.ROOM.RoomNumber+"/Buttons/Switch5/1")
    S5B1Name.valueChanges().subscribe((result:any)=>{
      console.log(result)
      if(result != null) {
        this.Switch5.Button1.name = result
        this.Switch5.Button1.visible = true
      }
      else {
        this.Switch5.Button1.visible = false
      }
      this.checkSwitch5Visibility()
    })
    let S5B2Name = this.db.object("/"+AppComponent.ProjectVariables.projectName+"/B"+this.ROOM.Building+"/F"+this.ROOM.Floor+"/R"+this.ROOM.RoomNumber+"/Buttons/Switch5/2")
    S5B2Name.valueChanges().subscribe((result:any)=>{
      console.log(result)
      if(result != null) {
        this.Switch5.Button2.name = result
        this.Switch5.Button1.visible = true
      }
      else {
        this.Switch5.Button2.visible = false
      }
      this.checkSwitch5Visibility()
    })
    let S5B3Name = this.db.object("/"+AppComponent.ProjectVariables.projectName+"/B"+this.ROOM.Building+"/F"+this.ROOM.Floor+"/R"+this.ROOM.RoomNumber+"/Buttons/Switch5/3")
    S5B3Name.valueChanges().subscribe((result:any)=>{
      console.log(result)
      if(result != null) {
        this.Switch5.Button3.name = result
        this.Switch5.Button3.visible = true
      }
      else {
        this.Switch5.Button3.visible = false
      }
      this.checkSwitch5Visibility()
    })
    let S5B4Name = this.db.object("/"+AppComponent.ProjectVariables.projectName+"/B"+this.ROOM.Building+"/F"+this.ROOM.Floor+"/R"+this.ROOM.RoomNumber+"/Buttons/Switch5/4")
    S5B4Name.valueChanges().subscribe((result:any)=>{
      console.log(result)
      if(result != null) {
        this.Switch5.Button4.name = result
        this.Switch5.Button4.visible = true
      }
      else {
        this.Switch5.Button4.visible = false
      }
      this.checkSwitch5Visibility()
    })

    let S6B1Name = this.db.object("/"+AppComponent.ProjectVariables.projectName+"/B"+this.ROOM.Building+"/F"+this.ROOM.Floor+"/R"+this.ROOM.RoomNumber+"/Buttons/Switch6/1")
    S6B1Name.valueChanges().subscribe((result:any)=>{
      console.log(result)
      if(result != null) {
        this.Switch6.Button1.name = result
        this.Switch6.Button1.visible = true
      }
      else {
        this.Switch6.Button1.visible = false
      }
      this.checkSwitch6Visibility()
    })
    let S6B2Name = this.db.object("/"+AppComponent.ProjectVariables.projectName+"/B"+this.ROOM.Building+"/F"+this.ROOM.Floor+"/R"+this.ROOM.RoomNumber+"/Buttons/Switch6/2")
    S6B2Name.valueChanges().subscribe((result:any)=>{
      console.log(result)
      if(result != null) {
        this.Switch6.Button2.name = result
        this.Switch6.Button2.visible = true
      }
      else {
        this.Switch6.Button2.visible = false
      }
      this.checkSwitch6Visibility()
    })
    let S6B3Name = this.db.object("/"+AppComponent.ProjectVariables.projectName+"/B"+this.ROOM.Building+"/F"+this.ROOM.Floor+"/R"+this.ROOM.RoomNumber+"/Buttons/Switch6/3")
    S6B3Name.valueChanges().subscribe((result:any)=>{
      console.log(result)
      if(result != null) {
        this.Switch6.Button3.name = result
        this.Switch6.Button3.visible = true
      }
      else {
        this.Switch6.Button3.visible = false
      }
      this.checkSwitch6Visibility()
    })
    let S6B4Name = this.db.object("/"+AppComponent.ProjectVariables.projectName+"/B"+this.ROOM.Building+"/F"+this.ROOM.Floor+"/R"+this.ROOM.RoomNumber+"/Buttons/Switch6/4")
    S6B4Name.valueChanges().subscribe((result:any)=>{
      console.log(result)
      if(result != null) {
        this.Switch6.Button4.name = result
        this.Switch6.Button4.visible = true
      }
      else {
        this.Switch6.Button4.visible = false
      }
      this.checkSwitch6Visibility()
    })

    let S7B1Name = this.db.object("/"+AppComponent.ProjectVariables.projectName+"/B"+this.ROOM.Building+"/F"+this.ROOM.Floor+"/R"+this.ROOM.RoomNumber+"/Buttons/Switch7/1")
    S7B1Name.valueChanges().subscribe((result:any)=>{
      console.log(result)
      if(result != null) {
        this.Switch7.Button1.name = result
        this.Switch7.Button1.visible = true
      }
      else {
        this.Switch7.Button1.visible = false
      }
      this.checkSwitch7Visibility()
    })
    let S7B2Name = this.db.object("/"+AppComponent.ProjectVariables.projectName+"/B"+this.ROOM.Building+"/F"+this.ROOM.Floor+"/R"+this.ROOM.RoomNumber+"/Buttons/Switch7/2")
    S7B2Name.valueChanges().subscribe((result:any)=>{
      console.log(result)
      if(result != null) {
        this.Switch7.Button2.name = result
        this.Switch7.Button2.visible = true
      }
      else {
        this.Switch7.Button2.visible = false
      }
      this.checkSwitch7Visibility()
    })
    let S7B3Name = this.db.object("/"+AppComponent.ProjectVariables.projectName+"/B"+this.ROOM.Building+"/F"+this.ROOM.Floor+"/R"+this.ROOM.RoomNumber+"/Buttons/Switch7/3")
    S7B3Name.valueChanges().subscribe((result:any)=>{
      console.log(result)
      if(result != null) {
        this.Switch7.Button3.name = result
        this.Switch7.Button3.visible = true
      }
      else {
        this.Switch7.Button3.visible = false
      }
      this.checkSwitch7Visibility()
    })
    let S7B4Name = this.db.object("/"+AppComponent.ProjectVariables.projectName+"/B"+this.ROOM.Building+"/F"+this.ROOM.Floor+"/R"+this.ROOM.RoomNumber+"/Buttons/Switch7/4")
    S7B4Name.valueChanges().subscribe((result:any)=>{
      console.log(result)
      if(result != null) {
        this.Switch7.Button4.name = result
        this.Switch7.Button4.visible = true
      }
      else {
        this.Switch7.Button4.visible = false
      }
      this.checkSwitch7Visibility()
    })

    let S8B1Name = this.db.object("/"+AppComponent.ProjectVariables.projectName+"/B"+this.ROOM.Building+"/F"+this.ROOM.Floor+"/R"+this.ROOM.RoomNumber+"/Buttons/Switch8/1")
    S8B1Name.valueChanges().subscribe((result:any)=>{
      console.log(result)
      if(result != null) {
        this.Switch8.Button1.name = result
        this.Switch8.Button1.visible = true
      }
      else {
        this.Switch8.Button1.visible = false
      }
      this.checkSwitch8Visibility()
    })
    let S8B2Name = this.db.object("/"+AppComponent.ProjectVariables.projectName+"/B"+this.ROOM.Building+"/F"+this.ROOM.Floor+"/R"+this.ROOM.RoomNumber+"/Buttons/Switch8/2")
    S8B2Name.valueChanges().subscribe((result:any)=>{
      console.log(result)
      if(result != null) {
        this.Switch8.Button2.name = result
        this.Switch8.Button2.visible = true
      }
      else {
        this.Switch8.Button2.visible = false
      }
      this.checkSwitch8Visibility()
    })
    let S8B3Name = this.db.object("/"+AppComponent.ProjectVariables.projectName+"/B"+this.ROOM.Building+"/F"+this.ROOM.Floor+"/R"+this.ROOM.RoomNumber+"/Buttons/Switch8/3")
    S8B3Name.valueChanges().subscribe((result:any)=>{
      console.log(result)
      if(result != null) {
        this.Switch8.Button3.name = result
        this.Switch8.Button3.visible = true
      }
      else {
        this.Switch8.Button3.visible = false
      }
      this.checkSwitch8Visibility()
    })
    let S8B4Name = this.db.object("/"+AppComponent.ProjectVariables.projectName+"/B"+this.ROOM.Building+"/F"+this.ROOM.Floor+"/R"+this.ROOM.RoomNumber+"/Buttons/Switch8/4")
    S8B4Name.valueChanges().subscribe((result:any)=>{
      console.log(result)
      if(result != null) {
        this.Switch8.Button4.name = result
        this.Switch8.Button3.visible = true
      }
      else {
        this.Switch8.Button4.visible = false
      }
      this.checkSwitch8Visibility()
    })
  }

  setAcVisibility() {
    if (this.ACPowerVisible && this.ACSetTempVisible && this.ACFanVisible) {
      this.acVisible = true
    }
  }

  async setServiceSwitch() {
    await this.CleanupRef.valueChanges().subscribe((result:number)=>{
      if (result != null) {
        this.CleanupValue = result
        if (this.CleanupValue == 0) {
          this.setButtonOff("ServiceB1"+this.ROOM.RoomNumber)
          this.cleanupVisible = false
        }
        else {
          this.setButtonOn("ServiceB1"+this.ROOM.RoomNumber)
          this.cleanupVisible = true
        }
      }
    })
    await this.LaundryRef.valueChanges().subscribe({next:(result:number)=>{
      this.xx++
      if (result != null) {
        this.LaundryValue = result
        if (this.LaundryValue == 0) {
          this.setButtonOff("ServiceB2"+this.ROOM.RoomNumber)
          this.laundryVisible = false
        }
        else {
          this.setButtonOn("ServiceB2"+this.ROOM.RoomNumber)
          this.laundryVisible = true
        }
      }
    }})
    await this.DNDRef.valueChanges().subscribe((result:number)=>{
      if (result != null) {
        this.DNDValue = result
        if (this.DNDValue == 0) {
          this.setButtonOff("ServiceB3"+this.ROOM.RoomNumber)
          this.dndVisible = false
        }
        else {
          this.setButtonOn("ServiceB3"+this.ROOM.RoomNumber)
          this.dndVisible = true
        }
      }
    })
    await this.CheckoutRef.valueChanges().subscribe((result:number)=>{
      if (result != null) {
        this.CheckoutValue = result
        if (this.CheckoutValue == 0) {
          this.setButtonOff("ServiceB4"+this.ROOM.RoomNumber)
          this.checkoutVisible = false
        }
        else {
          this.setButtonOn("ServiceB4"+this.ROOM.RoomNumber)
          this.checkoutVisible = true
        }
      }
    })
    await this.RoomServiceRef.valueChanges().subscribe((result:number)=>{
      if (result != null) {
        this.RoomServiceValue = result
        if (this.RoomServiceValue == 0) {
          this.setButtonOff("ServiceB5"+this.ROOM.RoomNumber)
          this.roomServiceVisible = false
        }
        else {
          this.setButtonOn("ServiceB5"+this.ROOM.RoomNumber)
          this.roomServiceVisible = true
        }
      }
    })
    await this.RoomServiceTextRef.valueChanges().subscribe((result:number)=>{
      if (result != null) {

      }
    })
    await this.SOSRef.valueChanges().subscribe((result:number)=>{
      if (result != null) {
        this.SOSValue = result
        if (this.SOSValue == 0) {
          this.setButtonOff("ServiceB6"+this.ROOM.RoomNumber)
          this.sosVisible = false
        } 
        else {
          this.setButtonOn("ServiceB6"+this.ROOM.RoomNumber)
          this.sosVisible = true
        }
      }
    })
    await RoomComponent.RestaurantRef.valueChanges().subscribe((result:number)=>{
      if (result != null) {
        this.RestaurantValue = result
        if (this.RestaurantValue == 0) {
          this.restaurantVisibleIcon = false
        }
        else {
          this.restaurantVisibleIcon = true
        }
      }
    })
  }

  async setCurtain() {
    if (this.curtainRef != null) {
      this.curtainRef.valueChanges().subscribe((result) => {
        console.log("curtain res " + result)
        if (result == null) {
          this.curtainVisible = false
        }
        else {
          this.curtainVisible = true
          if (result == "open") {
            this.setButtonOn("curtainOpen")
            this.setButtonOff("curtainClose")
            this.setButtonOff("curtainStop")
            this.setButtonOff("curtainContinue")
          }
          else if (result == "close") {
            this.setButtonOn("curtainClose")
            this.setButtonOff("curtainOpen")
            this.setButtonOff("curtainStop")
            this.setButtonOff("curtainContinue")
          } 
          else if (result == "stop") {
            this.setButtonOn("curtainStop")
            this.setButtonOff("curtainClose")
            this.setButtonOff("curtainOpen")
            this.setButtonOff("curtainContinue")
          }
          else if (result == "continue") {
            this.setButtonOn("curtainContinue")
            this.setButtonOff("curtainStop")
            this.setButtonOff("curtainClose")
            this.setButtonOff("curtainOpen")
          }
        }
      })
    }
  }

  async setActions() {
    await this.setLightSwitches()
    await this.setCurtain()
    await this.setAcButtons()
    await this.setServiceSwitch()
    await this.setLock()
    await this.setClientMessage()
    await this.RoomStatusRef.valueChanges().subscribe((result:number)=>{
      if (result != null) {
        if (result != 2) {
          this.router.navigate(['login'])
        }
      }
    })
    this.getButtonsNames()
  }

  checkSwitch1Visibility() {

    if (this.Switch1.Button1.value == 3 || this.Switch1.Button1.value == 1) {
      this.setButtonOn("s1b1")
    }
    else if (this.Switch1.Button1.value == 0 || this.Switch1.Button1.value == 2) {
      this.setButtonOff("s1b1")
    }
    
    if (this.Switch1.Button2.value == 3 || this.Switch1.Button2.value == 1) {
      this.setButtonOn("s1b2")
    }
    else if (this.Switch1.Button3.value == 0 || this.Switch1.Button2.value == 2) {
      this.setButtonOff("s1b2")
    }
    
    if (this.Switch1.Button3.value == 3 || this.Switch1.Button3.value == 1) {
      this.setButtonOn("s1b3")
    }
    else if (this.Switch1.Button3.value == 0 || this.Switch1.Button3.value == 2) {
      this.setButtonOff("s1b3")
    }

    if (this.Switch1.Button4.value == 3 || this.Switch1.Button4.value == 1) {
      this.setButtonOn("s1b4")
    }
    else if (this.Switch1.Button4.value == 0 || this.Switch1.Button4.value == 2) {
      this.setButtonOff("s1b4")
    }
    
    if (this.Switch1.Button1.visible || this.Switch1.Button2.visible || this.Switch1.Button3.visible || this.Switch1.Button4.visible) {
      this.Switch1.visible = true
    }   
    this.setLightsVisibility()
  }

  checkSwitch2Visibility() {
    if (this.Switch2.Button1.value == 0 || this.Switch2.Button1.value == 2) {
      this.setButtonOff("s2b1")
    }
    else if (this.Switch2.Button1.value == 3 || this.Switch2.Button1.value == 1) {
      this.setButtonOn("s2b1")
    }
    
    if (this.Switch2.Button2.value == 0 || this.Switch2.Button2.value == 2) {
      this.setButtonOff("s2b2")
    }
    else if (this.Switch2.Button2.value == 3 || this.Switch2.Button2.value == 1) {
      this.setButtonOn("s2b2")
    }
    
    if (this.Switch2.Button3.value == 0 || this.Switch2.Button3.value == 2) {
      this.setButtonOff("s2b3")
    }
    else if (this.Switch2.Button3.value == 3 || this.Switch2.Button3.value == 1) {
      this.setButtonOn("s2b3")
    }
    
    if (this.Switch2.Button4.value == 0 || this.Switch2.Button4.value == 2) {
      this.setButtonOff("s2b4")
    }
    else if (this.Switch2.Button4.value == 3 || this.Switch2.Button4.value == 1) {
      this.setButtonOn("s2b4")
    }
    
    if (this.Switch2.Button1.visible || this.Switch2.Button2.visible || this.Switch2.Button3.visible ||this.Switch2.Button4.visible) {
      this.Switch2.visible = true
    }
    this.setLightsVisibility()
  }

  checkSwitch3Visibility() {
    if (this.Switch3.Button1.value == 0 || this.Switch3.Button1.value == 2) {
      this.setButtonOff("s3b1")
    }
    else if (this.Switch3.Button1.value == 3 || this.Switch3.Button1.value == 1) {
      this.setButtonOn("s3b1")
    }

    if (this.Switch3.Button2.value == 0 || this.Switch3.Button2.value == 2) {
      this.setButtonOff("s3b2")
    }
    else if (this.Switch3.Button2.value == 3 || this.Switch3.Button2.value == 1) {
      this.setButtonOn("s3b2")
    }
    
    if (this.Switch3.Button3.value == 0) {
      this.setButtonOff("s3b3")
    }
    else if (this.Switch3.Button3.value = 3) {
      this.setButtonOn("s3b3")
    }
    
    if (this.Switch3.Button4.value == 0) {
      this.setButtonOff("s3b4")
    }
    else if (this.Switch3.Button4.value = 3) {
      this.setButtonOn("s3b4")
    }
    
    if (this.Switch3.Button1.visible || this.Switch3.Button2.visible || this.Switch3.Button3.visible || this.Switch3.Button4.visible) {
      this.Switch3.visible = true
    }
    this.setLightsVisibility()
  }

  checkSwitch4Visibility() {
    if (this.Switch4.Button1.value == 0) {
      this.setButtonOff("s4b1")
    }
    else if (this.Switch4.Button1.value = 3) {
      this.setButtonOn("s4b1")
    }
    
    if (this.Switch4.Button2.value == 0) {
      this.setButtonOff("s4b2")
    }
    else if (this.Switch4.Button2.value = 3) {
      this.setButtonOn("s4b2")
    }
    
    if (this.Switch4.Button3.value == 0) {
      this.setButtonOff("s4b3")
    }
    else if (this.Switch4.Button3.value = 3) {
      this.setButtonOn("s4b3")
    }
  
    if (this.Switch4.Button4.value == 0) {
      this.setButtonOff("s4b4")
    }
    else if (this.Switch4.Button4.value = 3) {
      this.setButtonOn("s4b4")
    }
    
    if (this.Switch4.Button1.visible || this.Switch4.Button2.visible || this.Switch4.Button3.visible || this.Switch4.Button4.visible) {
      this.Switch4.visible = true
    }
    this.setLightsVisibility()
  }

  checkSwitch5Visibility() {
    if (this.Switch5.Button1.value == 0) {
      this.setButtonOff("s5b1")
    }
    else if (this.Switch5.Button1.value = 3) {
      this.setButtonOn("s5b1")
    }
  
    if (this.Switch5.Button2.value == 0) {
      this.setButtonOff("s5b2")
    }
    else if (this.Switch5.Button2.value = 3) {
      this.setButtonOn("s5b2")
    }
    
    if (this.Switch5.Button3.value == 0) {
      this.setButtonOff("s5b3")
    }
    else if (this.Switch5.Button3.value = 3) {
      this.setButtonOn("s5b3")
    }
  
    if (this.Switch5.Button4.value == 0) {
      this.setButtonOff("s5b4")
    }
    else if (this.Switch5.Button4.value = 3) {
      this.setButtonOn("s5b4")
    }
  
    if (this.Switch5.Button1.visible || this.Switch5.Button2.visible || this.Switch5.Button3.visible || this.Switch5.Button4.visible) {
      this.Switch5.visible = true
    }
    this.setLightsVisibility()
  }

  checkSwitch6Visibility() {
      if (this.Switch6.Button1.value == 0) {
        this.setButtonOff("s6b1")
      }
      else if (this.Switch6.Button1.value = 3) {
        this.setButtonOn("s6b1")
      }
    
      if (this.Switch6.Button2.value == 0) {
        this.setButtonOff("s6b2")
      }
      else if (this.Switch6.Button2.value = 3) {
        this.setButtonOn("s6b2")
      }
    
      if (this.Switch6.Button3.value == 0) {
        this.setButtonOff("s6b3")
      }
      else if (this.Switch6.Button3.value = 3) {
        this.setButtonOn("s6b3")
      }
    
        if (this.Switch6.Button4.value == 0) {
          this.setButtonOff("s6b4")
        }
        else if (this.Switch6.Button4.value = 3) {
          this.setButtonOn("s6b4")
        }
    
    if (this.Switch6.Button1.visible || this.Switch6.Button2.visible || this.Switch6.Button3.visible || this.Switch6.Button4.visible) {
      this.Switch6.visible = true
    }
    this.setLightsVisibility()
  }

  checkSwitch7Visibility() {
      if (this.Switch7.Button1.value == 0) {
        this.setButtonOff("s7b1")
      }
      else if (this.Switch7.Button1.value = 3) {
        this.setButtonOn("s7b1")
      }
    
      if (this.Switch7.Button2.value == 0) {
        this.setButtonOff("s7b2")
      }
      else if (this.Switch7.Button2.value = 3) {
        this.setButtonOn("s7b2")
      }
    
      if (this.Switch7.Button3.value == 0) {
        this.setButtonOff("s7b3")
      }
      else if (this.Switch7.Button3.value = 3) {
        this.setButtonOn("s7b3")
      }
    
        if (this.Switch7.Button4.value == 0) {
          this.setButtonOff("s7b4")
        }
        else if (this.Switch7.Button4.value = 3) {
          this.setButtonOn("s7b4")
        }
    
    if (this.Switch7.Button1.visible || this.Switch7.Button2.visible || this.Switch7.Button3.visible || this.Switch7.Button4.visible) {
      this.Switch7.visible = true
    }
    this.setLightsVisibility()
  }

  checkSwitch8Visibility() {
      if (this.Switch8.Button1.value == 0) {
        this.setButtonOff("s8b1")
      }
      else if (this.Switch8.Button1.value = 3) {
        this.setButtonOn("s8b1")
      }
    
      if (this.Switch8.Button2.value == 0) {
        this.setButtonOff("s8b2")
      }
      else if (this.Switch8.Button2.value = 3) {
        this.setButtonOn("s8b2")
      }
    
      if (this.Switch8.Button3.value == 0) {
        this.setButtonOff("s8b3")
      }
      else if (this.Switch8.Button3.value = 3) {
        this.setButtonOn("s8b3")
      }
    
        if (this.Switch8.Button4.value == 0) {
          this.setButtonOff("s8b4")
        }
        else if (this.Switch8.Button4.value = 3) {
          this.setButtonOn("s8b4")
        }
    
    if (this.Switch8.Button1.visible || this.Switch8.Button2.visible || this.Switch8.Button3.visible || this.Switch8.Button4.visible) {
      this.Switch8.visible = true
    }
    this.setLightsVisibility()
  }

  setLightsVisibility() {
    if (!this.Switch1.visible && !this.Switch2.visible && !this.Switch3.visible && !this.Switch4.visible && !this.Switch5.visible && !this.Switch6.visible && !this.Switch7.visible && !this.Switch8.visible) {
      this.lightsVisible = false
    }
    else {
      this.lightsVisible = true
    }
  }

  async openDoor() {
    let bg = document.getElementById("lock_bg")
    bg != null ? bg.classList.add("lockbg_animated") :null
    let image = document.getElementById("lock_image")
    image != null ? image.classList.add("lockImage_animated") : null
    let lockText = document.getElementById("lock_text")
    lockText != null ? lockText.innerHTML = "opening .. please wait" : null
    let url = AppComponent.apiUrlRoomsManagement + "addClientDoorOpen"
    let params = new FormData()
    params.append("room_id",this.ROOM.id)
    this.client.post(url,params).subscribe({next:(result)=>{
      let r = JSON.stringify(result)
      let res = JSON.parse(r)
      if (res.result == "success") {
        let LockRef = this.db.object("/"+AppComponent.ProjectVariables.projectName+"Devices/"+this.ROOM.RoomNumber+"/"+this.ROOM.RoomNumber+"Lock/1")
        LockRef.set(1)
        let RR = LockRef.valueChanges().subscribe({next:(result)=>{
          console.log(result)
          if (result == 1) {
            console.log("open orderd")
            lockText != null ? lockText.innerHTML = "open order sent" : null
          }
          else if (result == 0)  {
            console.log("open finished")
            lockText != null ? lockText.style.color = "green" : null
            lockText != null ? lockText.innerHTML = "Door Opened" : null
            image != null ? image.classList.remove("lockImage_animated") : null
            bg != null ? bg.classList.remove("lockbg_animated") : null
            bg != null ? bg.style.backgroundImage = "none" : null
            this.LockImage = "lock_open"
            let timer = setTimeout(()=>{
              this.LockImage = "lock"
              lockText != null ? lockText.style.color = "#001e3d" : null
              lockText != null ? lockText.innerHTML = "Door" : null
              bg != null ? bg.style.backgroundImage = "linear-gradient(0deg, #001e3d,#8397ac)" : null
              clearTimeout(timer)
            },1000*6)
            RR.unsubscribe()
          }
        },error:(error)=>{
          this.dialog.open(MessageDialogComponent,{data:{title :"Failed",Message:error}})
        }})
      }
      else {
        this.dialog.open(MessageDialogComponent,{data:{title :"Failed",Message:res.error}})
      }
    },error:(error)=>{
      console.log(error)
    }})

    //let TokenUrl = "https://openapi.tuyaeu.com/v1.0/token?grant_type=1?"
    //let t = Date.now()
    //let client_id = "d9hyvtdshnm3uvaun59d"
    //let OpenUrl = "/v1.0/token?grant_type=1"
    //let StringToSign:string = "GET" + "\n" + "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" + "\n" +"\n"+ OpenUrl
    //let sign = client_id + t + StringToSign 
    //this.encryptService.private_key = "825f9def941f456099798ccdc19112e9"
    //let encryption = this.encryptService.decrypt(sign, Algorithm.HmacSHA256)

    // let x = await fetch(TokenUrl,{method:'get', headers:{
    //   'client_id':client_id,
    //   't':t.toString(),
    //   'sign_method':'HMAC-SHA256',
    //   'sign':encryption
    // }}).then((response)=>{
    //     console.log(response.json()) 
    // })

    //let secret = "825f9def941f456099798ccdc19112e9"

    //let url = AppComponent.apiUrlRoomsManagement + "hmacSha265"
    // let params = new FormData()
    // params.append("value", sign)
    // params.append("key", secret)
    // this.client.post(url, params).subscribe({next:(result)=>{
    //   console.log(result)
    // },error:(error)=>{
    //   console.log(error)
    // }})

    //console.log("____________________________")
    //console.log(sign)
    //console.log(t)

    
    //let z = new ZigbeeLock()
    //z.getTokenFromApi()

  }

  setButtonOff(id:string) {
    let B = document.getElementById(id)
    if (B != null) {
      B.style.backgroundImage = this.ButtonOff
      B.style.color = "white"
    }
    else {
      //console.log(id +" null")
    }
  }

  setButtonOn(id:string) {
    let B = document.getElementById(id)
    if (B != null) {
      B.style.backgroundImage = this.ButtonOn
      B.style.color = "black"
    }
    else {
      //console.log(id +" null")
    }
  }

  setButtonVisible(v:boolean){
     if (v) {
      return "1"
     }
     return "0"
  }

  openCurtain() {
    this.curtainRef?.set("none")
    this.curtainRef?.set("open")
  }

  closeCurtain() {
    this.curtainRef?.set("none")
    this.curtainRef?.set("close")
  }

  stopCurtain() {
    this.curtainRef?.set("none")
    this.curtainRef?.set("stop")
  }

  continueCurtain() {
    this.curtainRef?.set("none")
    this.curtainRef?.set("continue")
  }

  acPowerClick() {
    if (this.ACPowerValue == 0 || this.ACPowerValue == 2) {
      this.ACPower.set("4")
      this.ACPower.set("1")
    }
    else if (this.ACPowerValue == 1 || this.ACPowerValue == 3) {
      this.ACPower.set("4")
      this.ACPower.set("2")
    }
  }

  acFanClick() {
    if (this.ACFanValue == "low" || this.ACFanValue == "Low" || this.ACFanValue == "LOW" || this.ACFanValue == "0") {
      switch (this.ACFanValue) {
        case "low" :
          this.ACFan.set("med")
          break
        case "Low" :
          this.ACFan.set("Med")
          break
        case "LOW" :
          this.ACFan.set("MED")
          break
        case "0" :
          this.ACFan.set("1")
          break
      }
    }
    else if (this.ACFanValue == "med" || this.ACFanValue == "Med" || this.ACFanValue == "MED" || this.ACFanValue == "1") {
      switch (this.ACFanValue) {
        case "med" :
          this.ACFan.set("high")
          break
        case "Med" :
          this.ACFan.set("High")
          break
        case "MED" :
          this.ACFan.set("HIGH")
          break
        case "1" :
          this.ACFan.set("2")
          break
      }
    }
    else if (this.ACFanValue == "high" || this.ACFanValue == "High" || this.ACFanValue == "HIGH" || this.ACFanValue == "2") {
      switch (this.ACFanValue) {
        case "high" :
          this.ACFan.set("auto")
          break
        case "High" :
          this.ACFan.set("Auto")
          break
        case "HIGH" :
          this.ACFan.set("AUTO")
          break
        case "2" :
          this.ACFan.set("3")
          break
      }
    }
    else if (this.ACFanValue == "auto" || this.ACFanValue == "Auto" || this.ACFanValue == "AUTO" || this.ACFanValue == "3") {
      switch (this.ACFanValue) {
        case "auto" :
          this.ACFan.set("low")
          break
        case "Auto" :
          this.ACFan.set("Low")
          break
        case "AUTO" :
          this.ACFan.set("LOW")
          break
        case "3" :
          this.ACFan.set("0")
          break
      }
    }
  }

  acUp() {
      if (this.ACSetTempValue < 34) {
        console.log(this.ACSetTempValue)
        this.ACSetTemp.set(++this.ACSetTempValue)
      }
  }

  acDown() {
      if (this.ACSetTempValue > 16) {
        this.ACSetTemp.set(--this.ACSetTempValue)
      }
  }

  cleanupClick(cRef:any,current:number) {
    console.log("clicked" + current)
    if (current > 0) {
        cRef.set(0)
    }
    else {
        let time = Date.now()
        cRef.set(time)
    }
  }

  laundryClick(lRef:any,current:number) {
      if (current > 0) {
          lRef.set(0)
          
      }
      else {
          let time = Date.now()
          lRef.set(time)
          
      }
  }

  dndClick(dRef:any,current:number) {
      if (current > 0) {
          dRef.set(0)
      }
      else {
          let time = Date.now()
          dRef.set(time)
      }
  }

  checkoutClick(chRef:any,current:number) {
      if (current > 0) {
          chRef.set(0)
      }
      else {
          let time = Date.now()
          chRef.set(time)
      }
  }

  roomServiceClick(rsRef:any,current:number) {
    if (current == 0) {
      let dconf = new MatDialogConfig()
      dconf.width = "60%"
      let d = this.dialog.open(RoomServiceDialogComponent,dconf)
      d.afterClosed().subscribe((result)=>{
        if (result != null) {
          let time = Date.now()
          rsRef.set(time)
          this.RoomServiceTextRef.set(result)
          this.addRoomServiceOrder(result)
        }
      })
    }
    else {
      rsRef.set(0)
      this.RoomServiceTextRef.set("")
      this.cancelRoomServiceOrder()
    }
  }

  sosClick(sosRef:any,current:number) {
    if (current == 0) {
      let dcon = new MatDialogConfig()
      dcon.data = {"title":"Sure ??","message":"you will send SOS order .. are you sure"}
      dcon.width = "50%"
      let d = this.dialog.open(ConfermationDialogComponent,dcon)
      d.afterClosed().subscribe((result)=>{
        if (result == 1) {
            let time = Date.now()
            sosRef.set(time)
        }
      })
    }
    else {
      sosRef.set(0)
    }
    
  }

  goToRestaurant(rest:FACILITY) {
    AppComponent.SelectedRestaurant = rest
    this.router.navigate(['restaurant'])
  }

  addRoomServiceOrder(order:string) {
    let url = AppComponent.apiUrlReservation + "addRoomServiceOrderRoomDevice"
    let params = new FormData()
    params.append("room_id",this.ROOM.id)
    params.append("order",order)
    this.client.post(url,params).subscribe({next:(result)=>{
      console.log(result)
    },error:(error)=>{
      console.log(error)
    }})    
  }

  cancelRoomServiceOrder() {
    let url = AppComponent.apiUrlReservation + "cancelServiceOrderControlDevice1"
    let params = new FormData()
    params.append("room_id",this.ROOM.id)
    params.append("order_type","RoomService")
    this.client.post(url,params).subscribe({next:(result)=>{
      console.log(result)
    },error:(error)=>{
      console.log(error)
    }})
  }

  setLanguage() {
    RoomComponent.door = this.texts.getText("door", AppComponent.language)
    RoomComponent.services = this.texts.getText("services", AppComponent.language)
    RoomComponent.lights = this.texts.getText("lights", AppComponent.language)
    RoomComponent.ac = this.texts.getText("ac", AppComponent.language)
    RoomComponent.sos = this.texts.getText("sos", AppComponent.language)
    RoomComponent.dnd = this.texts.getText("dnd", AppComponent.language)
    RoomComponent.restaurants = this.texts.getText("restaurants", AppComponent.language)
    RoomComponent.cleanup = this.texts.getText("cleanup", AppComponent.language)
    RoomComponent.laundry = this.texts.getText("laundry", AppComponent.language)
    RoomComponent.roomService = this.texts.getText("roomService", AppComponent.language)
    RoomComponent.checkout = this.texts.getText("checkout", AppComponent.language)
    RoomComponent.curtain = this.texts.getText("curtain", AppComponent.language)
  }

  getDoor() {
    return RoomComponent.door
  }
  getServices() {
    return RoomComponent.services
  }
  getAc() {
    return RoomComponent.ac
  }
  getLights() {
    return RoomComponent.lights
  }
  getCurtain() {
    return RoomComponent.curtain
  }
  getRestaurants() {
    return RoomComponent.restaurants
  }
  getCleanup() {
    return RoomComponent.cleanup
  }
  getDnd() {
    return RoomComponent.dnd
  }
  getSOS() {
    return RoomComponent.sos
  }
  getLaundry() {
    return RoomComponent.laundry
  }
  getRoomService() {
    return RoomComponent.roomService
  }
  getCheckout() {
    return RoomComponent.checkout
  }

  setLanguageXX() {
    let x = document.getElementById("xxx")
    x?.addEventListener("click", function() {
      let t = new Texts() 
      RoomComponent.door = t.getText("door", AppComponent.language)
      RoomComponent.services = t.getText("services", AppComponent.language)
      RoomComponent.lights = t.getText("lights", AppComponent.language)
      RoomComponent.ac = t.getText("ac", AppComponent.language)
      RoomComponent.sos = t.getText("sos", AppComponent.language)
      RoomComponent.dnd = t.getText("dnd", AppComponent.language)
      RoomComponent.restaurants = t.getText("restaurants", AppComponent.language)
      RoomComponent.cleanup = t.getText("cleanup", AppComponent.language)
      RoomComponent.laundry = t.getText("laundry", AppComponent.language)
      RoomComponent.roomService = t.getText("roomService", AppComponent.language)
      RoomComponent.checkout = t.getText("checkout", AppComponent.language)
      RoomComponent.curtain = t.getText("curtain", AppComponent.language)
    })
    x?.click()
  }

}
