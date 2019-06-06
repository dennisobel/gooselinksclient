import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, PopoverController, App } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationProvider } from '../../providers/authentication/authentication'
import { LandingPage } from '../landing/landing';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private login: FormGroup;
  private nav:any; 
  private loader: any = this.loadingCtrl.create(
    {
      content: 'Please wait while we log you in...'
    }
  );

  constructor(
    private appCtrl: App,
    private formBuilder: FormBuilder,
    private authProvider: AuthenticationProvider,
    private viewCtrl: ViewController,
    private loadingCtrl: LoadingController,
    private popoverCtrl: PopoverController,
    private navCtrl: NavController, 
    private navParams: NavParams) {

      this.login = this.formBuilder.group({
        userName:['',Validators.required],
        password:['',Validators.required]
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  handleLogin(page){
    // this.nav.setRoot(page)
    this.loader.present()    
    this.nav = this.appCtrl.getRootNavById('n4')
    this.authProvider.ibookLogin({data:this.login.value})

      .then((data:any)=>{
        // let _data = data
        console.log("LOGIN POST FEEDBACK:",data)
        return new Promise((resolve,reject) => {
          resolve(this.viewCtrl.dismiss())
        })
        .then(() => {
          // this.presentPopover(page)
          console.log("SERVER FEEDBACK:",data)
          this.nav.setRoot(page,{data})
        })      
    })
    .then(()=>{
      this.loader.dismiss()
    })
    
  }

  presentPopover(page) {
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
      {ev},
      {cssClass: 'alertCustomCss',showBackdrop: true},
  )
    popover.present({
      // ev: myEvent
    })
  }

}
