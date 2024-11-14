import { AngularFireDatabase } from "@angular/fire/compat/database"
import { ROOMCLASS } from "./ROOMCLASS"
import { BUTTON } from "./BUTTON"

export class SWITCH {
    name:string
    Button1:BUTTON
    Button2:BUTTON
    Button3:BUTTON
    Button4:BUTTON
    visible = false

    constructor(name:string) 
    {
        this.name = name
        this.Button1 = new BUTTON("1",1)
        this.Button2 = new BUTTON("2",2)
        this.Button3 = new BUTTON("3",3)
        this.Button4 = new BUTTON("4",4)
    }

    // getTHeValues(db:AngularFireDatabase,room:ROOMCLASS,projectName:string) {
    //     db.object("/"+projectName+"Devices/"+room.RoomNumber+"/"+room.RoomNumber+this.name+"/1").valueChanges().subscribe(result=>{
    //         console.log(this.name+"B1 "+result)
    //         this.Button1.buttonId = result
    //     })
    //     db.object("/"+projectName+"Devices/"+room.RoomNumber+"/"+room.RoomNumber+this.name+"/2").valueChanges().subscribe(result=>{
    //         console.log(this.name+"B2 "+result)
    //         this.Button2.buttonId = result
    //     })
    //     db.object("/"+projectName+"Devices/"+room.RoomNumber+"/"+room.RoomNumber+this.name+"/3").valueChanges().subscribe(result=>{
    //         console.log(this.name+"B3 "+result)
    //         this.Button3.buttonId = result
    //     })
    //     db.object("/"+projectName+"Devices/"+room.RoomNumber+"/"+room.RoomNumber+this.name+"/4").valueChanges().subscribe(result=>{
    //         console.log(this.name+"B4 "+result)
    //         this.Button4.buttonId = result
    //     })
    // }
}