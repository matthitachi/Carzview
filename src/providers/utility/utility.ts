import {Injectable} from '@angular/core';
import {Storage} from "@ionic/storage";
import {ToastController} from "ionic-angular";

/*
  Generated class for the UtilityProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilityProvider {

  constructor(public storage: Storage, public toastCtrl: ToastController) {
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

}
