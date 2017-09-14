import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdateSalePage } from './update-sale';

@NgModule({
  declarations: [
    UpdateSalePage,
  ],
  imports: [
    IonicPageModule.forChild(UpdateSalePage),
  ],
  exports: [
    UpdateSalePage
  ]
})
export class UpdateSalePageModule {}
