import { RESTAURANT_MENU_ITEM } from "./RESTAURANT_MENU_ITEM";

export class ORDER_ITEM {

    Item:RESTAURANT_MENU_ITEM
    Quantity:number

    constructor(item:RESTAURANT_MENU_ITEM,quantity:number) {
        this.Item = item
        this.Quantity = quantity
    }
}