export class SERVICE_SWITCH {
    cleanup:any
    laundry:any
    dnd:any
    checkout:any

    constructor(cleanup:string,laundry:string,dnd:string,checkout:string) {
        this.cleanup = cleanup
        this.laundry = laundry
        this.checkout = checkout
        this.dnd = dnd
    }

     cleanupClick(cRef:any,current:number) {
        console.log("clicked" + current)
        if (current > 0) {
            cRef.set(0)
        }
        else {
            let time = Date.now()
            cRef.set(time)
        }
    }

     laundryClick(lRef:any,current:number) {
        if (current > 0) {
            lRef.set(0)
        }
        else {
            let time = Date.now()
            lRef.set(time)
        }
    }

     dndClick(dRef:any,current:number) {
        if (current > 0) {
            dRef.set(0)
        }
        else {
            let time = Date.now()
            dRef.set(time)
        }
    }

     checkoutClick(chRef:any,current:number) {
        if (current > 0) {
            chRef.set(0)
        }
        else {
            let time = Date.now()
            chRef.set(time)
        }
    }
}