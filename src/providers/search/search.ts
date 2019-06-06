import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { resolve } from 'dns';

@Injectable()
export class SearchProvider {
  private offline = {
    searchURL: "http://localhost:4000/search",
  }

  constructor(public http: Http) {}

  search(searchTerm){
    console.log("OUTGOING SEARCHTERM:",searchTerm)
    return new Promise((resolve,reject) => {
      let headers = new Headers(); 
      headers.append("Accept","application/json"); 
      headers.append("Content-Type","application/json");   

      this.http.post(this.offline.searchURL,{searchTerm},{headers})
      .subscribe((res) => {
        resolve(res.json());
      },(err) => {
        reject(err);
      })
    })

  }

}
