import { Component } from '@angular/core';
import { 
  IonicPage, 
  NavController, 
  ViewController,
  NavParams } from 'ionic-angular';
import { LandingPage } from '../landing/landing';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  private _private:boolean=false;

  constructor(
    private viewCtrl: ViewController,
    private navCtrl: NavController, 
    private navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  openFile(elemId) {
    let id = document.getElementById(elemId)
    if(id && document.createEvent) {
      let evt = document.createEvent('MouseEvents');
      evt.initEvent('click',true,false);
      id.dispatchEvent(evt);
    }
  }

  close() {
    this.viewCtrl.dismiss()
  }

  updateItem(state) {
    console.log(state)
    // to share or not to share
    this._private = state;
  }

  home() {
    this.navCtrl.setRoot(LandingPage)
  }

}
