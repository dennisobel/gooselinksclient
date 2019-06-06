import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { resolve } from 'dns'; 
 
@Injectable()
export class AuthenticationProvider {
  private offline = {
    ibookSignupURL: "http://localhost:4000/signup",
    ibookLoginURL: "http://localhost:4000/login",
    ibookOTPURL: "http://localhost:4000/otp",
  }

  constructor(public http: Http) {}

  ibookSignup(data){
    console.log("INCOMING SIGNUP DATA:",data)
    return new Promise((resolve,reject) => {
      let headers = new Headers(); 
      headers.append("Accept","application/json"); 
      headers.append("Content-Type","application/json");   
      
      this.http.post(this.offline.ibookSignupURL,data,{headers})
        .subscribe(res => {  
          resolve(res.json());
      },(err)=>{
          reject(err);
      });
    })
  }

  ibookLogin(data){
    console.log("LOGIN DATA TO POST:",data)
    return new Promise((resolve,reject) => {
      let headers = new Headers(); 
      headers.append("Accept","application/json"); 
      headers.append("Content-Type","application/json");   

      this.http.post(this.offline.ibookLoginURL,data,{headers})
        .subscribe(res => {  
          resolve(res.json());
      },(err)=>{
          reject(err);
      });
    })
  }

  ibookOTP(data){
    console.log("OUTGOING OTP DATA:",data)
    return new Promise((resolve,reject) => {
      let headers = new Headers(); 
      headers.append("Accept","application/json"); 
      headers.append("Content-Type","application/json");  

      this.http.post(this.offline.ibookOTPURL,data,{headers})
      .subscribe(res => {
        resolve(res.json());
      },(err)=>{
          reject(err);
      });
    })
  }

}
