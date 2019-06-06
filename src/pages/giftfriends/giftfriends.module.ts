import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GiftfriendsPage } from './giftfriends';

@NgModule({
  declarations: [
    GiftfriendsPage,
  ],
  imports: [
    IonicPageModule.forChild(GiftfriendsPage),
  ],
})
export class GiftfriendsPageModule {}
