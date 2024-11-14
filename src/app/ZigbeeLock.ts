import { HttpClient } from "@angular/common/http"
import { AppComponent } from "./app.component"
import { sha256 } from "js-sha256"
import { Observable } from "rxjs"
import { HmacSHA256, SHA256 } from "crypto-js"
//import * as crypto from 'crypto'


export class ZigbeeLock {

    client_id = "d9hyvtdshnm3uvaun59d"
    client_secret = "825f9def941f456099798ccdc19112e9"
    TokenUrl:string = "https://openapi.tuyaeu.com/v1.0/token?grant_type=1?"
    OpenUrl:string = "/v1.0/token?grant_type=1"
    StringToSign:string = "GET" + "\n" + "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" + "\n" +"\n"+ this.OpenUrl

    async getTokenFromApi() : Promise<any> {
        let t = Date.now()
        let sign = this.client_id + t + this.StringToSign 
        //let params = new FormData()
        //var hash = SHA256(sign + this.client_secret)
        //var hash = CryptoJS.HmacSHA256(sign, this.client_secret)
        //var hashInBase64 = hash.toString().toUpperCase()
        // console.log(hashInBase64)
        // params.append("client_id", clientId)
        // params.append("t", t.toString())
        // params.append("sign_method", "HMAC-SHA256")
        // params.append("sign", hashInBase64)

        //let vvv = '265cc9843c1a9032b5fe119cfb74e384038bf36e5b6f64f0dda719368dbbe323'
        
        let vvv = this.sha256HMAC(sign, this.client_secret)

        console.log(vvv)

        let x = await fetch(this.TokenUrl,{method:'get', headers:{
            'client_id':this.client_id,
            't':t.toString(),
            'sign_method':'HMAC-SHA256',
            'sign': vvv
        }}).then((response)=>{
            console.log(response.json()) 
        })

        

        // await client.get(this.TokenUrl+"client_id="+clientId+"&t="+t.toString()+"&sign_method=HMAC-SHA256&sign="+hashInBase64).subscribe({next:(result)=>{
        //     console.log(result)
        //     return result
        // },error:(error)=>{
        //     console.log(error)
        //     return error
        // }})
    }

    sha256HMAC(content: string, secret: string): string { 
        //const hmac = crypto.createHmac('sha256', secret); 
        //const digest = hmac.update(content, 'utf8').digest('hex'); 
        //return digest.toUpperCase(); }
        return ""
    }
}