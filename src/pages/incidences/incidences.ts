import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { EmailComposer } from '@ionic-native/email-composer';
import { AlertController, NavController, ToastController } from 'ionic-angular';


@Component({
  selector: 'page-user',
  templateUrl: 'incidences.html'
})
export class IncidencesPage {

 currentImage : any = null;
  
  constructor(private camera: Camera, private emailComposer: EmailComposer) { }
 
  captureImage() {
    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
    }
 
    this.camera.getPicture(options).then((imageData) => {
      this.currentImage = imageData;
    }, (err) => {
      // Handle error
      console.log('Image error: ', err);
    });
  }
 
  sendEmail() {
    let email = {
      to: 'costamartinezruben@gmail.com',
      cc: 'daggosso2@gmail.com',
      attachments: [
        this.currentImage
      ],
      subject: 'Incidencia',
      body: 'Hey Simon, what do you thing about this image?',
      isHtml: true
    };
 
    this.emailComposer.open(email);
  }
 
}