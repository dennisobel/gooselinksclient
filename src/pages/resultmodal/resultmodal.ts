import { Component } from '@angular/core';
import { 
  IonicPage, 
  NavController, 
  PopoverController, 
  AlertController,
  ViewController,
  ModalController,
  ToastController,
  LoadingController,
  NavParams 
} from 'ionic-angular';

import moment from 'moment';


import { BookviewPage } from '../bookview/bookview';
import { SubscribedPage } from '../subscribed/subscribed';
import { GiftfriendsPage } from '../giftfriends/giftfriends';

import { SubscribedProvider } from '../../providers/subscribed/subscribed';
import { LandingPage } from '../landing/landing';

@IonicPage()
@Component({
  selector: 'page-resultmodal',
  templateUrl: 'resultmodal.html',
})
export class ResultmodalPage {

  private resultCategories = 'web'
  private booksArray: any;
  private userData:any;

  // REAL THING
  private searchResult: any;
  private links: any;
  private title: any;
  private newsLinks: any;

  constructor(
    private loadingCtrl: LoadingController,
    private subscribed: SubscribedProvider,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private viewCtrl: ViewController, 
    private navParams: NavParams,
    private popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    this.presentToast('Double tap to subscribe',5000,false,'top')
    this.searchResult = this.navParams.get('searchResult')
    // this.userData = this.searchResult.userData;
    console.log("SEARCH RESULTS: ",this.searchResult);

    if(this.searchResult.searchResults.result.webPages){
      this.links = this.searchResult.searchResults.result.webPages.value;
    }

    if(this.searchResult.searchResults.result.news){
      this.newsLinks = this.searchResult.searchResults.result.news.value;
    }else{
      this.newsLinks = [
        {
          description:"No News",
          datePublished:moment(new Date()).format("DD/MM/YYYY"),
          name:"No News"
        }
      ]
    }

    this.title = this.searchResult.title
  }

  presentPopover(page,book) {
    // Pass book data
    let ev = {
      target : {
        getBoundingClientRect : () => {
          return {
            top: '100', left:'100'
          };
        }
      }
    };
    let popover = this.popoverCtrl.create(
      page,
      {ev,book},
      {cssClass: 'alertCustomCss',showBackdrop: true},
  )
    popover.present({
      // ev: myEvent
      
    })
  }

  subscribeBook(book) {
    let mpesaAlert = this.alertCtrl.create({
      title:`About to add "${book.title} by "${book.author}" to subscribed books @ Ksh 10.00`,
      buttons: [
        {
          text:'Ok',
          handler:()=>{
            // handle stk push
            this.subscribed.stkPush().then((data) => {
              if(data === true){
                // handle add to subscribed
                this.subscribed.subscribe(book).then(()=>{
                  let subscribedAlert = this.alertCtrl.create({
                    title:`${book.title} added to your subscribed books list.`,
                    buttons: [
                      {
                        text:'View Subscriptions',
                        handler: () => {
                          this.navCtrl.push(SubscribedPage);
                        }
                      }
                    ],
                    cssClass: 'alertCustomCss'
                  })

                  subscribedAlert.present()
                })
              }
            })
          }
        }
      ],
      cssClass: 'alertCustomCss'
    })
    mpesaAlert.present();
  }

  viewDescription(book) {
    console.log(book)
    this.presentPopover(BookviewPage,book)
  }  

  giftFriend(book) {
    let modal = this.modalCtrl.create(GiftfriendsPage,{book})
    modal.present()
  }

  close() {
    this.viewCtrl.dismiss();
  }

  home() {
    this.navCtrl.setRoot(LandingPage);
  }

  presentToast(message,duration,close,position) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      showCloseButton:close,
      position: position
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }  

  subscribe(link){
    console.log("SUBSCRIBE TO:",link)
    // this.subscribed.subscribe()
    let subscribed = new Date().getTime();
    let expiresIn = 1*60*1000;
    let expires = subscribed + expiresIn;

    let _link = [{
      title: link.name,
      url: link.url,
      image:"assets/icon/favicon.ico",
      subscribedAt:subscribed,
      expiry:expires      
    }]

    console.log(_link)

    let subscriptionData = {
      // user:this.userData.data,
      link
    }

    this.subscribed.bulkSubscribe(_link).then(()=>{
      let loader: any = this.loadingCtrl.create(
        {
          content: 'Processing subscription, please wait...',
          duration:20000
        }
      );        
      loader.present()
      // this.presentToast('Added to subscription',3000,false,'middle')
    })

    this.subscribed.subscribe(subscriptionData)  
    .then((data:any) => {
      console.log("SERVER FEEDBACK:",data)
      // this.loader.dismiss()
    })   
    .catch(err => {
      // this.presentToast('Sorry for the inconvenience, service is currently undergoing maintenance. We will inform you when we are back online',null,true,'top')
      // this.loader.dismiss()
    }) 
  }

  openSubscriptions() {
    this.navCtrl.push(SubscribedPage);
   }  

}
