import { Component } from '@angular/core';
import { 
  IonicPage, 
  NavController, 
  ToastController, 
  ModalController,
  NavParams,
  ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FriendcollectionPage } from '../friendcollection/friendcollection';
import { LandingPage } from '../landing/landing';
import { FriendsProvider } from '../../providers/friends/friends';

@IonicPage()
@Component({
  selector: 'page-giftfriends',
  templateUrl: 'giftfriends.html',
})
export class GiftfriendsPage {
  private storedFriendsList:any[]=[];
  private gift:any[]=[];
  private searchTerm:any;
  private friend:any;
  private friendsArray:any[]=[];

  constructor(
    private storage: Storage,
    private friends: FriendsProvider,
    private modalCtrl: ModalController,
    private viewCtrl: ViewController,
    private toastCtrl: ToastController, 
    private navCtrl: NavController, 
    private navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    this.storage.get('friendsArray').then(data => {
      this.storedFriendsList = data;
      console.log(this.storedFriendsList)
    })

    if(this.storedFriendsList.length > 0){
      this.presentToast('Swipe left on single item for more options or check multiple items for bulk action',0,true,'middle')
    }
    
    this.gift = this.navParams.get('book');
    console.log(this.gift);
  }

  presentToast(message,duration,close,position) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      showCloseButton: close,
      position: position
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  close() {
    this.viewCtrl.dismiss();
  }

  viewCollection() {
    this.modalCtrl.create(FriendcollectionPage).present()
  }

  giftBook(book) {
    console.log(book)
  }

  home() {
    this.navCtrl.setRoot(LandingPage)
  }

  getItems(){
    this.friends.findFriend(this.searchTerm).then((data:any) => {
      console.log("GET FRIEND SERVER FEEDBACK:",data)
      this.friend = data.user[0]
    })
  }

  addAsFriend(friend){
    if(this.friendsArray.includes(friend)){
      console.log("FRIEND EXISTS")
      this.presentToast('User already exists in your friends list',3000,false,'middle')
    }else if(!this.friendsArray.includes(friend)){
      this.friendsArray.push(friend)
      this.storage.set('friendsArray',this.friendsArray)
      .then(()=>{
        this.ionViewDidLoad()
      })	
    }
  }
}
