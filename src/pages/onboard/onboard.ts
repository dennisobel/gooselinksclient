import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';

@IonicPage()
@Component({
  selector: 'page-onboard',
  templateUrl: 'onboard.html',
})
export class OnboardPage {

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    this.presentPopover()
  }

  presentPopover() {
    let popover = this.popoverCtrl.create({
      component: SignupPage,
      cssClass: 'alertCustomCss',
      enableBackdropDismiss:false
      // translucent: true
    })
    popover.present({
      // ev: myEvent
    })
  }

}
