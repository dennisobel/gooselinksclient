import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'; 
import { LongPressModule } from 'ionic-long-press';
import { IonicStorageModule } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { WelcomePage } from '../pages/welcome/welcome';
import { OnboardPage } from '../pages/onboard/onboard';
import { SignupPage } from '../pages/signup/signup';
import { OtpPage } from '../pages/otp/otp';
import { UserpopoverPage } from '../pages/userpopover/userpopover';
import { BookviewPage } from '../pages/bookview/bookview';
import { ResultmodalPage } from '../pages/resultmodal/resultmodal';
import { SubscribedPage } from '../pages/subscribed/subscribed';
import { GiftfriendsPage } from '../pages/giftfriends/giftfriends';
import { ProfilePage } from '../pages/profile/profile';
import { UpdateprofilePage } from '../pages/updateprofile/updateprofile';
import { FriendcollectionPage } from '../pages/friendcollection/friendcollection';
import { LandingPage } from '../pages/landing/landing';
import { LoginPage } from '../pages/login/login';
import { ContactPage } from '../pages/contact/contact';



import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SamplebooksProvider } from '../providers/samplebooks/samplebooks';
import { BookviewProvider } from '../providers/bookview/bookview';
import { SubscribedProvider } from '../providers/subscribed/subscribed';
// import { PhotoViewer } from '@ionic-native/photo-viewer';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { FriendsProvider } from '../providers/friends/friends';
import { MpesaProvider } from '../providers/mpesa/mpesa';
import { SearchProvider } from '../providers/search/search';

import { DateformatPipe } from '../pipes/dateformat/dateformat';



@NgModule({
  declarations: [
    MyApp,
    // HomePage,
    // ListPage,
    WelcomePage,
    // OnboardPage,
    // UserpopoverPage,
    SignupPage,
    // OtpPage,
    BookviewPage,
    ResultmodalPage,
    SubscribedPage,
    GiftfriendsPage,
    ProfilePage,
    UpdateprofilePage,
    FriendcollectionPage,
    // LandingPage,
    ContactPage,
    LoginPage,
    DateformatPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    LongPressModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // HomePage,
    // ListPage,
    WelcomePage,
    // OnboardPage,
    // UserpopoverPage,
    SignupPage,
    // OtpPage,
    BookviewPage,
    ResultmodalPage,
    SubscribedPage,
    GiftfriendsPage,
    ProfilePage,
    UpdateprofilePage,
    FriendcollectionPage,
    // LandingPage,
    ContactPage,
    LoginPage
  ],
  providers: [    
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    InAppBrowser,
    PhotoViewer,
    SamplebooksProvider,
    BookviewProvider,
    SubscribedProvider,
    AuthenticationProvider,
    FriendsProvider,
    MpesaProvider,
    SearchProvider,
  ]
})
export class AppModule {}
