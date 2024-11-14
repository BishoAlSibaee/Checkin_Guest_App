import { text } from "./text";

export class Texts {

    private Texts:text[]

    constructor() {
        this.Texts = []

        this.Texts.push(new text("welcomeTo","Welcome To","مرحبا بكم في"))
        this.Texts.push(new text("welcome","Welcome","مرحبا"))
        this.Texts.push(new text("reservationNumber","Reservation Number","رقم الحجز"))
        this.Texts.push(new text("checkin","Checkin","الدخول"))
        this.Texts.push(new text("checkout","CheckOut","الخروج"))
        this.Texts.push(new text("room","Room","الغرفة"))
        this.Texts.push(new text("door","Door","الباب"))
        this.Texts.push(new text("services","Services","الخدمات"))
        this.Texts.push(new text("lights","Lights","الاضاءة"))
        this.Texts.push(new text("curtain","Curtain","الستارة"))
        this.Texts.push(new text("ac","AC","المكيف"))
        this.Texts.push(new text("restaurants","Restaurants","المطعم"))
        this.Texts.push(new text("cleanup","Cleanup","نظافة"))
        this.Texts.push(new text("laundry","Laundry","المغسلة"))
        this.Texts.push(new text("dnd","DND","عدم الازعاج"))
        this.Texts.push(new text("sos","SOS","الطوارئ"))
        this.Texts.push(new text("roomService","Room Service","خدمة الغرف"))
    }

    getText(id:string,language:string) {
        for (let t of  this.Texts ) {
            if (t.id == id) {
                return t.getText(language)
            }
        }
        return "no translation"
    }
}