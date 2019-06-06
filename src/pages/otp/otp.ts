import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LandingPage } from '../landing/landing';
import { AuthenticationProvider } from '../../providers/authentication/authentication'


@IonicPage()
@Component({
  selector: 'page-otp',
  templateUrl: 'otp.html',
})
export class OtpPage {
  private otpform: FormGroup;
  private nav:any;
  private otpData:any={};

  constructor(
    private formBuilder: FormBuilder,
    private authProvider: AuthenticationProvider,
    private appCtrl: App,
    private viewCtrl: ViewController,
    private navCtrl: NavController, 
    private navParams: NavParams) {

      this.otpform = this.formBuilder.group({
        onetimepassword:['',Validators.required]
      })
  }

  ionViewDidLoad() {
    // this.otpData = this.navParams.get('data');
    console.log("_data:",this.otpData);
  }

  handleOTP(page) {
    this.nav = this.appCtrl.getRootNavById('n4')
    // let otp:any = this.otpform.value
    this.otpData = {val1:this.navParams.get('data'),val2:this.otpform.value}
    this.authProvider.ibookOTP(this.otpData).then((data:any)=>{
      console.log("SERVER OTP FEEDBACK:",data)
      if(data.success == true){
        return new Promise((resolve,reject) => {
          resolve(this.viewCtrl.dismiss())
        }).then(() => {
          // this.navCtrl.setRoot(page);
          this.nav.setRoot(page)
        })
      }else if(data.success == false){
        // Handle Resend OTP
        console.log("RESEND OTP")
      }
    })

  }

  resendOTP() {

  }

}
