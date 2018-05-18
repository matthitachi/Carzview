import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Driver} from "../../Model/driver";
import {Car} from "../../Model/car";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CarserviceProvider} from "../../providers/carservice/carservice";
import {UtilityProvider} from "../../providers/utility/utility";
import {UserserviceProvider} from "../../providers/userservice/userservice";
import {TransactionserviceProvider} from "../../providers/transactionservice/transactionservice";

/**
 * Generated class for the CreatetransactionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-createtransactions',
  templateUrl: 'createtransactions.html',
})
export class CreatetransactionsPage {
  transactionForm: FormGroup;
  cars: Car[];
  drivers: Driver[];

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public navParams: NavParams,
              public utility: UtilityProvider, public userservice: UserserviceProvider,
              public carservice: CarserviceProvider, public transervice: TransactionserviceProvider) {
    this.getCars();
    this.transactionForm = formBuilder.group({
      amount: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
      driveroptions: [1, Validators.required],
      caroptions: [1, Validators.required],
      desc: ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
      // var: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatetransactionsPage');
  }

  getCars() {
    this.carservice.GetAllCars().then((res: any) => {
      if (res.status) {
        this.cars = res.data;
      }
    });
  }

  getDrivers(id) {
    this.userservice.getDriverByCarId(id).then((res: any) => {
      if (res.status) {
        this.drivers = res.data;
      }
    });
  }

  newTransacton() {
    let loading = this.utility.presentLoadingDefault();
    let status: { message: string, cssclass: string, action: boolean } = {message: "", cssclass: "", action: false};
    console.log(this.transactionForm.value);
    if (this.transactionForm.status == 'VALID') {
      console.log(this.transactionForm.value);

      this.transervice.createTransaction(this.transactionForm.value).then((response: any) => {
        console.log(response);
        status.message = response.message;
        if (response.status) {
          this.transactionForm.reset();
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

}
