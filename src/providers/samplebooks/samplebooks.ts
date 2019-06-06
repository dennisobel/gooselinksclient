import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { resolve } from 'path';

/*
  Generated class for the SamplebooksProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SamplebooksProvider {
  books:any;
  constructor(public http: HttpClient) {
    console.log('Hello SamplebooksProvider Provider');
  }

  getBooks () {

    return new Promise((resolve,reject) => {
      resolve(
        this.books = 
          [
            {
              title: "Facebook",
              url: "http://www.facebook.com",
              image:"assets/imgs/logos/facebook.jpg"
            },
            {
              title: "Instagram",
              url: "http://www.instagram.com",
              image:"assets/imgs/logos/instagram.png"
            },     
            {
              title: "Twitter",
              url: "http://www.twitter.com",
              image:"assets/imgs/logos/twitter.jpg"
            },  
            {
              title: "Citizen",
              url: "http://www.citizentv.co.ke",
              image:"assets/imgs/logos/citizen.png"
            },  
            {
              title: "NTV",
              url: "https://ntv.nation.co.ke",
              image:"assets/imgs/logos/ntv.jpg"
            },  
            {
              title: "KTN",
              url: "https://www.standardmedia.co.ke/ktnhome/",
              image:"assets/imgs/logos/ktn.jpg"
            },        
            {
              title: "Netflix",
              url: "https://www.netflix.com/",
              image:"assets/imgs/logos/netflix.png"
            },     
            {
              title: "Youtube",
              url: "https://www.youtube.com",
              image:"assets/imgs/logos/youtube.png"
            },      
            {
              title: "WhatsApp",
              url: "https://web.whatsapp.com",
              image:"assets/imgs/logos/whatsapp.jpg"
            }, 
            {
              title: "Sportpesa",
              url: "https://www.sportpesa.com",
              image:"assets/imgs/logos/sportpesa.jpg"
            }, 
            {
              title: "Betin",
              url: "https://www.betin.co.ke",
              image:"assets/imgs/logos/betin.jpg"
            },   
                     
          ]
      )
    })

  
  }

}
