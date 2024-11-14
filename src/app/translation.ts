export class translation {

    id:number 
    private name:string
    private en:string
    private ar:string

    constructor(id:number,name:string,en:string,ar:string) {
        this.id = id
        this.name = name
        this.en = en
        this.ar = ar
    }

    getEnglish() {
        return this.en
    }

    getArabic() {
        return this.ar
    }

    getName() {
        return this.name
    }

}