export class RESTAURANT_MENU {
    id:number
    FacilityId:number
    name:string
    arabicName:string
    photo:string

    constructor (id:number,FacilityId:number,name:string,arabicName:string,photo:string) {
        this.id = id
        this.FacilityId = FacilityId
        this.name = name
        this.arabicName = arabicName
        this.photo = photo
    }
}