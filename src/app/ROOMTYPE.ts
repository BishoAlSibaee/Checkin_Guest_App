export class ROOMTYPE {
    id:number
    hotelId:number
    hotel:string
    type:string

    constructor(id:number,hotelId:number,hotel:string,type:string) {
        this.id = id
        this.hotelId = hotelId
        this.hotel = hotel
        this.type = type
    }


}