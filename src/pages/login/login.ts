import {Component} from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UtilityProvider} from "../../providers/utility/utility";
import {UserserviceProvider} from "../../providers/userservice/userservice";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
  signup = "SignupPage"

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder,
              public utility: UtilityProvider, public userservice: UserserviceProvider, public menuCtrl: MenuController) {
    this.loginForm = formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
      password: ['', Validators.compose([Validators.required, Validators.maxLength(30)])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  Login() {
    let status: { message: string, cssclass: string, action: boolean } = {message: "", cssclass: "", action: false};
    if (this.loginForm.status == 'VALID') {
      console.log(this.loginForm.value)
      this.userservice.authAdmin(this.loginForm.value).then((res) => {
        status.message = res.message;
        status.cssclass = "success";
        status.action = false;
        if (res.status) {
          this.menuCtrl.enable(true);
          this.navCtrl.setRoot('DashboardPage');
        }
        this.utility.callToast(status.message, status.cssclass, status.action);
      });


    } else {
      status.message = "Invalid Username or Password";
      status.cssclass = "alert";
      status.action = false;
      this.utility.callToast(status.message, status.cssclass, status.action);
    }
  }


}
