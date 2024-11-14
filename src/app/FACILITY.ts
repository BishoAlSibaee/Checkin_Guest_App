export class FACILITY {
    id:number
    Hotel:number
    TypeId:number
    TypeName:string
    Name:string
    Control:number
    photo:string

    constructor(id:number,Hotel:number,TypeId:number,TypeName:string,Name:string,Control:number,photo:string) {
        this.id = id
        this.Hotel = Hotel
        this.TypeId = TypeId
        this.TypeName = TypeName
        this.Name = Name
        this.Control = Control
        this.photo = photo
    }

    static searchFacility(list:FACILITY[],id:number) {
        let f = null
        for (let i=0;i<list.length;i++) {
            if (list[i].id == id) {
                f = list[i]
            }
        }
        return f
    }


}