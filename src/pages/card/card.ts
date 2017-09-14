import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Stripe } from '@ionic-native/stripe';
import { InsideServiceProvider } from '../../providers/inside-service/inside-service';
import { TabsPage } from '../tabs/tabs';
import { Geolocation } from '@ionic-native/geolocation';
import { ConferenceData } from '../../providers/conference-data';

/**
 * Generated class for the CardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-card',
  templateUrl: 'card.html',
})


export class CardPage {

  public data?: { description: any, totalPrice: any };
  public lng: any;
  public lat: any;
  map: any;
  cardinfo: any = {
    number: '4242424242424242',
    expMonth: '10',
    expYear: '2018',
    cvc: '123'
  }
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation,
    public confData: ConferenceData,
    public insideServiceProvider: InsideServiceProvider,
  ) {
    this.data = this.navParams.get('data');
  }

  sale = {
    data: this.data
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Card');
  }




  pay() {
    this.onLocateUser().then((token?: any) => {
      console.log(token);
      this.insideServiceProvider.getSession().then((token: any) => {
        this.insideServiceProvider.pay(this.cardinfo, token)
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





      this.insideServiceProvider.getSession().then((token: any) => {
        this.insideServiceProvider.addSale(this.data, token)
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

    }).catch(
      (err?: any) => {
        console.log(err);
      });
  }

  onLocateUser(): any {
    return this.geolocation.getCurrentPosition().then((resp) => {
      //   console.log("*********************reeeesp", resp);
      let sale = {
        description: this.data.description,
        totalPrice: this.data.totalPrice,
        location: {
          metadata: {
            
          },
          coords: {
            lat: resp.coords.latitude,
            lng: resp.coords.longitude
          }
        }
      }

      let map = {
        name: sale.description,
        lat: sale.location.coords.lat,
        lng: sale.location.coords.lng
      }
      this.map = map;
      return sale;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

}

