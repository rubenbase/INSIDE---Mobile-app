import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Stripe } from '@ionic-native/stripe';

import 'rxjs/add/operator/map';

/*
  Generated class for the InsideServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class InsideServiceProvider {

  URL = "http://46.101.37.173:3000";
  // URL="http://192.168.0.37:3000";


  constructor(public http: Http, public events: Events,
    public storage: Storage,
    public stripe: Stripe,
  ) {
    console.log('Hello InsideServiceProvider Provider');
  }

  /*********************************************
   *  API CALLS
   * 
  **********************************************/

  // Sales
  getAllSales(token: any) {
    return new Promise(
      resolve => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('x-auth', token);
        let options = new RequestOptions({ headers: headers });
        this.http.get(this.URL + "/sales", options)
          .map(res => res.json())
          .subscribe(
          data => {
            console.log("data inside getallsales=>", data);
            resolve(data.sales);
          }, err => {
            console.log(err);
          }
          )
      }
    );
  }
  getSale(id: any) {
    return new Promise(
      resolve => {
        this.http.get(this.URL + "/sales" + id)
          .map(res => res.json())
          .subscribe(
          data => {
            resolve(data);
          }, err => {
            console.log(err);
          }
          )
      }
    );
  }
  addSale(body: any, token: any) {
    return new Promise(
      resolve => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('x-auth', token);
        let options = new RequestOptions({ headers: headers });
        this.http.post(this.URL + "/sales", body, options)
          .map(res => res.json())
          .subscribe(
          data => {
            console.log("TODO GUAY");
            resolve(data);
          }, err => {
            console.log("TODO MAL");

            console.log(err);
          }
          )
      }
    );
  }
  updateSale(body: any, token: any) {
    return new Promise(
      resolve => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('x-auth', token);
        let options = new RequestOptions({ headers: headers });
        this.http.put(this.URL + "/sales/" + body._id, body, options)
          .map(res => res.json())
          .subscribe(
          data => {
            resolve(data);
          }, err => {
            console.log(err);
          }
          )
      }
    );
  }
  deleteSale(body: any, token: any) {
    return new Promise(
      resolve => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('x-auth', token);
        let options = new RequestOptions({ headers: headers });
        this.http.delete(this.URL + "/sales/" + body._id, options)
          .map(res => res.json())
          .subscribe(
          data => {
            resolve(data);
          }, err => {
            console.log(err);
          }
          )
      }
    );
  }

  // User
  userLogin(data: any) {
    return new Promise(
      resolve => {

        this.http.post(this.URL + "/users/login", data)
          .map(res => res.json())
          .subscribe(
          data => {
            console.log("server DATA => ", data);
            let token;
            token = data.tokens[0].token;
            this.saveSession(token);
            resolve(data);
          }, err => {
            console.log(err);

          }
          )
      }
    );
  }

  pay(cardinfo: any, token: any) {
    return new Promise(
      resolve => {
        this.stripe.setPublishableKey('pk_test_6uoYaBC80brUtr7ExEeKeU5Z');
        this.stripe.createCardToken(cardinfo).then((key) => {
          var data = { stripeToken: key, amount: 50 };
          let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          headers.append('x-auth', token);
          console.log("this is dataaaaaaaaaaaaaaaaaa => ", data);
          let options = new RequestOptions({ headers: headers });
          this.http.post(this.URL + '/processPay', data, options).subscribe((res) => {
            if (res.json().success)
              console.log('transaction Successfull!AAAAAAAAAAAAAAAAAAAAAAAAA!');
          }, err => {
            console.log(err);
          });
        });
      }
    );
  }



  /********************************
   *  METHODS 
   * 
   ********************************/

  saveSession(token: string): any {
    this.storage.set('token', token);
  }

  getSession(): any {
    return this.storage.get('token').then((token) => {
      return token;
    });
  }


}