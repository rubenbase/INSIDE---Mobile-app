import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';
import { VarsGlobalesProvider } from '../../providers/vars-globales/vars-globales';
import { InsideServiceProvider } from '../../providers/inside-service/inside-service';


@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: {username?: string, password?: string} = {};
  submitted = false;

  constructor(public navCtrl: NavController, 
  public userData: UserData, 
  public varsGlobalesProvider: VarsGlobalesProvider, 
  public insideServiceProvider : InsideServiceProvider) { 

    

  }

  onLogin(form: NgForm) {
    this.submitted = true;
    
    if (form.valid) {
     
    console.log(this.login);
      this.insideServiceProvider.userLogin(this.login)
      .then(
        data => {
          console.log(data);
          this.userData.hasLoggedIn();
          this.userData.login(this.login.username);
          this.navCtrl.push(TabsPage);
        }
      )
      .catch(
        err => {
          console.log(err);
        }
      )
    }
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }
}
