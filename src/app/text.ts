export class text {
    id:string
    private en:string
    private ar:string

    constructor(id:string,en:string,ar:string) {
        this.id = id
        this.en = en
        this.ar = ar
    }

    getText(language:string) {
        if (language == "ar") {
            return this.ar
        }
        else if (language == "en") {
            return this.en
        }
        return this.en
    }


}