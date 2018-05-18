import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {LoginPage} from "../pages/login/login";
import {LoginPageModule} from "../pages/login/login.module";
import {DbProvider} from '../providers/db/db';
import {SQLite} from '@ionic-native/sqlite';
import {UtilityProvider} from '../providers/utility/utility';
import {IonicStorageModule} from "@ionic/storage";
import {SignupPageModule} from "../pages/signup/signup.module";
import {SignupPage} from "../pages/signup/signup";
import {UserserviceProvider} from '../providers/userservice/userservice';
import {CarserviceProvider} from '../providers/carservice/carservice';
import {TransactionserviceProvider} from '../providers/transactionservice/transactionservice';
import {DashboardPage} from "../pages/dashboard/dashboard";
import {DashboardPageModule} from "../pages/dashboard/dashboard.module";
import {UploadfileServiceProvider} from "../providers/uploadfile-service/uploadfile-service";
import {Camera} from "@ionic-native/camera";
import {File} from "@ionic-native/file";
import {FilePath} from "@ionic-native/file-path";
import {UpdateusersPage} from "../pages/updateusers/updateusers";
import {UpdatecarsPage} from "../pages/updatecars/updatecars";
import {UpdateusersPageModule} from "../pages/updateusers/updateusers.module";
import {UpdatecarsPageModule} from "../pages/updatecars/updatecars.module";

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    LoginPageModule,
    SignupPageModule,
    DashboardPageModule,
    UpdateusersPageModule,
    UpdatecarsPageModule


  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    DashboardPage,
    UpdateusersPage,
    UpdatecarsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DbProvider,
    SQLite,
    UtilityProvider,
    UserserviceProvider,
    CarserviceProvider,
    TransactionserviceProvider,
    UploadfileServiceProvider,
    Camera,
    File,
    FilePath,
    CarserviceProvider

  ]
})
export class AppModule {}
