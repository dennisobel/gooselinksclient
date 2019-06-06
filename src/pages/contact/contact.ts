import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';
import { LandingPage } from '../landing/landing';

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
  @ViewChild('myInput') myInput: ElementRef;

  constructor(
    private viewCtrl: ViewController,
    private navCtrl: NavController, 
    private navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

  close() {
    this.viewCtrl.dismiss()
  }

  home() {
    this.navCtrl.setRoot(LandingPage)
  }

  call() {

  }

  text() {

  }

  email() {

  }

  resize() {
    this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
  }  

  submitEnquiry() {
    
  }

}
