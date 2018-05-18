import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {UserserviceProvider} from "../../providers/userservice/userservice";
import {Driver} from "../../Model/driver";
import {UpdateusersPage} from "../updateusers/updateusers";
import {UtilityProvider} from "../../providers/utility/utility";

/**
 * Generated class for the DriversPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-drivers',
  templateUrl: 'drivers.html',
})
export class DriversPage {
  drivers: Driver[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public userservice: UserserviceProvider,
              public modalCtrl: ModalController, public utility: UtilityProvider) {

  }

  ionViewWillEnter() {
    this.getdrivers();
  }

  getdrivers() {
    this.userservice.GetAllDrivers().then((res: any) => {
      if (res.status) {
        this.drivers = res.data;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriversPage');
  }

  addDriver() {
    this.navCtrl.push("NewdriversPage");
  }

  driverView(driver) {
    this.navCtrl.push("UserviewPage", {driver: driver});
  }

  driverDelete(id, index) {
    this.userservice.deleteDriver(id).then((res: any) => {
      if (res.status) {
        this.utility.callToast(res.message, '', false);
        this.drivers.splice(index, 1);
      }
    });
  }

  editDriver(driver) {
    let profileModal = this.modalCtrl.create(UpdateusersPage, {user: driver});
    profileModal.present();
  }

  doRefresh(refresher) {
    this.getdrivers();
    setTimeout(() => {
      console.log('Async operation has ended');
      if (refresher != "") {
        refresher.complete();
      }
    }, 2000);
  }

}
