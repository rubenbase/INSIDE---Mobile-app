import { Component, ViewChild, ElementRef } from '@angular/core';

import { ConferenceData } from '../../providers/conference-data';
import { InsideServiceProvider } from '../../providers/inside-service/inside-service';

import { Platform } from 'ionic-angular';


declare var google: any;
var markers = [];
var map;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  sales: any = [];

  @ViewChild('map') mapElement: ElementRef;
  constructor(public confData: ConferenceData, public platform: Platform,
    public insideServiceProvider: InsideServiceProvider
  ) {
  }

  ionViewDidLoad() {

    var defaultView = { lat: 37, lng: -122 };
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: defaultView,
      mapTypeId: 'terrain'
    })

    this.insideServiceProvider.getSession().then((token: any) => {
      console.log(token);
      this.insideServiceProvider.getAllSales(token)
        .then(
        data => {
          this.sales = data;
         console.log("LAS SALES SON => ", this.sales);
        }
        )
        .catch(
        err => {
          console.log(err);
        }
        )
    });

    // this.confData.getMap().subscribe((mapData: any) => {
    //   let mapEle = this.mapElement.nativeElement;

    //   let map = new google.maps.Map(mapEle, {
    //     center: mapData.find((d: any) => d.center),
    //     zoom: 16
    //   });

    //   mapData.forEach((markerData: any) => {
    //     let infoWindow = new google.maps.InfoWindow({
    //       content: `<h5>${markerData.name}</h5>`
    //     });

    //     let marker = new google.maps.Marker({
    //       position: markerData,
    //       map: map,
    //       title: markerData.name
    //     });

    //     marker.addListener('click', () => {
    //       infoWindow.open(map, marker);
    //     });
    //   });

    //   google.maps.event.addListenerOnce(map, 'idle', () => {
    //     mapEle.classList.add('show-map');
    //   });

    // });

  }
}
