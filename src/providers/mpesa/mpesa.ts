import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { resolve } from 'dns';

@Injectable()
export class MpesaProvider {
  private offline = {
    sendMpesaURL: "http://localhost:4000/sendmpesa"
  }  

  constructor(public http: Http) {}

  sendMpesa(data){
    return new Promise((resolve,reject) => {
      let headers = new Headers(); 
      headers.append("Accept","application/json"); 
      headers.append("Content-Type","application/json");  

      this.http.post(this.offline.sendMpesaURL,data,{headers})
      .subscribe(res => {  
        resolve(res.json());
      },(err)=>{
        reject(err);
      });
    })
  }

}
