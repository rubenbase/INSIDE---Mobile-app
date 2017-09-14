import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InsideServiceProvider } from '../../providers/inside-service/inside-service';
import { NgForm } from '@angular/forms';
import { TabsPage } from '../tabs/tabs';
import { UserData } from '../../providers/user-data';
import { CardPage } from '../card/card';

/**
 * Generated class for the AddSalePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-sale',
  templateUrl: 'add-sale.html',
})
export class AddSalePage {
 add: {
   description?: string, 
   totalPrice?: Number,
   completed?: Boolean,
   completedAt?: String,
   startedAt?: String,
   location?: Object,
   products?:[Object]
  } = {};
  submitted = false;

  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
  public insideServiceProvider: InsideServiceProvider,
  public userData: UserData) {
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddSalePage');
  }

  cardDetails(form:NgForm){
    console.log("DENTRO DE CARD DETAILES ***", form);
    this.navCtrl.push(CardPage,{
      'data':this.add
    });
  }
}
