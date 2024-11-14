export class RESTAURANT_MENU_ITEM {
    id:number
    facility_id:number
    restaurantorder:number
    menu:string
    name:string
    desc:string
    price:number
    descount:number
    photo:string

    constructor(id:number,facility_id:number,restaurantorder:number,menu:string,name:string,desc:string,price:number,descount:number,photo:string) {
        this.id = id 
        this.facility_id = facility_id
        this.restaurantorder = restaurantorder
        this.menu = menu
        this.name = name
        this.desc = desc
        this.price = price
        this.descount = descount
        this.photo = photo
    }
}