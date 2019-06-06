import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, PopoverController } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { OtpPage } from '../otp/otp';
import { resolve } from 'path';
import { LoginPage } from '../login/login';
 
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  private signup : FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authProvider: AuthenticationProvider,
    private navCtrl: NavController, 
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private popoverCtrl: PopoverController) {

      this.signup = this.formBuilder.group({
        userName:['',Validators.required],
        phoneNumber:['',Validators.required],
        password:['',Validators.required]
      })
  }

  ionViewDidLoad() {
    
  }

  presentPopover(page,data) {
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
      {ev,data},
      {cssClass: 'alertCustomCss',showBackdrop: true},
  )
    popover.present({
      // ev: myEvent
    })
  }

  handleOTP(page) {
    // console.log(this.signup.value)
    this.authProvider.ibookSignup({data:this.signup.value})
    .then((data:any)=>{
      console.log("SIGNUP FEEDBACK:",data)
      if(data.exist == true){
        // HANDLE LOGIN
        return new Promise((resolve,reject) => {
          resolve(this.viewCtrl.dismiss())
        }).then(() => {
          this.presentPopover(LoginPage,null)
        })
      }else if(data.exist == false){
        // HANDLE OTP
        return new Promise((resolve,reject) => {
          resolve(this.viewCtrl.dismiss())
        }).then(() => {
          this.presentPopover(page,{data})
        })
      }
    })
    /*

    */
  }

  handleLogin(page){
    return new Promise((resolve,reject) => {
      resolve(this.viewCtrl.dismiss())
    }).then(() => {
      this.presentPopover(LoginPage,null)
    })
  }

}
