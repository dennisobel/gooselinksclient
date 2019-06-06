import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';

import { SignupPage } from '../signup/signup';

@IonicPage()
@Component({
  selector: 'page-userpopover',
  templateUrl: 'userpopover.html',
})
export class UserpopoverPage {

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    this.presentPopover()
  }

  presentPopover() {
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
      SignupPage,
      {ev},
      {cssClass: 'alertCustomCss',showBackdrop: true},
  )
    popover.present({
      // ev: myEvent
    })
  }

}
