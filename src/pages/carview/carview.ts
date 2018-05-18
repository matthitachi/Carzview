import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Car} from "../../Model/car";
import {Transaction} from "../../Model/transaction";
import {TransactionserviceProvider} from "../../providers/transactionservice/transactionservice";

/**
 * Generated class for the CarviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-carview',
  templateUrl: 'carview.html',
})
export class CarviewPage {
  imagepath: string;
  car: Car;
  transactions: Transaction[];
  carTotal: number;
  carPercentage: number;
  carBalance: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public transervice: TransactionserviceProvider) {
    this.car = this.navParams.get('car');
    this.imagepath = (this.car.image == "") ? 'assets/imgs/Pic.jpg' : this.car.image;
    this.getCarTotaltrans();
    this.getRecentTransactions();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarviewPage');
  }

  getCarTotaltrans() {
    this.transervice.totalEarnings('car', this.car.id).then((res: any) => {
      if (res.status) {
        console.log(res.data);
        this.carTotal = (res.data.total == null) ? 0 : res.data.total;
        this.carBalance = this.car.cost - this.carTotal;
        this.carPercentage = (this.carTotal == 0) ? 0 : Math.round((this.carTotal / this.car.cost) * 100);
      }
    });
  }

  getRecentTransactions() {
    this.transervice.getAllTrans(10, 'car', this.car.id).then((res: any) => {
      console.log(res);
      if (res.status) {
        this.transactions = res.data;
      }
    });
  }

}
