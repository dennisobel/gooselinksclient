import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { resolve } from 'dns';
import { Storage } from '@ionic/storage';

@Injectable()
export class SubscribedProvider {
  private offline = {
    subscribeURL: "http://localhost:4000/subscribe"
  }

  books:any[]=[]

  constructor(
    private http: Http,
    private storage: Storage) {}

  stkPush(){
    return new Promise((resolve,reject) => {
      resolve(/*Value forn now*/ true)
    })
  }

  subscribe(data) {
    console.log(data)
    return new Promise((resolve,reject) => {
      let headers = new Headers(); 
      headers.append("Accept","application/json"); 
      headers.append("Content-Type","application/json"); 
      // resolve(this.books.push(book))

      this.http.post(this.offline.subscribeURL,data,{headers})
      .subscribe(res => {  
        resolve(res.json());
      },(err)=>{
          reject(err);
      });
    })
    
    // console.log(this.books)
  }

  getBooks(){
    return new Promise((resolve,reject) => {
      this.storage.get('links').then(data => {
        let links = data
        resolve(links)
      })
      
    })
  }

  bulkSubscribe(books) {
    return new Promise((resolve,reject) => {
      resolve(this.books = this.books.concat(books))

      this.storage.set('links',this.books)
      console.log("After bulk subscribe:",this.books)
    })
  }

}
