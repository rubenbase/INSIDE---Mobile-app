import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { InsideServiceProvider } from '../../providers/inside-service/inside-service';

import { PopoverPage } from '../about-popover/about-popover';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

        private sales: any =[]; 


  constructor(public popoverCtrl: PopoverController,
    public insideServiceProvider: InsideServiceProvider) {
 this.insideServiceProvider.getSession().then((token: any) => {
      console.log(token);
      this.insideServiceProvider.getAllSales(token)
        .then(
        data => {
          console.log("**ALL SALES ARR => ", this.sales);
          this.sales = data;
          console.log("**ALL SALES ARR EQUALS=> ", this.sales);
          console.log("sin ser array => ", data)
        }
        )
        .catch(
        err => {
          console.log(err);
        }
        )
    });
    

  }

  ionViewDidLoad(){
    this.loadSales();
  }

  presentPopover(event: Event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ ev: event });
  }

loadSales(){
 
}
}
