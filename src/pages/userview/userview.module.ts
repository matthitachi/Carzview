import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {UserviewPage} from './userview';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    UserviewPage,
  ],
  imports: [
    IonicPageModule.forChild(UserviewPage),
    PipesModule
  ],
})
export class UserviewPageModule {
}
