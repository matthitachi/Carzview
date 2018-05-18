import {Component} from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UtilityProvider} from "../../providers/utility/utility";
import {UploadfileServiceProvider} from "../../providers/uploadfile-service/uploadfile-service";
import {UserserviceProvider} from "../../providers/userservice/userservice";
import {Car} from "../../Model/car";
import {CarserviceProvider} from "../../providers/carservice/carservice";

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
  // imagePath = "file:///data/user/0/io.account.CarsView/files/images/Esdjfhghkfhfnj%2Cfk.jpg";
  imagePath = "assets/imgs/add-user-male.png";
  driverForm: FormGroup;
  filetoUpload: any;
  cars: Car[];

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public navParams: NavParams,
              public utility: UtilityProvider, public actionSheetCtrl: ActionSheetController,
              public uploadfile: UploadfileServiceProvider, public userservice: UserserviceProvider,
              public carservice: CarserviceProvider) {
    this.getCars();
    this.driverForm = formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
      fname: ['', Validators.compose([Validators.maxLength(30)])],
      lname: ['', Validators.compose([Validators.maxLength(30)])],
      email: ['', Validators.compose([Validators.maxLength(30)])],
      phone: ['', Validators.compose([Validators.maxLength(30)])],
      image: [''],
      options: ['', Validators.required],
      desc: ['', Validators.compose([Validators.maxLength(100)])],
      // var: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriversPage');
  }

  getCars() {
    this.carservice.GetAllCars().then((res: any) => {
      if (res.status) {
        this.cars = res.data;
      }
    });
  }

  selectimage() {
    this.presentActionSheet();
    console.log("new Image");
  }


  newDriver() {
    let loading = this.utility.presentLoadingDefault();
    let status: { message: string, cssclass: string, action: boolean } = {message: "", cssclass: "", action: false};
    console.log(this.driverForm.value);
    if (this.driverForm.status == 'VALID') {
      console.log(this.driverForm.value)
      let newpath = "";
      if (this.filetoUpload != null) {
        newpath = this.uploadfile.filesPath + this.filetoUpload.options.fileName;
      }
      this.driverForm.value.image = newpath;
      this.userservice.createDriver(this.driverForm.value).then((response: any) => {
        console.log(response);
        status.message = response.message;
        if (response.status) {
          if (this.filetoUpload != null) {
            this.uploadfile.saveImage(this.imagePath, this.filetoUpload.options.fileName);
          }
          this.driverForm.reset();
        }
        loading.dismiss().then((e) => {
          this.navCtrl.pop();
        });
        this.utility.callToast(status.message, status.cssclass, status.action);


      });



    } else {
      loading.dismiss();
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
