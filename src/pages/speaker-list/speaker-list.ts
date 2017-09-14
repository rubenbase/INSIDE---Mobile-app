import { Component } from '@angular/core';

import { ActionSheet, ActionSheetController, Config, NavController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { ConferenceData } from '../../providers/conference-data';

import { SessionDetailPage } from '../session-detail/session-detail';
import { SpeakerDetailPage } from '../speaker-detail/speaker-detail';

@Component({
  selector: 'page-speaker-list',
  templateUrl: 'speaker-list.html'
})
export class SpeakerListPage {
  actionSheet: ActionSheet;
  speakers: any[] = [];

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    public confData: ConferenceData,
    public config: Config,
    public inAppBrowser: InAppBrowser
  ) { }

  ionViewDidLoad() {
   
  }

  

  goToProductDetail(productName: any) {
    this.navCtrl.push(SpeakerDetailPage, {
      product: productName,
      name: productName.name
    });
  }


  openContact(speaker: any) {
    let mode = this.config.get('mode');

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Contact ' + "Supervisor/a",
      buttons: [
        {
          text: `Email ( "daggosso2@gmail.com")`,
          icon: mode !== 'ios' ? 'mail' : null,
          handler: () => {
            window.open('mailto:' + "daggosso2@gmail.com");
          }
        },
        {
          text: `Call ( "608111111" )`,
          icon: mode !== 'ios' ? 'call' : null,
          handler: () => {
            window.open('tel:' +  "608111111" );
          }
        }
      ]
    });

    actionSheet.present();
  }
}
