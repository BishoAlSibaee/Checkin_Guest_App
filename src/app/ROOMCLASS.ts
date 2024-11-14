import { AppComponent } from "./app.component"
import { Reservation } from "./Reservation"
import { ROOMTYPE } from "./ROOMTYPE"

export class ROOMCLASS {
    Building:any
    CheckInModeTime:any
    CheckOutModeTime:any
    Checkout:any
    Cleanup:any
    CurtainSwitch:any
    DND:any
    DoorSensor:any
    DoorWarning:any
    Facility:any
    Floor:any
    Laundry:any
    LockGateway:any
    LockName:any
    Logo:any
    MiniBarCheck:any
    MotionSensor:any
    PowerSwitch:any
    ReservationNumber:any
    Restaurant:any
    RoomNumber:any
    RoomService:any
    RoomServiceText:any
    RoomType:any
    SOS:any
    ServiceSwitch:any
    SetPointInterval:any
    Status:any
    SuiteId:any
    SuiteNumber:any
    SuiteStatus:any
    Switch1:any
    Switch2:any
    Switch3:any
    Switch4:any
    Tablet:any
    TempSetPoint:any
    Thermostat:any
    WelcomeMessage:any
    ZBGateway:any
    building_id:any
    created_at:any
    curtainStatus:any
    dep:any
    doorStatus:any
    floor_id:any
    guestIs:any
    hotel:any
    id:any
    lock:any
    online:any
    powerStatus:any
    roomStatus:any
    temp:any
    token:any
    selected:any
    loading:any
    message:any
    ClientIn:any
    reservation:Reservation|any


    static searchRoom(rooms:ROOMCLASS[][],roomNumber:number) : ROOMCLASS{
        let result :ROOMCLASS = rooms[0][0]
        for (let i=0;i<rooms.length;i++) {
            for (let j=0;j<rooms[i].length;j++) {
                if (rooms[i][j].RoomNumber == roomNumber) {
                    return rooms[i][j]
                    break
                }
            }
        }
        return result
    }

}