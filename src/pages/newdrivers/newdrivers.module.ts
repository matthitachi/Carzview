import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {NewdriversPage} from './newdrivers';

@NgModule({
  declarations: [
    NewdriversPage,
  ],
  imports: [
    IonicPageModule.forChild(NewdriversPage),
  ],
})
export class NewdriversPageModule {
}
