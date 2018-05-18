import {Component} from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Driver} from "../../Model/driver";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CarserviceProvider} from "../../providers/carservice/carservice";
import {Car} from "../../Model/car";
import {UtilityProvider} from "../../providers/utility/utility";
import {UploadfileServiceProvider} from "../../providers/uploadfile-service/uploadfile-service";
import {UserserviceProvider} from "../../providers/userservice/userservice";

/**
 * Generated class for the UpdateusersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-updateusers',
  templateUrl: 'updateusers.html',
})
export class UpdateusersPage {
  oldData: Driver;
  imagePath: string;
  driverForm: FormGroup;
  filetoUpload: any;
  cars: Car[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder,
              public utility: UtilityProvider, public actionSheetCtrl: ActionSheetController,
              public uploadfile: UploadfileServiceProvider, public userservice: UserserviceProvider,
              public carservice: CarserviceProvider, public viewCtrl: ViewController) {
    this.oldData = this.navParams.get("user");
    this.imagePath = (this.oldData.image == "") ? 'assets/imgs/add-user-male.png' : this.oldData.image;
    this.getCars();
    this.driverForm = formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
      fname: ['', Validators.compose([Validators.maxLength(30)])],
      lname: ['', Validators.compose([Validators.maxLength(30)])],
      email: ['', Validators.compose([Validators.maxLength(30)])],
      phone: ['', Validators.compose([Validators.maxLength(30)])],
      image: [''],
      options: [this.oldData.carid, Validators.required],
      desc: ['', Validators.compose([Validators.maxLength(100)])],
      // var: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
    });
  }

  getCars() {
    this.carservice.GetAllCars().then((res: any) => {
      if (res.status) {
        this.cars = res.data;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateusersPage');
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
      console.log(this.driverForm.value);
      let newpath = "";
      if (this.filetoUpload != null) {

        newpath = this.uploadfile.filesPath + this.filetoUpload.options.fileName;

      } else {
        newpath = this.oldData.image;
      }
      this.driverForm.value.image = newpath;
      this.driverForm.value.id = this.oldData.id;
      this.userservice.updateDriver(this.driverForm.value).then((response: any) => {
        console.log(response);
        status.message = response.message;
        if (response.status) {
          if (this.filetoUpload != null)
            this.uploadfile.saveImage(this.imagePath, this.filetoUpload.options.fileName);
          this.driverForm.reset();
        }
        loading.dismiss().then((e) => {
          this.viewCtrl.dismiss();
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

  cancel() {
    this.viewCtrl.dismiss();
  }

}
