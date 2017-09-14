import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddSalePage } from './add-sale';

@NgModule({
  declarations: [
    AddSalePage,
  ],
  imports: [
    IonicPageModule.forChild(AddSalePage),
  ],
  exports: [
    AddSalePage
  ]
})
export class AddSalePageModule {}
