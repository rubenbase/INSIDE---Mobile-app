import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { InsideServiceProvider } from '../../providers/inside-service/inside-service';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the UpdateSalePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-update-sale',
  templateUrl: 'update-sale.html',
})
export class UpdateSalePage {
public data:any;
 submitted = false;
 update: {description?: string, totalPrice?: Number} = {};

constructor(public navCtrl: NavController, 
public navParams: NavParams,
public insideServiceProvider: InsideServiceProvider,
public loadingController:LoadingController) {
  this.data = this.navParams.get('data');    
  console.log("**holi",this.data);

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateSalePage');
  }

  onUpdate(description:string , totalPrice:Number) {
    let saleId = this.data._id;
    let body={};
    body = { 
      _id: saleId,
      description: description,
      totalPrice:totalPrice
     };
    this.submitted = true;
    
    // if (form.valid) {
     
    // console.log(this.update);
    this.insideServiceProvider.getSession().then((token: any) => {
     this.insideServiceProvider.updateSale(body, token)
      .then(
        data => {
          console.log(data);
          this.navCtrl.push(TabsPage);
        }
      )
      .catch(
        err => {
          console.log(err);
        }
      ) 
    });
    
    console.log("data en el metodo llega ?" , description);

  }

  onDelete() {
    let saleId = this.data._id;
    let body={};
    body = { 
      _id: saleId,
     };
     this.insideServiceProvider.getSession().then((token: any) => {
     this.insideServiceProvider.deleteSale(body, token)
      .then(
        data => {
          console.log(data);
          this.navCtrl.push(TabsPage);
        }
      )
      .catch(
        err => {
          console.log(err);
        }
      ) 
    });
  }
}
