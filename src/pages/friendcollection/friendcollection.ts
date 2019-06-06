import { Component } from '@angular/core';
import { 
  IonicPage, 
  NavController, 
  ViewController,
  NavParams } from 'ionic-angular';

import { SamplebooksProvider } from '../../providers/samplebooks/samplebooks';
import { WelcomePage } from '../welcome/welcome';
import { LandingPage } from '../landing/landing';


@IonicPage()
@Component({
  selector: 'page-friendcollection',
  templateUrl: 'friendcollection.html',
})
export class FriendcollectionPage {
  private booksArray:any;

  constructor(
    private books: SamplebooksProvider,
    private viewCtrl: ViewController,
    private navCtrl: NavController, 
    private navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.books.getBooks().then((data) => {      
      this.booksArray = data;
      console.log("BOOKS: ",this.booksArray)
    })
  }

  close() {
    this.viewCtrl.dismiss()
  }

  home() {
    this.navCtrl.setRoot(LandingPage)
  }

}
