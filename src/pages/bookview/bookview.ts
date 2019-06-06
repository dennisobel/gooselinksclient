import { Component } from '@angular/core';
import { 
  IonicPage, 
  NavController, 
  NavParams,
  ViewController } from 'ionic-angular';
import { LandingPage } from '../landing/landing';



@IonicPage()
@Component({
  selector: 'page-bookview',
  templateUrl: 'bookview.html',
})
export class BookviewPage {
  private title:any;
  private description:any;
  private author:any;
  private pages:any;
  private website:any;

  constructor(
    private viewCtrl: ViewController,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    let book = this.navParams.get('book')
    console.log(book)
    this.title = book.title;
    this.description = book.description;
    this.author = book.author;
    this.pages = book.pages;
    this.website = book.website;
  }

  viewOnNet() {
    // handle view on net
  }

  close() {
    this.viewCtrl.dismiss()
  }

  home() {
    this.navCtrl.setRoot(LandingPage)
  }

}
