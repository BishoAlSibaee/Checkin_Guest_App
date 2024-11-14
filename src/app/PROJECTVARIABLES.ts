export class PROJECTVARIABLES {
    id:number
    projectName:string
    Hotel:number
    Temp:number
    Interval:number
    DoorWarning:number
    CheckinModeActive:number
    CheckInModeTime:number
    CheckinActions:string|any
    CheckoutModeActive:number
    CheckOutModeTime:number
    CheckoutActions:string|any
    WelcomeMessage:string
    Logo:string
    PoweroffClientIn:number
    PoweroffAfterHK:number
    ACSenarioActive:number
    OnClientBack:string|any
    HKCleanupTime:number
    TuyaClientId:string
    TuyaClientSecret:string
    ServiceSwitchButtons:string


    constructor(id:number,projectName:string,Hotel:number,Temp:number,Interval:number,DoorWorning:number,ChecnInModeTime:number,CheckOutModeTime:number,WelcomeMessage:string,Logo:string,PowerTurnOffClientIn:number,PowerTurnOffRoomService:number,ACSenarioActive:number,HKCleanupTime:number,CheckinModeActive:number,CheckoutModeActive:number,tuyaid:string,tuyasecret:string,ServiceSwitchButtons:string) {
        this.id = id
        this.projectName = projectName
        this.Hotel = Hotel
        this.Temp = Temp
        this.Interval = Interval
        this.DoorWarning = DoorWorning
        this.CheckInModeTime = ChecnInModeTime
        this.CheckOutModeTime = CheckOutModeTime
        this.WelcomeMessage = WelcomeMessage
        this.Logo = Logo
        this.PoweroffClientIn = PowerTurnOffClientIn
        this.PoweroffAfterHK = PowerTurnOffRoomService
        this.ACSenarioActive = ACSenarioActive
        this.HKCleanupTime = HKCleanupTime
        this.CheckinModeActive = CheckinModeActive
        this.CheckoutModeActive = CheckoutModeActive
        this.TuyaClientId = tuyaid
        this.TuyaClientSecret = tuyasecret
        this.ServiceSwitchButtons = ServiceSwitchButtons
    }


}