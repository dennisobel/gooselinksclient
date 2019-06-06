import { Component, ViewChild } from '@angular/core';
import { 
  IonicPage, 
  NavController, 
  NavParams, 
  AlertController,
  ToastController, 
  Platform,
  LoadingController,
  PopoverController, 
  ModalController,
} from 'ionic-angular';



import { DateformatPipe } from '../../pipes/dateformat/dateformat';
import { SamplebooksProvider } from '../../providers/samplebooks/samplebooks';
import { SearchProvider } from '../../providers/search/search';
import { BookviewPage } from '../bookview/bookview';
import { ResultmodalPage } from '../resultmodal/resultmodal';
import { SubscribedPage } from '../subscribed/subscribed';

import { SubscribedProvider } from '../../providers/subscribed/subscribed';
import { MpesaProvider } from '../../providers/mpesa/mpesa';
import { GiftfriendsPage } from '../giftfriends/giftfriends';
import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {
 

  private categories = "popular"
  private freeArray:any[]=[
    {
      title: "Jumia",
      url: "http://www.jumia.com",
      image:"assets/imgs/jumia.png"
    },
  ];
  private loader: any = this.loadingCtrl.create(
    {
      content: 'Searching...'
    }
  );

  private userData:any;
  private booksArray:any;
  private searchTerm: string = '';
  private searchResults: any;
  private multipleSelect:any[]=[];
  private showBulkAction:boolean = false;
  private showSubscribe:boolean = false;
  private showGift:boolean = false;

  constructor(
    private search: SearchProvider,
    private mpesa: MpesaProvider,
    private subscribed: SubscribedProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private toastCtrl: ToastController, 
    private popoverCtrl: PopoverController,
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private books: SamplebooksProvider) {
  }

  ionViewDidLoad() {
    this.userData = this.navParams.get('data')
    console.log("USERDATA:",this.userData)
    this.presentToast('Swipe left on single item for more options or check multiple items for bulk action',0,true,'middle')
    this.books.getBooks().then((data) => {      
      this.booksArray = data;
      console.log("BOOKS: ",this.booksArray)
    })
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

  subscribeBook(link) {
    let mpesaAlert = this.alertCtrl.create({
      title:`About to add "${link.title} by "${link.author}" to subscribed books @ Ksh 10.00`,
      buttons: [
        {
          text:'Ok',
          handler:()=>{
            let data = {
              user:this.userData.data,
              link
            }





            
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
                       



































            /*
            this.subscribed.subscribe(data)
            .then((data:any) => {
              console.log("SERVER FEEDBACK:",data)
            })
            */
            // handle stk push
            /*
            this.mpesa.sendMpesa(null)
            .then(()=>{
              
            })
            /*
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
            */
          }
        }
      ],
      cssClass: 'alertCustomCss'
    })
    mpesaAlert.present();
  }

  viewDescription(book) {
    this.presentPopover(BookviewPage,book)
  }

  giftFriend(book) {
    let modal = this.modalCtrl.create(GiftfriendsPage,{book})
    modal.present()
  }

  openSubscriptions() {
   this.navCtrl.push(SubscribedPage);
  }

  openProfile() {
    this.navCtrl.push(ProfilePage);
  }

  getItems() {
    console.log("SEARCH TERM: ",this.searchTerm)
    this.loader.present()
    this.search.search(this.searchTerm)
    .then((data:any) => {
      console.log("SEARCH RESULTS",data)
      let searchResult = {
        title:this.searchTerm,
        searchResults:data,
        userData:this.userData
      }

      let resultModal = this.modalCtrl.create(
        ResultmodalPage,
        {searchResult}
      )

      resultModal.present()
    })
    .then(()=>{
      this.loader.dismiss()
    })

    /*

    let searchResults = this.booksArray.filter((el:any) => {
      return el.title.includes(this.searchTerm)
    })

    this.searchResults = searchResults;

    // logic to push search results to modal

    let resultModal = this.modalCtrl.create(
      ResultmodalPage,
      {data:this.searchResults}
    )
    resultModal.present();
    */
  }

  datachanged(data) {
    // chage showBulkAction state

    console.log("BODY AND EVENT:",data)



    
    console.log(this.multipleSelect.length)
    let subscribed = new Date().getTime();
    let expiresIn = 1*60*1000;
    let expires = subscribed + expiresIn;

    console.log("VALUE:",data.ev.value)
    let _data = {
      image:data.book.image,
      title:data.book.title,
      url:data.book.url,
      subscribedAt:subscribed,
      expiry:expires      
    }



    if(data.ev.value == true) {
      this.multipleSelect.push(_data)

      if(this.multipleSelect.length <= 0) {
        this.showBulkAction = false;
      } else if(this.multipleSelect.length > 0){
        this.showBulkAction = true;
      }

      console.log(this.multipleSelect)
    }else if(data.ev.value == false) {
      // find index of selected item
      let index = this.multipleSelect.indexOf(data.book)
      console.log(this.multipleSelect)
      this.multipleSelect.splice(index,1)

      if(this.multipleSelect.length <= 0) {
        this.showBulkAction = false;
      } else if(this.multipleSelect.length > 0){
        this.showBulkAction = true;
      }

      console.log(this.multipleSelect)
    }
  }

  // long press
  pressed() {
    console.log("presed")
  }

  active() {
    this.showSubscribe = true;
  }

  released() {
    this.showSubscribe = false;
  }

  giftPressed() {
    console.log("presed")
  }

  giftActive() {
    this.showGift = true;
  }

  giftReleased() {
    this.showGift = false;
  }  

  addBulkSubscriptions() {
    console.log("MULTIPLE SELECT:",this.multipleSelect)
    this.subscribed.bulkSubscribe(this.multipleSelect).then(()=>{
      this.presentToast('Added to subscription',6000,true,'middle')
    })
  }

  addBulkGiftFriend(){

  }

  firendsList() {
    this.navCtrl.push(GiftfriendsPage)
  }

}
