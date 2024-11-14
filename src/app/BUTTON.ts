export class BUTTON {
    name:string
    buttonId:number
    value:number|null = null
    visible = false

    constructor(name:string,id:number) {
        this.name = name
        this.buttonId = id
    }

    clicked(Reference:any) {
        if (this.value == 0 || this.value == 2) {
            Reference.set(1)
          }
          else if (this.value == 1 || this.value == 3) {
            Reference.set(2)
          }
    }

}