import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {CarviewPage} from './carview';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    CarviewPage,
  ],
  imports: [
    IonicPageModule.forChild(CarviewPage),
    PipesModule
  ],
})
export class CarviewPageModule {
}
