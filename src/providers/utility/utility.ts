import {Injectable} from '@angular/core';
import {Storage} from "@ionic/storage";
import {LoadingController, ToastController} from "ionic-angular";

/*
  Generated class for the UtilityProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilityProvider {

  constructor(public storage: Storage, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    console.log('Hello UtilityProvider Provider');
  }

  isFirstinstall() {
    return this.storage.get("FIRST_INSTALL").then(res => {
      return res
    });
  }

  onFirstinstall() {
    this.storage.set("FIRST_INSTALL", true);
  }

  callToast(message, cssClass, onDismiss) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      cssClass: cssClass
    });
    if (onDismiss) {
      toast.onDidDismiss(() => {
        // this.navCtrl.popAll();
        // this.navCtrl.setRoot(HomePage, {}, {animate: true, direction: 'forward'});
      });
    }

    toast.present();
  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    // setTimeout(() => {
    //   loading.dismiss();
    // }, 5000);
    return loading;
  }

  nextweek(date) {
    var today = new Date(date);
    var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
    return nextweek;
  }

}
