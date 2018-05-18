import {Component} from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Car} from "../../Model/car";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CarserviceProvider} from "../../providers/carservice/carservice";
import {UtilityProvider} from "../../providers/utility/utility";
import {UploadfileServiceProvider} from "../../providers/uploadfile-service/uploadfile-service";

/**
 * Generated class for the UpdatecarsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-updatecars',
  templateUrl: 'updatecars.html',
})
export class UpdatecarsPage {
  oldData: Car;
  imagePath: string;
  carForm: FormGroup;
  filetoUpload: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder,
              public utility: UtilityProvider, public actionSheetCtrl: ActionSheetController,
              public uploadfile: UploadfileServiceProvider, public carservice: CarserviceProvider, public viewCtrl: ViewController) {
    this.oldData = this.navParams.get("car");
    this.imagePath = (this.oldData.image == "") ? 'assets/imgs/Pic.jpg' : this.oldData.image;
    this.carForm = formBuilder.group({
      carname: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
      model: ['', Validators.compose([Validators.maxLength(30)])],
      color: ['', Validators.compose([Validators.maxLength(30)])],
      platenumber: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
      image: [''],
      cost: ['', Validators.compose([Validators.required])],
      worth: ['', Validators.compose([Validators.required])],
      desc: ['', Validators.compose([Validators.maxLength(100)])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdatecarsPage');
  }

  newCars() {
    let loading = this.utility.presentLoadingDefault();
    let status: { message: string, cssclass: string, action: boolean } = {message: "", cssclass: "", action: false};

    if (this.carForm.status == 'VALID') {
      // console.log(this.carForm.value)
      let newpath = "";
      if (this.filetoUpload != null) {

        newpath = this.uploadfile.filesPath + this.filetoUpload.options.fileName;

      } else {
        newpath = this.oldData.image;
      }


      this.carForm.value.id = this.oldData.id;
      console.log(this.carForm.value)
      this.carForm.value.image = newpath;
      console.log(this.carForm.value);
      this.carservice.updateCar(this.carForm.value).then((response: any) => {
        console.log(response);
        status.message = response.message;
        if (response.status) {
          if (this.filetoUpload != null)
            this.uploadfile.saveImage(this.imagePath, this.filetoUpload.options.fileName);
          this.carForm.reset();
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

  selectimage() {
    this.presentActionSheet();
    console.log("new Image");
  }

  fileUploadController(source) {
    this.uploadfile.getImage(source).then((result: any) => {
      console.log(result);
      if (result != null || result != "" || result != 'undefined') {
        this.filetoUpload = result;
        this.imagePath = result.imageUri;
      }

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
