import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UtilityProvider} from "../../providers/utility/utility";
import {UserserviceProvider} from "../../providers/userservice/userservice";

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  signupForm: FormGroup;
  login = "LoginPage";

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder,
              public utility: UtilityProvider, public userservice: UserserviceProvider) {
    this.signupForm = formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
      fname: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
      lname: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
      email: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
      password: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
      cpassword: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  Signup() {
    let status: { message: string, cssclass: string, action: boolean } = {message: "", cssclass: "", action: false};
    if (this.signupForm.status == 'VALID') {
      console.log(this.signupForm.value)
      status.message = "Successful Login";
      status.cssclass = "success";
      status.action = false;
      if (this.signupForm.value.password == this.signupForm.value.cpassword) {
        this.userservice.createAdmin(this.signupForm.value).then((response) => {
          console.log(response);
          status.message = response;
          this.utility.callToast(status.message, status.cssclass, status.action);
          this.navCtrl.push('LoginPage');
        });
      } else {
        status.message = "Passwords do not match";
        this.utility.callToast(status.message, status.cssclass, status.action);
      }


    } else {
      status.message = "Invalid Data inputs";
      status.cssclass = "alert";
      status.action = false;
      this.utility.callToast(status.message, status.cssclass, status.action);
    }
  }


}
