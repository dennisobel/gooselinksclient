import { Component } from '@angular/core';
import { 
  IonicPage, 
  NavController, 
  NavParams, 
  ViewController,
  AlertController } from 'ionic-angular';

import { SubscribedProvider } from '../../providers/subscribed/subscribed';
import { LandingPage } from '../landing/landing';
import { Storage } from '@ionic/storage';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

@IonicPage()
@Component({
  selector: 'page-subscribed',
  templateUrl: 'subscribed.html',
})
export class SubscribedPage {
  private subscribedBooks:any;
  url: string;

  constructor(
    private inAppBrowser: InAppBrowser,
    private storage: Storage,
    private alertCtrl: AlertController,
    private subscription: SubscribedProvider,
    private viewCtrl: ViewController,
    private navCtrl: NavController, 
    private navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.subscription.getBooks().then((data:any) => {
      if(data.length === 0) {
        let noSubAlert = this.alertCtrl.create({
          title: 'Yo do not have any subscriptions yet.',
          buttons: [
            {
              text: 'Ok',
              handler: () => {
                this.navCtrl.setRoot(LandingPage)
              }
            }
          ],
          cssClass: 'alertCustomCss'
        })
        noSubAlert.present();
      } else {
        
          // filter
          this.subscribedBooks = data.filter(el => {
            console.log(el)
            return el.expiry > new Date().getTime()
          })
        
        // this.subscribedBooks = data;
        console.log("SUBSCRIBED BOOKS: ",this.subscribedBooks)
      }
      
      
    })
  }


  viewBook(book) {
    console.log(book)
  }

  giftFriend() {

  }

  deleteBook() {

  }

  close() {
    this.viewCtrl.dismiss();
  }

  home() {
    this.navCtrl.setRoot(LandingPage)
  }

  viewLink(link){
    const options: InAppBrowserOptions = {
      hardwareback:'yes',
      zoom:'no'
    }
    console.log("VIEW:",link)
    // window.open(`${link.url},'_self', 'location=yes'`);
    const browser = this.inAppBrowser.create(link.url,'_blank',options)    

  }

}
