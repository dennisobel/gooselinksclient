import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubscribedPage } from './subscribed';

@NgModule({
  declarations: [
    SubscribedPage,
  ],
  imports: [
    IonicPageModule.forChild(SubscribedPage),
  ],
})
export class SubscribedPageModule {}
