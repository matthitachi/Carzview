import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Driver} from "../../Model/driver";
import {TransactionserviceProvider} from "../../providers/transactionservice/transactionservice";
import {CarserviceProvider} from "../../providers/carservice/carservice";
import {Transaction} from "../../Model/transaction";

/**
 * Generated class for the UserviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-userview',
  templateUrl: 'userview.html',
})
export class UserviewPage {
  imagepath
  driver: Driver;
  carname: string;
  totalTrans;
  transactions: Transaction[];
  nextpay;

  constructor(public navCtrl: NavController, public navParams: NavParams, public transervice: TransactionserviceProvider,
              public carservice: CarserviceProvider) {
    this.driver = this.navParams.get("driver");
    this.imagepath = (this.driver.image == "") ? 'assets/imgs/add-user-male.png' : this.driver.image;
    this.getTotaltrans();
    this.getCarById();
    this.getRecentTransactions();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserviewPage');
  }

  getTotaltrans() {
    this.transervice.totalEarnings('driver', this.driver.id).then((res: any) => {
      if (res.status) {
        console.log(res.data);
        this.totalTrans = (res.data.total == null) ? 0 : res.data.total;
      }
    });
  }

  getCarById() {
    this.carservice.getCarbyId(this.driver.carid).then((res: any) => {
      if (res.status) {
        console.log(res.data);
        this.carname = res.data.carname;
      }
    });
  }

  getRecentTransactions() {
    this.transervice.getAllTrans(10, 'driver', this.driver.id).then((res: any) => {
      console.log(res);
      if (res.status) {
        this.transactions = res.data;
        let latesttransDate = new Date(this.transactions[0].created);
        this.nextpay = this.nextweek(latesttransDate);
      }
    });
  }

  nextweek(date) {
    var today = new Date(date);
    var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
    return nextweek;
  }

}
