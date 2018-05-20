import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, PopoverController} from 'ionic-angular';
import {TransactionserviceProvider} from "../../providers/transactionservice/transactionservice";
import {Transaction} from "../../Model/transaction";
import {UtilityProvider} from "../../providers/utility/utility";


/**
 * Generated class for the TransactionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html',
})
export class TransactionsPage {
  transactions: Transaction[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public transervice: TransactionserviceProvider,
              public modalCtrl: ModalController, public popoverCtrl: PopoverController, public utility: UtilityProvider) {

  }

  ionViewWillEnter() {
    this.getTransactions();
  }

  getTransactions() {
    this.transervice.getAllTrans().then((res: any) => {
      console.log(res);
      if (res.status) {
        this.transactions = res.data;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransactionsPage');
  }

  addTransaction() {
    this.navCtrl.push("CreatetransactionsPage");
  }

  filter(limit, searchby, from, to, keyword, order) {
    this.transervice.filter(limit, searchby, from, to, keyword, order).then((res: any) => {
      console.log(res);
      if (res.status) {
        this.transactions = res.data;
      } else {
        this.utility.callToast("No data Found", 'alert', false);
      }
    });
  }

  deleteTrans(id, i) {
    this.transervice.deleteTrans(id).then((res: any) => {
      if (res.status) {
        this.utility.callToast(res.message, '', false);
        this.transactions.splice(i, 1);
      }
    });
  }

  filtermodal() {
    let modal = this.modalCtrl.create("FilterPage");
    modal.onDidDismiss(data => {

      if (data.filter) {
        let limit = 10;
        let searchby = "";
        let keyword = "";
        let order = "DESC";
        let from = "";
        let to = "";
        if (data.limit !== undefined && data.limit != null) {
          limit = parseInt(data.limit);
        }
        if (data.searchby !== undefined && data.searchby != null && data.searchby != "") {
          searchby = data.searchby;
        }
        if (data.keyword !== undefined && data.keyword != null && data.keyword != "") {
          keyword = data.keyword;
        }
        if (data.order !== undefined && data.order != null && data.order != "") {
          order = data.order;
        }
        from = data.from.slice(0, 10) + " 00:00:00";
        to = data.to.slice(0, 10) + " 23:59:59";
        console.log(limit + " " + searchby + " " + from + " " + to + " " + keyword + " " + order);
        this.filter(limit, searchby, from, to, keyword, order);
      }
      console.log(data);
    });
    modal.present();
  }

  presentPopover(ev, desc) {
    let popover = this.popoverCtrl.create("DescPage", {'desc': desc});
    popover.present({ev: ev}).then((res) => {
    });
  }

  getSum() {
    let sum = 0;
    for (let i = 0; i < this.transactions.length; i++) {
      sum += parseInt(this.transactions[i].amount);
    }
    this.utility.callToast("Total: N" + sum + ".00", 'safe', false);
  }

  doRefresh(refresher) {
    this.getTransactions();
    setTimeout(() => {
      console.log('Async operation has ended');
      if (refresher != "") {
        refresher.complete();
      }
    }, 2000);
  }

}
