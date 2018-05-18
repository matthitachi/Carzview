import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {TransactionsPage} from './transactions';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    TransactionsPage,
  ],
  imports: [
    IonicPageModule.forChild(TransactionsPage),
    PipesModule
  ],
})
export class TransactionsPageModule {
}
