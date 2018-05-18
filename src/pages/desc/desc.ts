import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the DescPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-desc',
  templateUrl: 'desc.html',
})
export class DescPage {
  description

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.description = this.navParams.get("desc");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DescPage');
  }

}
