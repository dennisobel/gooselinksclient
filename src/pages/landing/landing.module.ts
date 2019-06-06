import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LongPressModule } from 'ionic-long-press';
import { LandingPage } from './landing';

@NgModule({
  declarations: [
    LandingPage,
  ],
  imports: [
    LongPressModule,
    IonicPageModule.forChild(LandingPage),
  ],
})
export class LandingPageModule {}
