import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {CarserviceProvider} from "../../providers/carservice/carservice";
import {Car} from "../../Model/car";
import {UpdatecarsPage} from "../updatecars/updatecars";
import {UtilityProvider} from "../../providers/utility/utility";

/**
 * Generated class for the CarsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cars',
  templateUrl: 'cars.html',
})
export class CarsPage {
  cars: Car[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public carservice: CarserviceProvider,
              public modalCtrl: ModalController, public utility: UtilityProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarsPage');
  }

  ionViewWillEnter() {
    this.getcars();
  }

  getcars() {
    this.carservice.GetAllCars().then((res: any) => {
      console.log(res);
      if (res.status) {
        this.cars = res.data;
      }
    });
  }

  addCars() {
    this.navCtrl.push("NewcarsPage");
  }

  deleteCar(id, index) {
    let loading = this.utility.presentLoadingDefault();
    this.carservice.deleteCar(id).then((res: any) => {
      if (res.status) {
        this.utility.callToast(res.message, '', false);
        this.cars.splice(index, 1);
      }
      loading.dismiss();
    });
  }

  editCar(car) {
    let profileModal = this.modalCtrl.create(UpdatecarsPage, {car: car});
    profileModal.present();
  }

  carView(car) {
    this.navCtrl.push("CarviewPage", {car: car})
  }

  doRefresh(refresher) {
    this.getcars();
    setTimeout(() => {
      console.log('Async operation has ended');
      if (refresher != "") {
        refresher.complete();
      }
    }, 2000);
  }

}
