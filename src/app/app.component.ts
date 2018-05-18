import {Component, ViewChild} from '@angular/core';
import {MenuController, Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import {DbProvider} from "../providers/db/db";
import {UtilityProvider} from "../providers/utility/utility";
import {SignupPage} from "../pages/signup/signup";
import {UserserviceProvider} from "../providers/userservice/userservice";
import {DashboardPage} from "../pages/dashboard/dashboard";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  @ViewChild(Nav) nav: Nav;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, db: DbProvider, utility: UtilityProvider,
              public menu: MenuController, public userservice: UserserviceProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.menu.enable(false)
      utility.isFirstinstall().then((res) => {
        if (!res) {
          // utility.onFirstinstall();
          db.createTable();
          this.rootPage = SignupPage;
        } else {
          this.userservice.get_Admin_auth_Storage('Admin_auth').then((response) => {
            // console.log(response);
            console.log("Check for a loged in user" + JSON.stringify(response));
            if (response != null) {

              this.menu.enable(true)
              this.rootPage = DashboardPage;
            } else {
              console.log(response);
              this.rootPage = LoginPage;
            }
          });
          // this.rootPage = LoginPage;
        }
      });
    });
  }

  openPage(page) {
    if (page == 'DashboardPage') {
      this.nav.setRoot(page);
    } else {
      this.nav.push(page);

    }
    this.menu.close();
  }

  logout() {
    this.userservice.Admin_logout();
    this.menu.close();
    this.menu.enable(false);
    this.nav.setRoot(LoginPage);
  }
}

