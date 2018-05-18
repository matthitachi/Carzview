import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {TransactionserviceProvider} from "../../providers/transactionservice/transactionservice";
import {Transaction} from "../../Model/transaction";
import {CarserviceProvider} from "../../providers/carservice/carservice";
import {UserserviceProvider} from "../../providers/userservice/userservice";

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  totalEarning: number = 0;
  yearlyEarning: number = 0;
  monthlyEarning: number = 0;
  dailyEarning: number = 0;
  transactions: Transaction[];
  drivercount: number = 0;
  carcount: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public transervice: TransactionserviceProvider,
              public userservice: UserserviceProvider, public carservice: CarserviceProvider) {

  }

  ionViewWillEnter() {
    this.totalEarnings();
    this.seasonEarnings('Y').then((res) => {
      this.yearlyEarning = res;
    });
    this.seasonEarnings('M').then((res) => {
      this.monthlyEarning = res;
    });
    this.seasonEarnings('D').then((res) => {
      this.dailyEarning = res;
    });
    this.getRecentTransactions();
    this.getcount();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  totalEarnings() {
    this.transervice.totalEarnings().then((res: any) => {
      if (res.status) {
        console.log(res.data);
        this.totalEarning = (res.data.total == null) ? 0 : res.data.total;
      }
    })
  }

  seasonEarnings(season) {
    return this.transervice.seasonEarnings(season).then((res: any) => {
      if (res.status) {
        console.log(res.data);
        return (res.data.total == null) ? 0 : res.data.total;
      }
    })
  }

  getRecentTransactions() {
    this.transervice.getAllTrans(3).then((res: any) => {
      console.log(res);
      if (res.status) {
        this.transactions = res.data;
      }
    });
  }

  getcount() {
    this.userservice.countDriver().then((res: any) => {
      if (res.status) {
        this.drivercount = res.data;
      }
    })

    this.carservice.countCar().then((res: any) => {
      if (res.status) {
        this.carcount = res.data;
      }
    })
  }

  doRefresh(refresher) {
    this.totalEarnings();
    this.seasonEarnings('Y').then((res) => {
      this.yearlyEarning = res;
    });
    this.seasonEarnings('M').then((res) => {
      this.monthlyEarning = res;
    });
    this.seasonEarnings('D').then((res) => {
      this.dailyEarning = res;
    });
    this.getRecentTransactions();
    this.getcount();
    setTimeout(() => {
      console.log('Async operation has ended');
      if (refresher != "") {
        refresher.complete();
      }
    }, 2000);
  }

}
