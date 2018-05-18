import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {NewcarsPage} from './newcars';

@NgModule({
  declarations: [
    NewcarsPage,
  ],
  imports: [
    IonicPageModule.forChild(NewcarsPage),
  ],
})
export class NewcarsPageModule {
}
