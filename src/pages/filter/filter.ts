import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the FilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {
  from = new Date().toISOString();
  to = new Date().toISOString();
  limit;
  searchby;
  keyword;
  order;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterPage');
  }

  filter() {
    let filterValue: any = {};
    filterValue.from = this.from;
    filterValue.to = this.to;
    filterValue.limit = this.limit;
    filterValue.searchby = this.searchby;
    filterValue.keyword = this.keyword;
    filterValue.order = this.order;
    filterValue.filter = true;

    this.viewCtrl.dismiss(filterValue);


  }

  cancel() {
    this.viewCtrl.dismiss({filter: false});
  }
}
