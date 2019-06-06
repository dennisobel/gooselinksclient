import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { resolve } from 'dns';

@Injectable()
export class FriendsProvider {
  private offline = {
    getFriendURL: "http://localhost:4000/getfriend/"
  }

  constructor(public http: Http) {}

  findFriend(phoneNumber){
    return new Promise((resolve,reject) => {
      this.http.get(this.offline.getFriendURL+phoneNumber)
      .subscribe(res => {
          resolve(res.json());
      },(err)=>{
          reject(err);
      });
    })
  }

  requestFriend(){

  }

  acceptRequest(){

  }

  deleteFriend(){

  }

}
