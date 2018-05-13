import {Component} from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UtilityProvider} from "../../providers/utility/utility";
import {UploadfileServiceProvider} from "../../providers/uploadfile-service/uploadfile-service";

/**
 * Generated class for the NewdriversPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-newdrivers',
  templateUrl: 'newdrivers.html',
})
export class NewdriversPage {
  imagePath = "assets/imgs/add-user-male.png";
  driverForm: FormGroup;
  filetoUpload: any;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public navParams: NavParams,
              public utility: UtilityProvider, public actionSheetCtrl: ActionSheetController,
              public uploadfile: UploadfileServiceProvider) {
    this.driverForm = formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
      fname: ['', Validators.compose([Validators.maxLength(30)])],
      lname: ['', Validators.compose([Validators.maxLength(30)])],
      email: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
      image: [''],
      options: [1, Validators.required],
      // var: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriversPage');
  }

  selectimage() {
    this.presentActionSheet();
    console.log("new Image");
  }


  newDriver() {
    let status: { message: string, cssclass: string, action: boolean } = {message: "", cssclass: "", action: false};
    console.log(this.driverForm.value);
    if (this.driverForm.status == 'VALID') {
      console.log(this.driverForm.value)
      status.message = "Successful Login";
      status.cssclass = "success";
      status.action = false;

      // this.userservice.createAdmin(this.signupForm.value).then((response)=>{
      //   console.log(response);
      //   status.message = response;
      //   this.utility.callToast(status.message, status.cssclass, status.action);
      //   this.navCtrl.push('LoginPage');
      // });
      console.log()


    } else {
      status.message = "Invalid Data inputs";
      status.cssclass = "alert";
      status.action = false;
      this.utility.callToast(status.message, status.cssclass, status.action);
    }
  }

  fileUploadController(source) {
    this.uploadfile.getImage(source).then((result: any) => {
      console.log(result);
      this.filetoUpload = result;
      this.imagePath = result.imageUri;
    });
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Add Photo',
      buttons: [
        {
          text: 'Upload From Library',
          // cssClass: "actionsheet_fb",
          handler: () => {
            console.log('Destructive clicked');
            this.fileUploadController('library')
          }
        }, {
          text: 'Camera Capture',
          // cssClass: "actionsheet_tw",
          handler: () => {
            console.log('Archive clicked');
            this.fileUploadController('camera')
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
