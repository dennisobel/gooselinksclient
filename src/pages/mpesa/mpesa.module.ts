import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MpesaPage } from './mpesa';

@NgModule({
  declarations: [
    MpesaPage,
  ],
  imports: [
    IonicPageModule.forChild(MpesaPage),
  ],
})
export class MpesaPageModule {}
